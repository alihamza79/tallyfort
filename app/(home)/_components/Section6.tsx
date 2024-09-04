'use client';

import { useEffect, useState } from "react";
import db from "@/appwrite/Services/dbServices"; // Adjust the path as needed

interface BusinessManagementData {
  mainTitle: string;
  cardTitle: string;
  cardDescription: string;
}

const Section6 = () => {
  const [data, setData] = useState<BusinessManagementData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the businessManagement collection
        const document = await db["businessManagement"].get("66d89f46003a344ec7a3"); // Replace with actual document ID
        setData({
          mainTitle: document.mainTitle,
          cardTitle: document.cardTitle,
          cardDescription: document.cardDescription,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <section className="container py-10 xl:py-32">
      <div className="pb-12">
        <h4 className="text-4xl xl:text-6xl font-bold max-w-[1157px]">
          {data.mainTitle}
        </h4>
      </div>
      <div className="flex gap-12 items-start flex-col lg:flex-row justify-between">
        <div className="basis-full lg:basis-[30%]">
          <img
            width={414}
            height={896}
            className="shadow-xl max-w-[414px] w-full object-cover"
            src="/images/mobile-D.webp" // Static image
            alt="Left Image"
          />
        </div>
        <div className="basis-full flex justify-end lg:basis-[70%]">
          <img
            width={720}
            height={896}
            className="w-full object-cover shadow-xl lg:max-w-[720px]"
            src="/images/desktop-D.webp" // Static image
            alt="Right Image"
          />
        </div>
      </div>

      <div className="bg-[#F6F6F6] lg:-mt-[6rem] px-4 pt-8 flex justify-end">
        <div className="lg:max-w-[64%] gap-5 w-full flex flex-col lg:flex-row lg:items-center">
          <div className="basis-[30%]">
            <h4 className="text-lg lg:text-xl font-bold">
              {data.cardTitle}
            </h4>
            <p className="text-sm font-normal leading-[218%] opacity-70">
              {data.cardDescription}
            </p>
          </div>
          <div className="basis-full lg:basis-[70%]">
            <img
              width={534}
              height={392}
              className="object-cover"
              src="/images/Cards.webp" // Static image
              alt="Bottom Card Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;
