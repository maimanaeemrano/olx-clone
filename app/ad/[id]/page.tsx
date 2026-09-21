"use client";
import { useState, useEffect, use } from "react";
import { supabase } from "../../../lib/supabase.js";

export default function AdDetail({ params }: any) {
  const p: any = use(params);
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    async function getAd() {
      const { data } = await supabase.from('ads').select('*').eq('id', p?.id).single();
      if (data) setAd(data);
    }
    getAd();
  }, [p?.id]);

  if (!ad) return <div className="p-10 text-center">Loading...</div>;

  const whatsappLink = `https://wa.me/${ad.phone}?text=Salam! SSB Bazaar pe apka ad dekha: ${ad.title}`;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white mt-4 rounded-lg shadow-lg">
      <img src={ad.image_url || ad.image} alt={ad.title} className="w-full h-[400px] object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{ad.title}</h1>
      <p className="text-green-600 font-bold text-2xl mt-2">Rs {ad.price}</p>
      <p className="text-gray-500 mt-1">{ad.location} - {ad.category || 'General'}</p>
      <p className="mt-6 text-lg">{ad.description}</p>

      <div className="mt-8 flex gap-4">
        <a href={whatsappLink} target="_blank" className="flex-1 bg-green-500 text-white text-center py-3 rounded-full font-bold text-lg">
          WhatsApp Chat
        </a>
        <a href={`tel:${ad.phone}`} className="flex-1 bg-black text-white text-center py-3 rounded-full font-bold text-lg">
          Call: {ad.phone}
        </a>
      </div>
    </div>
  );
}