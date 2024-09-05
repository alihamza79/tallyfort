"use client";

import Link from "next/link";
import * as React from "react";
import { signIn,checkAuth } from "@/appwrite/Services/authServices";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { IoMdLock } from "react-icons/io";
import { Logo } from "./icons";
import { Button } from "./ui/button";

// Static component data
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

// Main Header Component
export function MainHeader() {
  const [header, setHeader] = React.useState(false);
  const [openMenu, setIsOpenMenu] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setHeader(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "lg:flex py-5 z-50 h-[88px] items-center justify-between sticky left-0 right-0 top-0",
        header ? "backdrop-blur-sm bg-white/[0.8]" : ""
      )}
    >
      <div className="container flex items-center justify-between">
        <div>
          <Link href={"/"}>
            <Logo className="max-w-[8rem]" />
          </Link>
        </div>
        
        <div className="hidden lg:block">
          <AuthMenu />
        </div>
        <div className="lg:hidden">
          <Sheet open={openMenu} onOpenChange={setIsOpenMenu}>
            <SheetTrigger asChild>
              <button>
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent>
              <NavigationsLinks setIsOpenMenu={setIsOpenMenu} />
              <AuthMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Auth Menu Component with Login Modal
// Auth Menu Component with Login Modal and conditional rendering for login status
// Auth Menu Component with Login Modal and conditional rendering for login status
const AuthMenu = () => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // State to track user authentication
  const router = useRouter();

  // Check user authentication status on component mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await checkAuth(); // Using checkAuth function from services
        setIsAuthenticated(authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password); // Call the Appwrite signIn method
      setError(null); // Clear any previous errors
      setOpenLoginModal(false); // Close the modal after a successful login
      setIsAuthenticated(true); // Mark the user as authenticated
      router.push("/dashboard"); // Redirect to dashboard page on success
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      {isAuthenticated ? (
        <Button
          variant={"outline"}
          className="gap-1"
          onClick={() => router.push("/dashboard")}
        >
          <span>Dashboard</span>
        </Button>
      ) : (
        <>
          <Button
            variant={"outline"}
            className="gap-1"
            onClick={() => setOpenLoginModal(true)}
          >
            <span>Login</span>
          </Button>
          <Button>Get Started</Button>
        </>
      )}

      {/* Login Modal */}
      {!isAuthenticated && (
        <Sheet open={openLoginModal} onOpenChange={setOpenLoginModal}>
          <SheetContent side="right">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Log In
                </Button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};




// Navigation Links Component
interface NavigationsLinksProps {
  setIsOpenMenu: (isOpen: boolean) => void;
}
const NavigationsLinks: React.FC<NavigationsLinksProps> = ({
  setIsOpenMenu,
}) => (
  <NavigationMenu className="w-full mx-auto lg:mx-0">
    <NavigationMenuList className="flex-col lg:flex-row">
      <NavigationMenuItem onClick={() => setIsOpenMenu(false)}>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem onClick={() => setIsOpenMenu(false)}>
        <Link href="/blogs" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Blog
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem onClick={() => setIsOpenMenu(false)}>
        <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem onClick={() => setIsOpenMenu(false)}>
        <Link href="/contact-us" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact us
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

// List Item Component
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
