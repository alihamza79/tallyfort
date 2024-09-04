"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import db from "@/appwrite/Services/dbServices"; // Adjust the path based on your project structure

interface Feature {
  id: number;
  title: string;
}

interface MobileAppData {
  title: string;
  subtitle: string;
  googleLink: string;
  appStoreLink: string;
  features: Feature[];
}

const DownloadOurBankMobileApp = () => {
  const [data, setData] = useState<MobileAppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document = await db["mobileAppDownload"].get("66d8b61a002be768394b"); // Replace with your document ID
        setData({
          title: document.title,
          subtitle: document.subtitle,
          googleLink: document.googleLink,
          appStoreLink: document.appStoreLink,
          features: document.features.map((feature: string, index: number) => ({
            id: index + 1,
            title: feature,
          })),
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <section
      id="layout.download-our-bank-mobile-app"
      className="relative [background-size:100%_100%] bg-center bg-[#DCEFF0] bg-[url('/images/bg-2.png')] pt-12 pb-12 lg:pb-0 xl:pt-16"
    >
      <div className="container grid gap-6 lg:grid-cols-2">
        <div className="relative h-[450px]">
          <img
            alt="Mobile App Image"
            width={600}
            className="-z-10 w-full h-full max-w-[450px] inset-0 object-contain"
            height={459}
            src="/images/download_mobile_app.webp" // Static image
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-4xl xl:text-6xl font-bold">{data.title}</h3>
          </div>
          <p className="text-base font-normal xl:text-xl opacity-70">
            {data.subtitle}
          </p>
          <ul className="list-outside space-y-3">
            {data.features.map((f) => (
              <li key={f.id} className="flex items-center gap-2">
                <img
                  src="/checkmark.png"
                  alt="Checkmark"
                  width={16}
                  height={14}
                />
                <span className="text-xl font-normal">{f.title}</span>
              </li>
            ))}
          </ul>
          <div className="flex lg:max-w-[420px] pt-6 flex-col sm:flex-row items-center gap-6">
            <Link href={data.googleLink}>
              <button className="py-1 px-6 inline-flex items-center gap-2 bg-[#1B1B1B] border-[1.5px] border-[#1B1B1B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="29"
                  viewBox="0 0 23 29"
                  fill="none"
                >
                  <path
                    d="M17.6143 10.1594C14.7425 8.33286 10.1333 5.39993 2.984 0.847879C2.50199 0.485895 1.94742 0.438458 1.46826 0.622881L13.7345 14.5713L17.6143 10.1594Z"
                    fill="#32BBFF"
                  />
                  <path
                    d="M1.46827 0.622559C1.37847 0.657148 1.29108 0.698875 1.2075 0.749277C0.678371 1.07475 0.289551 1.70104 0.289551 2.49314V26.6488C0.289551 27.4409 0.678322 28.0672 1.2075 28.3926C1.29093 28.4429 1.37828 28.4848 1.46798 28.5196L13.7345 14.571L1.46827 0.622559Z"
                    fill="#32BBFF"
                  />
                  <path
                    d="M13.7345 14.5713L1.46802 28.52C1.94732 28.7058 2.50189 28.662 2.98404 28.2947C9.91733 23.8799 14.4746 20.9817 17.3796 19.1396C17.4605 19.088 17.5397 19.0375 17.618 18.9875L13.7345 14.5713Z"
                    fill="#32BBFF"
                  />
                  <path
                    d="M0.263184 15.1348V26.8182C0.263184 27.5845 0.654101 28.1903 1.1862 28.5051C1.27009 28.5538 1.35792 28.5943 1.44812 28.628L13.7823 15.1348H0.263184Z"
                    fill="#2C9FD9"
                  />
                  <path
                    d="M3.0064 0.856206C2.43369 0.415821 1.75831 0.428366 1.22888 0.755561L13.5767 15.1348L17.645 10.3972C14.7716 8.52569 10.1598 5.52047 3.0064 0.856206Z"
                    fill="#29CC5E"
                  />
                  <path
                    d="M13.574 14.0103L1.22888 28.3873C1.75824 28.7144 2.43341 28.7333 3.006 28.2867C9.94165 23.7637 14.5005 20.7945 17.4065 18.9073C17.4874 18.8544 17.5666 18.8026 17.645 18.7514L13.574 14.0103Z"
                    fill="#D93F21"
                  />
                  <path
                    d="M22.4729 15.1323C22.4729 14.473 22.167 13.8077 21.5606 13.4387C21.5606 13.4387 20.4266 12.7507 16.9508 10.6367L12.8164 15.1323L16.9548 19.6322C20.3925 17.5334 21.5606 16.8258 21.5606 16.8258C22.167 16.4569 22.4729 15.7915 22.4729 15.1323Z"
                    fill="#FFD500"
                  />
                  <path
                    d="M21.5609 16.8275C22.1672 16.4587 22.4732 15.7937 22.4732 15.1348H12.8167L16.9551 19.6325C20.3928 17.5348 21.5609 16.8275 21.5609 16.8275Z"
                    fill="#FFAA00"
                  />
                </svg>
                <span className="flex flex-col items-start -space-y-1">
                  <span className="text-sm text-white font-normal opacity-40">
                    Get it on
                  </span>
                  <span className="text-xl font-medium text-white">
                    Google Play
                  </span>
                </span>
              </button>
            </Link>
            <Link href={data.appStoreLink}>
              <button className="py-1 px-6 inline-flex items-center gap-2 bg-[#FFFFFF] border-[1.5px] border-[#FFFFFF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="32"
                  viewBox="0 0 25 32"
                  fill="none"
                >
                  <path
                    d="M8.79037 31.6293C4.47185 31.6028 0.899658 22.2443 0.899658 17.4782C0.899658 9.69285 6.40116 7.98842 8.5214 7.98842C9.47691 7.98842 10.4972 8.38676 11.3971 8.73926C12.0264 8.98515 12.6772 9.23898 13.0392 9.23898C13.2558 9.23898 13.7664 9.02305 14.2172 8.8336C15.1785 8.42731 16.3748 7.92236 17.7678 7.92236C17.7703 7.92236 17.7736 7.92236 17.7761 7.92236C18.8162 7.92236 21.9701 8.1647 23.8662 11.1876L24.3103 11.8961L23.6711 12.4081C22.7579 13.1396 21.0918 14.4739 21.0918 17.117C21.0918 20.2473 22.9787 21.4512 23.8853 22.0302C24.2854 22.2858 24.6997 22.5493 24.6997 23.1256C24.6997 23.502 21.8704 31.5826 17.762 31.5826C16.7566 31.5826 16.046 31.2618 15.4192 30.9789C14.785 30.6925 14.2379 30.4457 13.3338 30.4457C12.8756 30.4457 12.2961 30.6757 11.6826 30.9199C10.8443 31.252 9.89532 31.6293 8.8186 31.6293H8.79037Z"
                    fill="#111111"
                  />
                  <path
                    d="M17.7552 0.379395C17.8524 4.29272 15.3442 7.0076 12.8389 6.83733C12.4261 3.71437 15.3439 0.379395 17.7552 0.379395Z"
                    fill="#111111"
                  />
                </svg>
                <span className="flex flex-col items-start -space-y-1">
                  <span className="text-sm text-black font-normal opacity-40">
                    Download on the
                  </span>
                  <span className="text-xl font-medium text-black">
                    App Store
                  </span>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadOurBankMobileApp;
