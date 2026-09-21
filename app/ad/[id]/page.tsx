"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseclient";

export default function AdDetail({ params }: { params: { id: string } }) {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    async function getAd() {
      const { data } = await supabase.from("ads").select("*").eq("id", params.id).single();
      if (data) setAd(data);
    }
    getAd();
  }, [params.id]);

  if (!ad) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>{ad.title}</h1>
      <h2>Rs {ad.price}</h2>
      <p>City: {ad.city}</p>
      <p>{ad.description}</p>
    </div>
  );
}