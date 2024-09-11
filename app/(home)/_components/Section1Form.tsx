import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-hot-toast";
import db from "@/appwrite/Services/dbServices";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string; // Make company optional
  country: string;
  telephone: string; // Add telephone attribute
}

const Section1Form = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    telephone: "", // Initialize telephone attribute
  });

  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (checked: CheckedState) => {
    setAgreedToPrivacy(checked === true);
  };

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Telephone validation
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

    // Validate email format
    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate telephone format
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

  return (
    <form className="pt-2" onSubmit={handleSubmit}>
      <div className="flex items-center shrink-0 gap-3 flex-wrap justify-between">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label htmlFor="firstName" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
              <img src="/images/asterik.svg" alt="Required" className="inline-block w-2 h-2 ml-1" />
              FIRST NAME
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
              required
            />
          </div>
          <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label htmlFor="lastName" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
              <img src="/images/asterik.svg" alt="Required" className="inline-block w-2 h-2 ml-1" />
              LAST NAME
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
              required
            />
          </div>
        </div>
        <div className="grid gap-3 grid-cols-12">
          <div className="col-span-full sm:col-span-7 border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label htmlFor="email" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
              <img src="/images/asterik.svg" alt="Required" className="inline-block w-2 h-2 ml-1" />
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
              required
            />
          </div>
          <div className="col-span-12 sm:col-span-5 border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
            <label htmlFor="company" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
              COMPANY
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
            />
          </div>
        </div>
        <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
          <label htmlFor="country" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
            <img src="/images/asterik.svg" alt="Required" className="inline-block w-2 h-2 ml-1" />
            COUNTRY
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
            required
          />
        </div>
        {/* Telephone input */}
        <div className="border relative overflow-hidden px-4 p border-black rounded-[10px] h-14">
          <label htmlFor="telephone" className="relative inline-flex gap-2 items-center text-[10px] font-medium">
            <img src="/images/asterik.svg" alt="Required" className="inline-block w-2 h-2 ml-1" />
            TELEPHONE
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="placeholder:text-foreground bg-transparent w-full outline-none border-0 focus:outline-none text-sm font-normal"
            required
          />
        </div>
      </div>

      <div className="flex gap-1 py-4 items-start">
        <Checkbox id="terms" checked={agreedToPrivacy} onCheckedChange={handleCheckboxChange} />
        <label
          htmlFor="terms"
          className="text-sm flex-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          By clicking this box you agree to our Privacy Policy
        </label>
      </div>
      <div>
        <Button type="submit" className="rounded-full">
          Join the waitlist
        </Button>
      </div>
    </form>
  );
};

export default Section1Form;
