'use client'

import { useEffect, useState } from "react";
import db from "@/appwrite/Services/dbServices";

// Define the types for the fetched data
interface AnalyticsData {
  description: string;
  username: string;
  user_role: string;
}

interface AnalyticsNumber {
  id: string;
  title: string;
  value: string;
}

const Section3 = () => {
  // State to hold the fetched data
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [analyticsNumbers, setAnalyticsNumbers] = useState<AnalyticsNumber[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the analytics document for the description, username, and role
        const analyticsDocument = await db["analytics"].get("66d8934e003919c4b65c"); // Replace with the actual document ID
        setAnalyticsData({
          description: analyticsDocument.description,
          username: analyticsDocument.username,
          user_role: analyticsDocument.user_role,
        });

        // Fetch the analytics numbers (values) from the analyticsNumbers collection
        const numbersResponse = await db["analyticsNumbers"].list(); // Fetch all documents from analyticsNumbers collection
        setAnalyticsNumbers(numbersResponse.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          value: doc.value,
        })));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Check if data is still loading
  if (!analyticsData || analyticsNumbers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container py-8 lg:py-20">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="inline-flex items-center gap-2">
            <img
              src="/images/ceo.webp"  // Static image as requested
              alt="User Avatar"
              width={60}
              height={60}
              className="w-12 h-12 rounded-full"
            />
            <div className="-space-y-1">
              <h3 className="text-xl font-normal">{analyticsData.username}</h3>
              <h3 className="text-lg font-normal opacity-40">{analyticsData.user_role}</h3>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <p className="max-w-[600px] font-normal text-2xl">{analyticsData.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap pt-20 gap-7">
        {analyticsNumbers.map((item) => (
          <div key={item.id}>
            <h2 className="text-center text-4xl xl:text-6xl font-medium">
              {item.title}
            </h2>
            <p className="text-center text-lg xl:text-2xl">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section3;
