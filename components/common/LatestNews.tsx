'use client'
import { useEffect, useState } from "react";
import ArrowButton from "../arrow-button";
import NewsCard from "./NewsCard";
import db from "@/appwrite/Services/dbServices"; // Adjust path according to your structure

// Types for fetched data
interface NewsHeader {
  title: string;
  subTitle: string;
}

interface NewsBody {
  id: string;
  title: string;
  author_name: string;
  date: string;
}

const LatestNews = () => {
  const [headerData, setHeaderData] = useState<NewsHeader | null>(null);
  const [newsCards, setNewsCards] = useState<NewsBody[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Fetching newsHeader from Appwrite
        const headerDocument = await db["newsHeader"].get("66d8bc3f0012336cfb7f");
        setHeaderData({
          title: headerDocument.title,
          subTitle: headerDocument.subTitle,
        });

        // Fetching newsBody from Appwrite
        const bodyResponse = await db["newsBody"].list(); // Assuming you have two documents in newsBody collection
        const fetchedNews = bodyResponse.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          author_name: doc.author_name,
          date: doc.date,
        }));
        setNewsCards(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news data:", error);
      }
    };

    fetchNewsData();
  }, []);

  if (!headerData || newsCards.length === 0) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }

  return (
    <section id="layout.latest-news" className="container space-y-8 py-16 xl:py-24">
      <div>
        <div className="flex flex-col sm:flex-row gap-y-5 sm:items-end justify-between">
          <div className="space-y-1">
            <h3 className="text-4xl xl:text-6xl font-bold">{headerData.title}</h3>
            <h6 className="text-base xl:text-xl font-normal">{headerData.subTitle}</h6>
          </div>
          <ArrowButton text="See all blogs" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-7">
        {newsCards.map((news, index) => (
          <NewsCard
            key={news.id}
            author_name={news.author_name}
            date={news.date}
            title={news.title}
            image={
              index === 0
                ? { url: "/images/discussion.webp", alternativeText: "Image 1" }
                : { url: "/images/blog2.png", alternativeText: "Image 2" }
            } // Use the index to assign images
          />
        ))}
      </div>
    </section>
  );
};

export default LatestNews;
