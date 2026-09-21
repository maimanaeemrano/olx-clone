"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseclient";
import Link from "next/link";

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    async function getAds() {
      const { data } = await supabase.from("ads").select("*").order("created_at", { ascending: false });
      if (data) setAds(data);
    }
    getAds();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>PakClassified - All Ads</h1>
      <Link href="/post"><button style={{ padding: "10px", marginBottom: "20px" }}>Post New Ad</button></Link>
      {ads.map((ad) => (
        <div key={ad.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <Link href={`/ad/${ad.id}`}><h3>{ad.title} - Rs {ad.price}</h3></Link>
          <p>{ad.city}</p>
        </div>
      ))}
    </div>
  );
}