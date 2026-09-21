"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
      if (data) setAds(data);
    };
    fetchAds();
  }, []);

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{fontSize:24, fontWeight:'bold'}}>SSB Bazaar G</h1>
        <Link href="/sell" style={{background:'#8B4513', color:'white', padding:'8px 16px', borderRadius:20}}>+ SELL</Link>
      </div>

      <h2 style={{marginTop:20}}>Fresh Ads ({ads.length}) - All Pakistan</h2>
      
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:15, marginTop:15}}>
        {ads.map((ad) => (
          <div key={ad.id} style={{border:'1px solid #ddd', borderRadius:10, overflow:'hidden'}}>
            {ad.image_url ? (
              <img src={ad.image_url} alt={ad.title} style={{width:'100%', height:150, objectFit:'cover'}} />
            ) : (
              <div style={{width:'100%', height:150, background:'#eee', display:'flex', alignItems:'center', justifyContent:'center'}}>No Photo G</div>
            )}
            <div style={{padding:10}}>
              <p style={{fontWeight:'bold'}}>Rs {ad.price}</p>
              <p>{ad.title}</p>
              <p style={{fontSize:12, color:'gray'}}>{ad.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}