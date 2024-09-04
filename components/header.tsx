"use client";

import Link from "next/link";
import * as React from "react";

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

export function MainHeader() {
  const [header, setHeader] = React.useState(false);
  const [openMenu, setIsOpenMenu] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "  lg:flex py-5 z-50 h-[88px] items-center  justify-between    sticky left-0 right-0 top-0",
        header ? "backdrop-blur-sm bg-white/[0.8] " : ""
      )}
    >
      <div className=" container flex items-center justify-between">
        <div>
          <Link href={"/"}>
            <Logo className=" max-w-[8rem]" />
          </Link>
        </div>
        <div className=" hidden lg:block">
          <NavigationsLinks setIsOpenMenu={setIsOpenMenu} />
        </div>
        <div className=" hidden lg:block">
          <AuthMenu />
        </div>
        <div className=" lg:hidden">
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

const AuthMenu = () => (
  <div className=" flex flex-col lg:flex-row lg:items-center gap-4">
    <Button variant={"outline"} className=" gap-1">
      <IoMdLock size={20} />
      <span>Login</span>
    </Button>
    <Button>Get Started</Button>
  </div>
);
interface NavigationsLinksProps {
  setIsOpenMenu: (isOpen: boolean) => void;
}
const NavigationsLinks: React.FC<NavigationsLinksProps> = ({
  setIsOpenMenu,
}) => (
  <NavigationMenu className=" w-full mx-auto lg:mx-0">
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
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
