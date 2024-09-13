'use client';
import { useEffect, useState } from 'react';
import db from '@/appwrite/Services/dbServices';
import { Models } from 'appwrite';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  const [slogan, setSlogan] = useState(''); // State to store the text

  useEffect(() => {
    const fetchSlogan = async () => {
      try {
        // Fetch the first document from the 'logo' collection
        const response: Models.DocumentList<Models.Document> = await db.logo.list();
        
        // Assuming the first document contains the slogan text
        if (response.documents.length > 0) {
          const fetchedSlogan = response.documents[0]?.slogan; // Replace 'slogan' with the correct field name
          setSlogan(fetchedSlogan);
        }
      } catch (error) {
        console.error('Failed to fetch slogan:', error);
      }
    };

    fetchSlogan();
  }, []); // Empty dependency array to fetch once on component mount

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <img src={'/logo.png'} alt="logo" className="max-w-full h-50 mt-5" />
      <p className="text-center text-xs font-semibold tracking-wider text-[#000033] mb-0">
        {slogan } {/* Display slogan or fallback */}
      </p>
    </div>
  );
};
