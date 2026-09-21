"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseclient";

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  async function handleSubmit() {
    const { error } = await supabase.from("ads").insert([{ title, price, city }]);
    if (!error) {
      alert("Ad Posted Successfully!");
      window.location.href = "/";
    } else {
      alert(error.message);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Post New Ad</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
      <button onClick={handleSubmit} style={{ width: "100%", padding: "10px" }}>Submit</button>
    </div>
  );
}