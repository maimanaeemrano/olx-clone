"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { useRouter } from "next/navigation";

export default function PostAd() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "Sargodha",
    description: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("ads").insert([
      {
        title: form.title,
        price: Number(form.price),
        location: form.location,
        description: form.description,
        phone: form.phone,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("MashaAllah G! Ad Post Ho Gaya!");
      router.push("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white mt-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-black mb-4 text-center">+ Post Your Ad</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          required
          placeholder="Title - e.g. iPhone 12 for Sale"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-3 rounded w-full"
        />

        <input
          required
          type="number"
          placeholder="Price - e.g. 50000"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-3 rounded w-full"
        />

        <select
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border p-3 rounded w-full bg-white"
        >
          <option>Sargodha</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Faisalabad</option>
          <option>Multan</option>
          <option>All Pakistan</option>
        </select>

        <textarea
          required
          placeholder="Description - Kitab kaisi hai, bike ka model..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-3 rounded w-full h-24"
        />

        <input
          required
          placeholder="WhatsApp Number - 03XX-XXXXXXX"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-3 rounded w-full"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-black text-white p-3 rounded-full font-bold hover:bg-gray-800"
        >
          {loading ? "Posting..." : "Post Ad Now"}
        </button>
      </form>
    </div>
  );
}