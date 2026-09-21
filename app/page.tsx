"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseclient";
import Link from "next/link";

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  useEffect(() => {
    fetchAds();
  }, []);

  async function fetchAds() {
    const { data } = await supabase.from("ads").select("*").order("id", { ascending: false });
    if (data) setAds(data);
  }

  const filtered = ads.filter((ad) => {
    const matchSearch = ad.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || ad.category === category;
    const matchLocation = location === "All" || ad.location === location;
    return matchSearch && matchCategory && matchLocation;
  });

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "15px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "28px" }}>SSB Bazaar</h1>
        <Link href="/post" style={{ background: "black", color: "white", padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>+ Sell</Link>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1, minWidth: "200px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}>
          <option>All</option><option>Books</option><option>Mobiles</option><option>Bikes</option><option>Cars</option><option>Furniture</option><option>Electronics</option><option>Others</option>
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}>
          <option>All</option><option>Sargodha</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Faisalabad</option><option>Multan</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {filtered.map((ad) => (
          <Link key={ad.id} href={`/ad/${ad.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div style={{ border: "1px solid #eee", borderRadius: "10px", overflow: "hidden", background: "white", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
              <img src={ad.image_url || "https://via.placeholder.com/300"} style={{ width: "100%", height: "180px", objectFit: "cover" }} alt={ad.title} />
              <div style={{ padding: "10px" }}>
                <h3 style={{ fontWeight: "bold", fontSize: "16px", margin: "5px 0" }}>{ad.title}</h3>
                <p style={{ color: "green", fontWeight: "bold" }}>Rs {ad.price}</p>
                <p style={{ fontSize: "12px", color: "#666" }}>{ad.location} - {ad.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ textAlign: "center", marginTop: "30px", color: "#888" }}>No ads found.</p>}
    </div>
  );
}