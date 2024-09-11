'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { signIn, checkAuth } from '@/appwrite/Services/authServices';
import { useRouter } from 'next/navigation';
import React from 'react';
import db from '@/appwrite/Services/dbServices';

interface CompanyDetails {
  address: string;
  phone: string;
}

interface FooterLink {
  name: string;
  href: string;
  category: string;
}

interface FooterLinkCategory {
  name: string;
  items: FooterLink[];
}

const Footer: React.FC = () => {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [footerLinks, setFooterLinks] = useState<FooterLinkCategory[]>([]);
  const [bottomLinks, setBottomLinks] = useState<FooterLink[]>([]);
  const router = useRouter();

  // Fetch company details and footer links from the database
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        // Fetch company details (address and phone number)
        const companyData: any = await db.footerCompanyDetail.get('66e12b60001840b13a07');
        
        // Map the returned document to CompanyDetails by picking the fields
        const mappedCompanyData: CompanyDetails = {
          address: companyData.address,
          phone: companyData.phone
        };

        setCompanyDetails(mappedCompanyData);

        // Fetch footer links and map them into categories
        const linksData = await db.footerLinks.list();
        const sortedLinks = linksData.documents
          .filter((link: any) => link.category !== "bottom") // Exclude "bottom" category
          .reduce((acc: any[], link: any) => {
            const categoryIndex = acc.findIndex((cat: any) => cat.name === link.category);
            if (categoryIndex > -1) {
              acc[categoryIndex].items.push({
                name: link.name,
                href: link.href,
                category: link.category,
              });
            } else {
              acc.push({
                name: link.category,
                items: [
                  {
                    name: link.name,
                    href: link.href,
                    category: link.category,
                  },
                ],
              });
            }
            return acc;
          }, []);

        setFooterLinks(sortedLinks);

        // Filter links for the bottom section (with category "bottom")
        const bottomLinksData = linksData.documents.filter((link: any) => link.category === "bottom");
        setBottomLinks(bottomLinksData.map((link: any) => ({
          name: link.name,
          href: link.href,
          category: link.category,
        })));
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };
    fetchFooterData();
  }, []);

  // Check and handle login status when clicking 'Office'
  const handleLoginClick = async (): Promise<void> => {
    try {
      const authenticated = await checkAuth(); // Check if the user is logged in
      if (authenticated) {
        router.push('/dashboard'); // If user is logged in, redirect to /dashboard
      } else {
        setOpenLoginModal(true); // If not logged in, open the login modal
      }
    } catch (error) {
      setOpenLoginModal(true); // If there's an error, open the login modal
    }
  };

  if (!companyDetails || footerLinks.length === 0) {
    return <div></div>;
  }

  return (
    <footer className="container pb-6">
      <div className="flex py-10 xl:py-14 flex-col lg:flex-row items-start justify-between gap-6">
        <div className="basis-full w-full lg:basis-[40%]">
          <div className="sm:w-[365px] w-full mx-auto lg:mx-0 h-[340px] sm:h-[365px] rounded-full bg-[#FFF6C6] flex flex-col items-center justify-center gap-y-7">
            {/* Static logo */}
            <img src={'/images/logo.png'} alt="Logo" width={180} height={75} />
            <p className="text-center max-w-[260px] mx-auto opacity-70 text-xl">
              {companyDetails.address}
            </p>
            <p className=" text-xl xl:text-2xl font-medium text-center">
              {companyDetails.phone}
            </p>
          </div>
        </div>
        <div className="basis-full lg:basis-[60%] flex flex-wrap gap-6 justify-between">
          {footerLinks.map((l: any, index: number) => (
            <div key={index}>
              <div>
                <h4 className="text-xl xl:text-2xl font-bold">{l.name}</h4>
              </div>
              <ul className="pt-2 space-y-2">
                {l.items.map((link: any) => (
                  <li key={link.name}>
                    <Link
                      className="text-lg hover:underline xl:text-xl font-normal opacity-60"
                      href={link.name === 'Office' ? '#' : link.href}
                      onClick={link.name === 'Office' ? handleLoginClick : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Passing the modal state to the LoginSection */}
      <LoginSection
        openLoginModal={openLoginModal}
        setOpenLoginModal={setOpenLoginModal}
      />

      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between ">
        <p className="text-sm xl:text-base font-normal">
          Copyright @2023 Tallyfort inc.
        </p>
        <ul className="flex items-center gap-4">
          {bottomLinks.map((link) => (
            <li key={link.name}>
              <Link className="text-base font-medium" href={link.href}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-4">
          {/* Social icons */}
          <li>
            <Link className="text-base font-medium" href={'#'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M22.4 0.418945H2.8C1.26 0.418945 0 1.67881 0 3.21864V22.8165C0 24.3577 1.26 25.6162 2.8 25.6162H12.6V15.8172H9.8V12.3526H12.6V9.48294C12.6 6.45368 14.2968 4.32591 17.8724 4.32591L20.3966 4.32871V7.97531H18.7208C17.3292 7.97531 16.8 9.0196 16.8 9.98829V12.354H20.3952L19.6 15.8172H16.8V25.6162H22.4C23.94 25.6162 25.2 24.3577 25.2 22.8165V3.21864C25.2 1.67881 23.94 0.418945 22.4 0.418945Z"
                  fill="black"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={'#'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
              >
                <path
                  d="M23.6001 1.02763C22.6425 1.70304 21.5822 2.21961 20.4601 2.55746C19.8578 1.86505 19.0574 1.37429 18.1671 1.15155C17.2768 0.928804 16.3396 0.984833 15.4822 1.31205C14.6248 1.63928 13.8885 2.2219 13.3731 2.98113C12.8576 3.74037 12.5878 4.63957 12.6001 5.55713V6.55702C10.8427 6.60258 9.10137 6.21287 7.53111 5.42259C5.96084 4.63231 4.61041 3.466 3.6001 2.02752C3.6001 2.02752 -0.399902 11.0265 8.6001 15.0261C6.54063 16.4239 4.08725 17.1248 1.6001 17.0259C10.6001 22.0253 21.6001 17.0259 21.6001 5.52714C21.5992 5.24862 21.5724 4.97079 21.5201 4.69723C22.5407 3.69083 23.2609 2.42019 23.6001 1.02763Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={'#'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M16.6001 1.01758H6.6001C3.83867 1.01758 1.6001 3.25591 1.6001 6.01703V16.0159C1.6001 18.777 3.83867 21.0154 6.6001 21.0154H16.6001C19.3615 21.0154 21.6001 18.777 21.6001 16.0159V6.01703C21.6001 3.25591 19.3615 1.01758 16.6001 1.01758Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6003 10.3869C15.7237 11.2191 15.5816 12.0691 15.1941 12.8159C14.8066 13.5627 14.1934 14.1683 13.4419 14.5466C12.6904 14.9248 11.8387 15.0565 11.0081 14.9228C10.1774 14.7892 9.41005 14.397 8.81513 13.8021C8.22021 13.2071 7.82803 12.4398 7.69436 11.6091C7.5607 10.7785 7.69236 9.9268 8.07062 9.17528C8.44888 8.42376 9.05448 7.81064 9.80128 7.42314C10.5481 7.03565 11.398 6.89349 12.2303 7.0169C13.0792 7.14279 13.8651 7.53837 14.472 8.14521C15.0788 8.75205 15.4744 9.53798 15.6003 10.3869Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.1001 5.5166H17.1101"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};




// Login Section in Footer
const LoginSection = ({
  openLoginModal,
  setOpenLoginModal,
}: {
  openLoginModal: boolean;
  setOpenLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status on mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await checkAuth();
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
      await signIn(email, password);
      setError(null);
      setOpenLoginModal(false);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
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
  );
};

export default Footer;
