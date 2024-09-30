"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { toast } from "react-hot-toast";
import db from "@/appwrite/Services/dbServices";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { countries } from "@/app/(home)/_components/data";


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  country: string;
  telephone: string;
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
    telephone: "",
  });

  const [bannerData, setBannerData] = useState<WaitlistBannerData | null>(null);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const bannerDocument = await db["waitlistBanner"].get(
          "66faf406001058c5e08c"
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    setAgreedToPrivacy(checked === true);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidTelephone = (telephone: string) => {
    const telephoneRegex = /^[+0-9]*$/;
    return telephoneRegex.test(telephone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

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
        telephone: "",
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
              {bannerData.title}
            </h4>
          </div>
          <p className="text-sm sm:text-base xl:text-xl font-bold">
            {bannerData.subtitle}
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
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="lg:text-base text-foreground placeholder:text-foreground w-full bg-transparent outline-none border-0 focus:outline-none text-sm font-normal"
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
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
