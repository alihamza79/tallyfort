'use client';
import { useState } from 'react';
import db from '@/appwrite/Services/dbServices';
import { Query } from 'appwrite';
import { toast } from 'react-hot-toast';

const OurNewsletter = () => {
  const [email, setEmail] = useState(''); // State for the email input
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle submission status

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value); // Update email state as user types
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true); // Set submission state to true

    try {
      // Query the newsletter collection to check if the email already exists
      const existingEmails = await db.newsletter.list([Query.equal('email', [email])]);

      if (existingEmails.documents.length > 0) {
        toast.error('Already subscribed'); // Use toast for error message
      } else {
        // Create the payload for the database
        const payload = {
          email: email,
        };

        // Save the email to the newsletter collection in the database
        await db.newsletter.create(payload);
        toast.success('Successfully subscribed!'); // Use toast for success message
        setEmail(''); // Clear email input
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.'); // Use toast for error message
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  return (
    <div className="container border-y mt-24 border-[#E2E2E2] py-16 flex flex-col lg:flex-row gap-y-6 lg:items-center justify-between">
      <div>
        <h3 className="text-4xl xl:text-6xl font-bold">Our Newsletter.</h3>
        <h4 className="text-base xl:text-xl font-normal opacity-60">
          Get instant news by subscribing to our daily newsletter
        </h4>
      </div>
      <div className="flex flex-col items-end">
        <form onSubmit={handleSubmit} className="inline-flex items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
            className="bg-[#F6F6F6] text-lg font-normal opacity-70 xl:min-w-[347px] rounded-full px-5 py-2.5 border-0 outline-0 focus:outline-none"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="71"
              viewBox="0 0 70 71"
              fill="none"
              className="w-12 h-12"
            >
              <path
                d="M0 35.0913C0 15.7635 15.6722 0.0952148 35 0.0952148C54.3278 0.0952148 70 15.7635 70 35.0913C70 54.4192 54.3278 70.0875 35 70.0875C15.6722 70.0875 0 54.4192 0 35.0913Z"
                fill="#101010"
              />
              <path
                d="M20.9999 35.3092L49.4534 35.1629"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M38.6698 24.3794L49.4535 35.1631L39.9203 44.6964"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OurNewsletter;
