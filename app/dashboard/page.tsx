'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOutUser } from "@/appwrite/Services/authServices";
import db from "@/appwrite/Services/dbServices";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null); // Store current user
  const [waitlistData, setWaitlistData] = React.useState<any[]>([]); // Store fetched waitlist data

  // Fetch current user on component mount
  React.useEffect(() => {
    const fetchUser = async () => {
      const currentUser: any = await getCurrentUser(); // Get the current user
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser); // Set current user if authenticated
        setLoading(false);
      }
    };

    const fetchWaitlistData = async () => {
      try {
        const response = await db.waitlist.list(); // Fetch waitlist data from Appwrite
        setWaitlistData(response.documents); // Store the fetched data
      } catch (error) {
        console.error("Error fetching waitlist data:", error);
      }
    };

    fetchUser();
    fetchWaitlistData();
  }, [router]);

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await signOutUser(); // Sign out the user
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Convert data to CSV format
  const downloadCSV = () => {
    const csvHeaders = ["First Name,Last Name,Email,Company,Country,Telephone"];
    const csvRows = waitlistData.map((entry) => 
      `${entry.firstName},${entry.lastName},${entry.email},${entry.company},${entry.country},${entry.telephone}`
    );
    const csvContent = [csvHeaders, ...csvRows].join("\n");

    // Create a blob and download it as a CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "waitlist_data.csv"); // Download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the link
  };

  if (loading) {
    return <div></div>; // Show loading spinner while data is being fetched
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">User Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Download CSV Button */}
      <div className="mb-6">
        <button
          onClick={downloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Download CSV
        </button>
      </div>

      {/* Waitlist Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="block md:table-cell text-left p-2 border-b">First Name</th>
              <th className="block md:table-cell text-left p-2 border-b">Last Name</th>
              <th className="block md:table-cell text-left p-2 border-b">Email</th>
              <th className="block md:table-cell text-left p-2 border-b">Company</th>
              <th className="block md:table-cell text-left p-2 border-b">Country</th>
              <th className="block md:table-cell text-left p-2 border-b">Telephone</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {waitlistData.map((entry) => (
              <tr key={entry.$id} className="block md:table-row">
                <td className="block md:table-cell p-2 border-b">{entry.firstName}</td>
                <td className="block md:table-cell p-2 border-b">{entry.lastName}</td>
                <td className="block md:table-cell p-2 border-b">{entry.email}</td>
                <td className="block md:table-cell p-2 border-b">{entry.company}</td>
                <td className="block md:table-cell p-2 border-b">{entry.country}</td>
                <td className="block md:table-cell p-2 border-b">{entry.telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
