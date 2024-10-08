'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import db from '@/appwrite/Services/dbServices'; // Adjust the path as needed
import { Logo } from '@/components/icons';

interface BannerData {
  title: string;
  description: string;
}

const CardFeaturesTwo = () => {
  const [data1, setData1] = useState<BannerData | null>(null);
  const [data2, setData2] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the first document in banner2 collection
        const document1 = await db['banner2'].get('66faee010025452a027f'); // Replace with actual document ID for the first document
        setData1({
          title: document1.title,
          description: document1.description,
        });

        // Fetch data from the second document in banner2 collection
        const document2 = await db['banner2'].get('66faee1a0016c26dac76'); // Replace with actual document ID for the second document
        setData2({
          title: document2.title,
          description: document2.description,
        });
      } catch (error) {
        console.error('Failed to fetch banner2 data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data1 || !data2) {
    return <div></div>; // Render loading state while fetching data
  }

  return (
    <section
      className="relative bg-white py-12 xl:py-24 bg-cover bg-center mb-12 xl:mb-24"
      style={{ backgroundImage: "url('/images/background.png')" }} // Static background image
    >
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 sm:px-8">
        {/* Image and Logo Section */}
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-8">
          <Image
            src="/images/3D-Mobile.png" // Static 3D image
            alt="3D Interface"
            width={700} // Adjust width here
            height={700} // Adjust height here
            className="object-contain mt-[-50px] w-64 h-64 md:w-[550px] md:h-[550px]" // Tailwind CSS classes to control size on mobile and larger screens
          />
                     <Logo className="max-w-[8rem] md:max-w-[12rem] mt-4 mb-4" />

        </div>

        {/* Text Section */}
        <div className="text-center w-full space-y-4">
          <p className="text-base sm:text-lg font-medium text-black">
            <strong>{data1.title}: </strong>{data1.description}
          </p>
          <p className="text-base sm:text-lg font-medium text-black">
            <strong>{data2.title}: </strong>{data2.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardFeaturesTwo;
