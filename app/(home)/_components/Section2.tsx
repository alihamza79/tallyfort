"use client";

import { useEffect, useState } from "react";
import ArrowButton from "@/components/arrow-button";
import db from "@/appwrite/Services/dbServices"; // Adjust the path based on your setup

// Define types for the data
interface CardData {
  id: string; // Use string type since document ID will be a string
  title: string;
  description: string;
}

interface Section2Data {
  title: string;
  subTitle: string;
  ButtonLinkText: string;
  ButtonLinkHref: string;
  cards: CardData[];
}

const Section2 = () => {
  const [data, setData] = useState<Section2Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the feature data from Appwrite's "feature" collection
        const featureDocument = await db["feature"].get("66d80cba0010a107ac5d");

        // Fetch the cards data from the "Cards" collection
        const cardsResponse = await db["Cards"].list(); // You can also apply a query if needed

        // Map the response to the Section2Data format
        setData({
          title: featureDocument.title,
          subTitle: featureDocument.subTitle,
          ButtonLinkText: featureDocument.ButtonLinkText,
          ButtonLinkHref: featureDocument.ButtonLinkHref,
          cards: cardsResponse.documents.map((card: any) => ({
            id: card.$id, // Use document ID
            title: card.title,
            description: card.description,
          })),
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div></div>; // Render loading state while fetching data
  }

  return (
    <section className="relative bg-center bg-[#DCEFF0] py-12 xl:py-24">
      <div className="container lg:max-w-[90%] 2xl:max-w-[1800px] items-center overflow-hidden gap-8 flex flex-col xl:flex-row">
        <div className="basis-full xl:basis-[30%]">
          <div className="space-y-8">
            <div>
              <h2 className="heading">{data.title}</h2>
            </div>
            <p className="sub-heading">{data.subTitle}</p>
            <ArrowButton text={data.ButtonLinkText} />
          </div>
        </div>
        <div className="basis-full gap-y-6 flex flex-col xl:basis-[70%]">
          {/* Cards 0-11 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 w-full">
            {data.cards.slice(0, 12).map((item) => (
              <div
                className="bg-white px-4 lg:px-8 py-6 space-y-3"
                key={item.id}
              >
                {/* Static images using document ID */}
                <img
                  className="w-[66px] h-[50px]"
                  height={66}
                  src={`/images/${item.id}.webp`} // Use document ID for image path
                  width={49}
                />
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="sub-heading text-base opacity-70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          {/* Card 12 and beyond */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {data.cards.slice(12).map((item) => (
              <div
                className="flex gap-2 lg:flex-row flex-col lg:items-center bg-white px-4 lg:px-8 py-2 space-y-3"
                key={item.id}
              >
                <img
                  className="w-[66px] h-[50px]"
                  height={66}
                  src={`/images/${item.id}.webp`} // Use document ID for image path
                  width={49}
                />
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <p className="sub-heading text-base opacity-70">
                  {item.description}
                </p>
              </div>
            ))}
            <div
              className="flex gap-2 items-center justify-center text-xl bg-white px-4 lg:px-8 font-bold py-2 space-y-3"
            >
              <p>AND MANY MORE</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
