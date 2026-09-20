"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";
import Link from "next/link";

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Pakistan");

  async function fetchAds() {
    const { data } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
    if (data) setAds(data);
  }
  useEffect(() => { fetchAds(); }, []);

  const filteredAds = ads.filter(ad => {
    const m1 = ad.title.toLowerCase().includes(search.toLowerCase());
    const m2 = city === "All Pakistan" || (ad.location && ad.location.toLowerCase().includes(city.toLowerCase()));
    return m1 && m2;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white p-3 shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <img src="/ssb-logo.png" className="w-[55px] h-[55px] min-w-[55px] aspect-square rounded-full border-2 border-[#00ff88] object-cover" alt="logo" />
          <div className="flex flex-1 gap-2 max-w-2xl">
            <select value={city} onChange={e=>setCity(e.target.value)} className="border p-2 rounded w-1/3 bg-white text-sm">
              <option>All Pakistan</option><option>Sargodha</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option>
            </select>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="border p-2 rounded w-2/3 text-sm" />
          </div>
          <Link href="/post" className="bg-black text-white px-5 py-2 rounded-full font-bold text-sm">+ SELL</Link>
        </div>
      </div>
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="font-bold mb-3">Fresh Ads ({filteredAds.length}) - {city}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredAds.map((ad:any) => (
            <Link key={ad.id} href={`/ad/${ad.id}`} className="bg-white p-3 rounded shadow">
              <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs">IMG</div>
              <p className="font-bold truncate text-sm">{ad.title}</p>
              <p className="text-green-600 font-bold text-sm">Rs {ad.price}</p>
              <p className="text-xs text-gray-500">{ad.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}