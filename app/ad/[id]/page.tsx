"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "../../../lib/supabase.js";

export default function AdDetail({ params }: any) {
  const p = use(params);
  const [ad, setAd] = useState<any>(null);
  useEffect(() => {
    async function getAd() {
      const { data } = await supabase.from('ads').select('*').eq('id', p.id).single();
      if (data) setAd(data);
    }
    getAd();
  }, [p.id]);
  if (!ad) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white mt-4 rounded shadow">
      <h1 className="text-2xl font-bold">{ad.title}</h1>
      <p className="text-green-600 font-bold text-xl mt-2">Rs {ad.price}</p>
      <p className="text-gray-500 mt-1">{ad.location}</p>
      <p className="mt-4">{ad.description}</p>
      <p className="mt-4 font-bold">Contact: {ad.phone}</p>
    </div>
  );
}