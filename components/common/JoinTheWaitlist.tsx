"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import db from "@/appwrite/Services/dbServices";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string; // Make company optional
  country: string;
  telephone: string; // Add telephone attribute
}

interface WaitlistBannerData {
  title: string;
  subtitle: string;
}

const JoinTheWaitlist = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    telephone: "", // Initialize telephone attribute
  });

  const [bannerData, setBannerData] = useState<WaitlistBannerData | null>(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  // Fetch the title and subtitle from Appwrite's waitlistBanner collection
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const bannerDocument = await db["waitlistBanner"].get(
          "66d88fa1002da64b2675"
        ); // Replace with your document ID
        setBannerData({
          title: bannerDocument.title,
          subtitle: bannerDocument.subtitle,
        });
      } catch (error) {
        console.error("Failed to fetch banner data:", error);
      }
    };

    fetchBannerData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    setAgreedToPrivacy(checked === true);
  };

  // Validation function for email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  // Validation function for telephone
  const isValidTelephone = (telephone: string) => {
    const telephoneRegex = /^[+0-9]*$/; // Allow only numbers and optional plus sign
    return telephoneRegex.test(telephone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.telephone
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Email validation
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Telephone validation
    if (!isValidTelephone(formData.telephone)) {
      toast.error("Please enter a valid telephone number (10-15 digits).");
      return;
    }

    if (!agreedToPrivacy) {
      toast.error("You must agree to the Privacy Policy.");
      return;
    }

    try {
      await db.waitlist.create(formData);
      toast.success("You have successfully joined the waitlist!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        country: "",
        telephone: "", // Reset telephone
      });
      setAgreedToPrivacy(false);
    } catch (error) {
      toast.error("Failed to join the waitlist. Please try again.");
      console.error(error);
    }
  };

  if (!bannerData) {
    return <div></div>; // Render a loading state while fetching banner data
  }

  return (
    <div
      style={{
        background: "linear-gradient(270deg, #DCEFF0 30%, #FFF2AC 100%)",
      }}
      className="py-10 xl:py-20"
    >
      <form
        onSubmit={handleSubmit}
        className="container flex flex-col lg:flex-row gap-6 lg:items-center"
      >
        <div className="basis-full space-y-2 lg:basis-[40%]">
          <div>
            <h4 className="max-w-[356.094px] font-bold text-4xl xl:text-6xl leading-tight">
              {bannerData.title} {/* Dynamically fetched title */}
            </h4>
          </div>
          <p className="text-sm sm:text-base xl:text-xl font-bold">
            {bannerData.subtitle} {/* Dynamically fetched subtitle */}
          </p>
        </div>
        <div className="basis-full space-y-5 lg:basis-[60%]">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
              <label
                htmlFor="firstName"
                className="relative inline-flex gap-2 items-center text-base font-medium"
              >
                <img
                  src="/images/asterik.svg"
                  alt="Required"
                  className="inline-block w-2 h-2 ml-1"
                />
                FIRST NAME
                
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
                required
              />
            </div>
            <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
              <label
                htmlFor="lastName"
                className="relative inline-flex gap-2 items-center text-base font-medium"
              >
                <img
                  src="/images/asterik.svg"
                  alt="Required"
                  className="inline-block w-2 h-2 ml-1"
                />
                LAST NAME
               
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
                required
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
              <label
                htmlFor="email"
                className="relative inline-flex gap-2 items-center text-base font-medium"
              >
                <img
                  src="/images/asterik.svg"
                  alt="Required"
                  className="inline-block w-2 h-2 ml-1"
                />
                EMAIL ADDRESS
               
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
                required
              />
            </div>
            <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
              <label
                htmlFor="company"
                className="relative inline-flex gap-2 items-center text-base font-medium"
              >
                COMPANY
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
              />
            </div>
          </div>
          <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label
              htmlFor="country"
              className="relative inline-flex gap-2 items-center text-base font-medium"
            >
              <img
                src="/images/asterik.svg"
                alt="Required"
                className="inline-block w-2 h-2 ml-1"
              />
              COUNTRY
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
              required
            />
          </div>
          {/* Telephone input */}
          <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label
              htmlFor="telephone"
              className="relative inline-flex gap-2 items-center text-base font-medium"
            >
              <img
                src="/images/asterik.svg"
                alt="Required"
                className="inline-block w-2 h-2 ml-1"
              />
              TELEPHONE
              
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2">
              <Checkbox
                id="privacy"
                checked={agreedToPrivacy}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="privacy">
                By clicking this box you agree to our Privacy Policy
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="rounded-full">
              Join the waitlist
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JoinTheWaitlist;
