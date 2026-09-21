"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";
import Link from "next/link";

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Pakistan");

  const categories = ["All", "Mobiles", "Bikes", "Cars", "Electronics", "Home", "Books", "Jobs", "Services"];

  useEffect(() => {
    async function fetchAds() {
      const { data } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
      if (data) setAds(data);
    }
    fetchAds();
  }, []);

  const filteredAds = ads.filter((ad: any) => {
    const matchSearch = ad.title?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || ad.category === category;
    const matchLocation = location === "All Pakistan" || ad.location?.toLowerCase().includes(location.toLowerCase());
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER - SINGLE LOGO G */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-3 flex flex-col md:flex-row gap-3 items-center justify-between">
          
          <div className="flex items-center gap-2">
            <img src="/ssb-logo.png" alt="SSB Bazaar" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-bold text-xl">SSB BAZAAR</span>
          </div>

          <div className="flex flex-1 max-w-3xl gap-2 w-full">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-2 border-black rounded px-3 py-2 bg-white font-medium"
            >
              <option>All Pakistan</option>
              <option>Sargodha</option>
              <option>Lahore</option>
              <option>Faisalabad</option>
              <option>Islamabad</option>
              <option>Karachi</option>
            </select>
            <input
              type="text"
              placeholder="Search Mobiles, Cars, Bikes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-2 border-black rounded px-4 py-2 outline-none"
            />
          </div>

          <Link href="/post" className="bg-black text-white px-6 py-2 rounded-full font-bold whitespace-nowrap">
            + SELL
          </Link>
        </div>

        {/* CATEGORY BAR G */}
        <div className="max-w-7xl mx-auto px-3 pb-3 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border ${category === cat ? "bg-black text-white border-black" : "bg-white text-black border-gray-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ADS G */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="font-bold text-lg mb-4">Fresh Ads ({filteredAds.length}) - {location}</h2>
        
        {filteredAds.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg">Koi ad nahi mila G!</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredAds.map((ad: any) => (
              <Link key={ad.id} href={`/ad/${ad.id}`} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img src={ad.image_url || ad.image} alt={ad.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="font-bold truncate">{ad.title}</p>
                  <p className="text-green-600 font-bold">Rs {ad.price}</p>
                  <p className="text-gray-500 text-xs truncate">{ad.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}