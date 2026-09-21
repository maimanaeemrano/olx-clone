"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PostAd() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    setLoading(true);
    const { error } = await supabase.from("ads").insert([
      { title, price: Number(price), location, image_url: "https://via.placeholder.com/300" }
    ]);
    setLoading(false);
    if (!error) {
      router.push("/");
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post Your Ad</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 mb-3 rounded" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="w-full border p-2 mb-3 rounded" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full border p-2 mb-3 rounded" />
      <button onClick={handlePost} disabled={loading} className="w-full bg-black text-white p-3 rounded">
        {loading ? "Posting..." : "Post Now"}
      </button>
    </div>
  );
}