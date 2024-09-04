"use client";

import { useEffect, useState } from "react";
import AvatarCircles from "@/components/magicui/avatar-circles";
import Section1Form from "./Section1Form";
import db from "@/appwrite/Services/dbServices"; // Adjust the path based on your setup

// Define the type for the text-related data you expect to fetch from Appwrite
interface HeroTextData {
  title: string;
  subTitle: string;
  total_client: string;
  active_users: string;
  total_country: string;
}

const Section1 = () => {
  const [textData, setTextData] = useState<HeroTextData | null>(null); // State to store the text data
  const avatarUrls = ["/images/person1.webp", "/images/person2.webp"];

  // Static images
  const images = {
    image1: { url: "/images/bank_card_hero.webp" },
    image2: { url: "/images/dashboard_hero.webp" },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the document from the "hero" collection
        const document = await db["hero"].get("66d805d40019545ceb90");
        
        // Set the state with only the text fields from the document
        setTextData({
          title: document.title,
          subTitle: document.subTitle,
          total_client: document.total_client,
          active_users: document.active_users,
          total_country: document.total_country,
        });
      } catch (error) {
        console.error("Failed to fetch document:", error);
      }
    };

    fetchData();
  }, []);

  if (!textData) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <section className="container lg:items-center relative py-16 lg:pt-[5.5rem] flex gap-2 flex-col lg:flex-row">
      <div className=" lg:hidden pb-6 relative">
        <div className=" lg:hidden w-full h-[320px] bg-[#FFF2AC] rounded-full"></div>
        <img
          className="absolute lg:hidden left-0 right-0 top-4"
          src={images.image1.url}
          alt="Description"
          width={400}
          height={500}
        />
      </div>
      <div className="flex-1 max-w-[325px] space-y-6">
        <div>
          <h2 className="title-heading font-timmaana">{textData.title}</h2>
        </div>
        <div>
          <h3 className=" text-4xl font-medium">Join the waitlist</h3>
          <p className=" text-sm font-bold">{textData.subTitle}</p>
          <Section1Form />
        </div>
        <div className="flex pb-8 items-center justify-between">
          <div className=" -space-y-1">
            <h4 className=" text-2xl font-bold text-[#043116]">
              {textData.total_client}
            </h4>
            <p className=" text-[#373A3299]/60 font-normal text-sm">
              Worldwide clients
            </p>
          </div>
          <AvatarCircles numPeople={99} avatarUrls={avatarUrls || []} />
        </div>
      </div>
      <div className="flex-1"></div>
      <div className="flex-1 flex flex-col items-end">
        <div className=" space-y-8 max-w-[306px]">
          <div>
            <img
              src={images.image2.url}
              alt="Description"
              width={400}
              className="]"
              height={270}
            />
          </div>
          <div className="">
            <p className="sub-heading">
              <b>{textData.total_country}</b> countries using our service without
              any hassle.
            </p>
          </div>
          <div className=" gap-4 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="92"
              viewBox="0 0 95 92"
              fill="none"
            >
              {/* Your SVG code */}
            </svg>
            <div>
              <h2 className=" font-medium text-5xl">{textData?.active_users}</h2>
              <h4 className="sub-heading text-black/50">Total Active user </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:h-[542px] sm:w-[300px] sm:h-[300px] 2xl:w-[542px] hidden lg:block rounded-full bg-[#FFF2AC] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-10"></div>
      <img
        className="absolute hidden lg:block -z-10 left-[40%] -translate-x-[40%] top-1/2 -translate-y-1/2 max-w-[500px] xl:max-w-[730px]"
        src={images.image1.url}
        alt="Description"
        width={742}
        height={669}
      />
    </section>
  );
};

export default Section1;
