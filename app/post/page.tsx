"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("Sargodha");
  const [desc, setDesc] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title ||!price) { alert("Title Price likho G!"); return; }
    setLoading(true);
    let imageUrl = "";
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage.from("ads").upload(fileName, image);
      if (!error) {
        const { data: urlData } = supabase.storage.from("ads").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }
    }
    const { error } = await supabase.from("ads").insert([{ title, price, location, description: desc, whatsapp, image_url: imageUrl }]);
    setLoading(false);
    if (error) alert("Error: " + error.message);
    else { alert("MASHALLAH G Ad Post ho gayi G!"); window.location.href = "/"; }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow mt-6">
      <h1 className="text-2xl font-bold text-center mb-4">+ Post Your Ad</h1>

      <div className="mb-3">
        <label className="font-bold">Ad Photo G (Zaroori)</label>
        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files?.[0]||null)} className="w-full border-2 p-2 rounded-lg mt-1" />
        {image && <p className="text-green-600 text-sm">✅ {image.name} selected G!</p>}
      </div>

      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title - e.g. iPhone 12 for Sale" className="w-full border p-3 rounded-lg mb-3" />
      <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price - e.g. 50000" className="w-full border p-3 rounded-lg mb-3" />
      <select value={location} onChange={e=>setLocation(e.target.value)} className="w-full border p-3 rounded-lg mb-3">
        <option>Sargodha</option><option>Lalian</option><option>Lahore</option><option>Faisalabad</option>
      </select>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description - Kitab kaisi hai, bike ka model..." className="w-full border p-3 rounded-lg mb-3" rows={3}></textarea>
      <input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="WhatsApp Number - 03XX-XXXXXXX" className="w-full border p-3 rounded-lg mb-3" />

      <button onClick={handlePost} disabled={loading} className="w-full bg-black text-white p-3 rounded-full font-bold">
        {loading? "Posting... G" : "Post Ad Now"}
      </button>
    </div>
  );
}