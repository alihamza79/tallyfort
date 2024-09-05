'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import db from '@/appwrite/Services/dbServices'; // Adjust the path as needed

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
        const document1 = await db['banner2'].get('66d8a4a20023697392f9'); // Replace with the actual document ID for the first document
        setData1({
          title: document1.title,
          description: document1.description,
        });

        // Fetch data from the second document in banner2 collection
        const document2 = await db['banner2'].get('66d8a4890008357cd8ae'); // Replace with the actual document ID for the second document
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
      <div className="container mx-auto flex flex-col items-center gap-8">
        {/* Image and Logo Section */}
        <div className="flex justify-center items-center w-full gap-8">
          <Image
            src="/images/3D-Mobile.png" // Static 3D image
            alt="3D Interface"
            width={600}
            height={600}
            className="w-auto h-auto"
          />
          <Image
            src="/images/logo.svg" // Static logo
            alt="Tallyfort Logo"
            width={200}
            height={50}
            className="w-auto h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="text-center w-full space-y-4">
          <p className="text-lg font-medium text-black">
            <strong>{data1.title}: </strong>{data1.description}
          </p>
          <p className="text-lg font-medium text-black">
            <strong>{data2.title}: </strong>{data2.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CardFeaturesTwo;
