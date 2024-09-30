'use client';

import { useState, useEffect } from "react";
import db from "@/appwrite/Services/dbServices"; // Adjust the path based on your project structure
import { StarIcon } from "lucide-react";
interface TestimonialData {
  title: string;
  subTitle: string;
  clientsCount: string;
}

const Section7 = () => {
  const [data, setData] = useState<TestimonialData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document = await db["testimonialsSection"].get("66faef990008e57a760a"); // Replace with the actual document ID
        setData({
          title: document.title,
          subTitle: document.subTitle,
          clientsCount: document.clientsCount,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div></div>; // Loading state while fetching data
  }

  return (
    <section className="container">
      <div className="grid pb-7 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h4 className="text-4xl xl:text-6xl font-bold">{data.title}</h4>
          </div>
          <div className="flex items-start gap-2">
            <div>
              <svg
                className="w-12 h-12"
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="62"
                viewBox="0 0 62 62"
                fill="none"
              >
                <circle cx="31" cy="31" r="31" fill="black" />
                <path
                  d="M37.0215 17.9805H39.5117V39.5137H31.9922L37.0215 17.9805ZM25.0098 17.9805H27.5V39.5137H19.9805L25.0098 17.9805Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="max-w-[457px]">
              <p className="text-xl font-normal leading-[160%]">
                {data.subTitle}
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[559px]">
          <img
            alt="Testimonial"
            width={672}
            className="absolute -z-10 w-full h-full inset-0 object-cover"
            height={559}
            src="/images/team.webp" // Static image
          />
          <div className="bg-black p-4 absolute left-0 lg:-left-6 -bottom-10">
            <img
              src="/images/tallyfast.png"
              alt="tallyfast"
              width={125}
              height={52}
              className="object-cover max-w-[125px]"
            />
            <div className="flex items-center gap-2 justify-between">
              <StarIcon size={16} color="#FFE86B" />
              <StarIcon size={16} color="#FFE86B" />
              <StarIcon size={16} color="#FFE86B" />
              <StarIcon size={16} color="#FFE86B" />
              <StarIcon size={16} color="#FFE86B" />
            </div>
            <p className="text-sm font-normal text-white">Latest avg rating</p>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div>
          <h4 className="text-xl xl:text-2xl font-normal">
            <b className="text-2xl underline xl:text-3xl">{data.clientsCount}</b> Client
            all over the world.
          </h4>
        </div>
        <div className="flex pt-1 items-center justify-between flex-wrap gap-6">
          {/* Static logos */}
          {/* <img src="/images/google.webp" width={157} height={57} className="w-[14%] aspect-[4/3] object-contain" />
          <img src="/images/logo2.png" width={157} height={57} className="w-[14%] aspect-[4/3] object-contain" />
          <img src="/images/logo3.png" width={157} height={57} className="w-[14%] aspect-[4/3] object-contain" />
          <img src="/images/logo4.png" width={157} height={57} className="w-[14%] aspect-[4/3] object-contain" />
          <img src="/images/logo6.png" width={157} height={57} className="w-[14%] aspect-[4/3] object-contain" /> */}
        </div>
      </div>
    </section>
  );
};

export default Section7;
