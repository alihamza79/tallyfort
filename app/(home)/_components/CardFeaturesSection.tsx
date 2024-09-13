'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import db from '@/appwrite/Services/dbServices'; // Adjust the path as needed
import { Logo } from '@/components/icons';

interface Banner1Data {
  title: string;
}

const CardFeaturesSection = () => {
  const [data, setData] = useState<Banner1Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the banner1 collection
        const document = await db['banner1'].get('66d8a0c50039ff7f576d'); // Replace with the actual document ID
        setData({
          title: document.title,
        });
      } catch (error) {
        console.error('Failed to fetch banner1 data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div></div>; // Render loading state
  }

  return (
    <section className="p-10 sm:p-20 relative bg-gray-100 py-12 xl:py-24">
      <div className="container mx-auto flex flex-col xl:flex-row items-center justify-center gap-8 px-4">
        {/* Image Section */}
        <div className="flex justify-center w-full xl:w-1/2 mb-8 xl:mb-0">
          <Image
            src="/images/mobile.png" // Static image
            alt="Card Features"
            width={200}
            height={420}
            className="w-3/4 sm:w-2/3 xl:w-full h-auto" // Responsive width adjustments
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-center xl:items-start w-full xl:w-1/2 space-y-6 text-center xl:text-left">
          <div className="flex justify-center xl:justify-start">
          <Logo className="max-w-[8rem] md:max-w-[12rem] mt-4 mb-4" />

          </div>
          <p className="text-3xl sm:text-4xl xl:text-5xl font-medium text-black">
            {data.title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardFeaturesSection;
