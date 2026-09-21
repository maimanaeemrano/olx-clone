"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdDetail({ params }: any) {
  const [ad, setAd] = useState<any>(null);
  const id = params.id;

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("ads").select("*").eq("id", id).single();
      setAd(data);
    })();
  }, [id]);

  if (!ad) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading ad... G</p>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", background: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 2px 10px #ccc" }}>
      <img src={ad.image_url || "https://via.placeholder.com/400"} style={{ width: "100%", height: "350px", objectFit: "cover" }} />
      <div style={{ padding: "15px" }}>
        <p style={{ background: "#eee", display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>{ad.category}</p>
        <h2 style={{ fontWeight: "bold", fontSize: "22px", marginTop: "8px" }}>{ad.title}</h2>
        <h3 style={{ color: "green", fontWeight: "bold", fontSize: "22px", margin: "8px 0" }}>Rs {ad.price}</h3>
        <p style={{ color: "#555", fontSize: "14px" }}>{ad.location}</p>
        <p style={{ color: "#333", marginTop: "12px", borderTop: "1px solid #eee", paddingTop: "10px" }}>{ad.description}</p>

        <a href={`https://wa.me/${ad.whatsapp}?text=Salam G! Mujhe ye chahiye: ${ad.title} - Rs ${ad.price}`} target="_blank" style={{ display: "block", background: "#25D366", color: "white", textAlign: "center", padding: "14px", borderRadius: "30px", marginTop: "20px", textDecoration: "none", fontWeight: "bold" }}>
          WhatsApp Pe Rabta Karein G
        </a>
        <a href={`tel:${ad.whatsapp}`} style={{ display: "block", background: "black", color: "white", textAlign: "center", padding: "14px", borderRadius: "30px", marginTop: "10px", textDecoration: "none", fontWeight: "bold" }}>
          Call Karein G
        </a>
        <a href="/" style={{ display: "block", textAlign: "center", padding: "10px", marginTop: "10px", textDecoration: "none", color: "#555" }}>Wapis Home Pe Jao G</a>
      </div>
    </div>
  );
}