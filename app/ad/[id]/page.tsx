"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function AdDetail() {
  const params = useParams();
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    const fetchAd = async () => {
      const { data } = await supabase.from("ads").select("*").eq("id", params.id).single();
      if (data) setAd(data);
    };
    if (params.id) fetchAd();
  }, [params.id]);

  if (!ad) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={ad.image_url} alt={ad.title} className="w-full h-96 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">Rs {ad.price}</h1>
      <h2 className="text-xl mt-2">{ad.title}</h2>
      <p className="text-gray-600 mt-2">{ad.description}</p>
      <p className="text-sm text-gray-400 mt-2">{ad.location}</p>
    </div>
  );
}