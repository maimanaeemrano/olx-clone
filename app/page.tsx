"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Ad = {
  id: string;
  title: string;
  price: number;
  location: string;
  image_url: string;
};

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setAds(data);
      }
      setLoading(false);
    };
    fetchAds();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading ads...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fresh Recommendations</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ads.map((ad) => (
          <Link key={ad.id} href={`/ad/${ad.id}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer">
              <img 
                src={ad.image_url || "https://via.placeholder.com/300"} 
                alt={ad.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="font-bold">Rs {ad.price}</p>
                <p className="text-sm text-gray-600 truncate">{ad.title}</p>
                <p className="text-xs text-gray-400">{ad.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {ads.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No ads found. Post your first ad!</p>
      )}
    </div>
  );
}