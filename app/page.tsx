"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function Home(){
const [ads,setAds]=useState<any[]>([]);
useEffect(()=>{ (async()=>{
const {data}=await supabase.from("ads").select("*").order("created_at",{ascending:false});
if(data) setAds(data);
})();},[]);
return(
<div style={{padding:"15px",maxWidth:"1000px",margin:"auto"}}>
<h1 style={{fontWeight:"bold",fontSize:"24px",marginBottom:"15px"}}>SSB Bazaar - Student OLX</h1>
<a href="/post" style={{background:"black",color:"white",padding:"10px 20px",borderRadius:"20px",textDecoration:"none"}}>+ Sell Karo</a>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"20px"}}>
{ads.map((ad)=>(
<div key={ad.id} onClick={()=>window.location.href=`/ad/${ad.id}`} style={{border:"1px solid #ddd",borderRadius:"12px",overflow:"hidden",cursor:"pointer"}}>
<img src={ad.image_url} style={{width:"100%",height:"150px",objectFit:"cover"}}/>
<div style={{padding:"8px"}}>
<p style={{fontWeight:"bold",fontSize:"14px"}}>{ad.title}</p>
<p style={{color:"green",fontWeight:"bold"}}>Rs {ad.price}</p>
<p style={{fontSize:"11px",color:"#777"}}>{ad.location}</p>
</div>
</div>
))}
</div>
</div>
);
}