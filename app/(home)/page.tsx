import DownloadOurBankMobileApp from "@/components/common/DownloadOurBankMobileApp";
import JoinTheWaitlist from "@/components/common/JoinTheWaitlist";
import LatestNews from "@/components/common/LatestNews";
import { Metadata } from "next";
import Section1 from "./_components/Section1";
import Section2 from "./_components/Section2";
import Section3 from "./_components/Section3";
import Section4 from "./_components/Section4";
import Section6 from "./_components/Section6";
import Section7 from "./_components/Section7";
import OurNewsletter from "@/components/common/OurNewsletter";
import CardFeaturesSection from "./_components/CardFeaturesSection";
import CardFeaturesTwo from "./_components/CardFeaturesTwo";
import ScrollToTopButton from "@/components/common/ScrollToTopButton"; // Import your new component

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tallyfort.com/"),
  title: {
    default: "tallyfort | Banking",
    template: `%s | tallyfort | Banking`,
  },
  description: "Description for your application",
  alternates: {
    canonical: `https://www.tallyfort.com/`,
    languages: {
      en: "en-US",
    },
  },
};

export default function Home() {
  return (
    <main>
      <Section1 />
      <Section2 />
      <JoinTheWaitlist />
      <Section3 />
      <Section4 />
      <Section6 />
      <CardFeaturesSection />
      <CardFeaturesTwo />
      <Section7 />
      <DownloadOurBankMobileApp />
      <LatestNews />
      <div className="container">
        <JoinTheWaitlist key="join-the-waitlsdsdsdfdfdist" />
      </div>
      <OurNewsletter />
      <ScrollToTopButton /> 
    </main>
  );
}
