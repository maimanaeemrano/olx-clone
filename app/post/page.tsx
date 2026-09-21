"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // agar aapka path alag hai G to ye line change hogi G

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("Sargodha");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title ||!price) { alert("Title Price likho G!"); return; }
    setLoading(true);
    let image_url = "";
    try {
      if (image) {
        const fileName = `${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage.from('ad-images').upload(fileName, image);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('ad-images').getPublicUrl(fileName);
        image_url = data.publicUrl;
      }
      const { error } = await supabase.from('ads').insert([{ title, price: Number(price), city, description, phone, image_url }]);
      if (error) throw error;
      alert("MASHALLAH G Ad lag gaya G!");
      window.location.href = "/";
    } catch (e: any) {
      alert("Error G: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{maxWidth:400, margin:"auto", padding:20}}>
      <h1>+ Post Your Ad</h1>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{width:"100%", margin:"10px 0", padding:10}} />
      <input placeholder="Price - e.g 50000" type="number" value={price} onChange={e=>setPrice(e.target.value)} style={{width:"100%", margin:"10px 0", padding:10}} />
      <select value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%", margin:"10px 0", padding:10}}>
        <option>Sargodha</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>All Pakistan</option>
      </select>
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{width:"100%", margin:"10px 0", padding:10}} />
      <input placeholder="WhatsApp Number" value={phone} onChange={e=>setPhone(e.target.value)} style={{width:"100%", margin:"10px 0", padding:10}} />

      {/* YE NAYA PHOTO WALA BOX HAI G */}
      <div style={{border:"2px dashed #ccc", padding:15, margin:"10px 0"}}>
        <label><b>Ad ki Photo G</b></label><br/>
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)} />
        {image && <p>Selected: {image.name} G</p>}
      </div>

      <button onClick={handlePost} disabled={loading} style={{width:"100%", padding:12, background:"navy", color:"white", borderRadius:20}}>
        {loading? "Posting... G" : "Post Ad Now"}
      </button>
    </div>
  );
}