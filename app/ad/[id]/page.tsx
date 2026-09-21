"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseclient";

export default function AdDetail({ params }: any) {
  const [ad, setAd] = useState<any>(null);
  const id = params.id;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("ads").select("*").eq("id", id).single();
      setAd(data);
    })();
  }, [id]);

  if (!ad) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", background: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 2px 10px #ccc" }}>
      <img src={ad.image_url} style={{ width: "100%", height: "350px", objectFit: "cover" }} />
      <div style={{ padding: "15px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "22px" }}>{ad.title}</h2>
        <h3 style={{ color: "green", fontWeight: "bold" }}>Rs {ad.price}</h3>
        <p>{ad.description}</p>
        <a href={`https://wa.me/${ad.whatsapp}`} target="_blank" style={{ display: "block", background: "#25D366", color: "white", textAlign: "center", padding: "13px", borderRadius: "30px", marginTop: "15px", textDecoration: "none" }}>WhatsApp G</a>
      </div>
    </div>
  );
}