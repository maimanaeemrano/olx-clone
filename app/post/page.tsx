"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase.js";
export default function PostAd(){
const [t,setT]=useState("");const [p,setP]=useState("");const [l,setL]=useState("Sargodha");const [d,setD]=useState("");const [w,setW]=useState("");const [im,setIm]=useState(null);const [lo,setLo]=useState(false);
const post=async()=>{if(!t||!p){alert("Enter Title Price");return;}setLo(true);let url="";if(im){const n=Date.now()+"-"+im.name;await supabase.storage.from("ads").upload(n,im);const {data}=supabase.storage.from("ads").getPublicUrl(n);url=data.publicUrl;}await supabase.from("ads").insert([{title:t,price:p,location:l,description:d,whatsapp:w,image_url:url}]);setLo(false);alert("Done!");location.href="/";};
return(<div style={{maxWidth:"400px",margin:"20px auto",padding:"15px",background:"#fff",borderRadius:"15px",boxShadow:"0 2px 10px #ccc"}}>
<h2 style={{textAlign:"center",fontWeight:"bold"}}>+ Post Your Ad</h2>
<div style={{border:"2px dashed #000",padding:"12px",borderRadius:"10px",margin:"15px 0",background:"#f9f9f9"}}><b>Upload Photo</b><br/><input type="file" accept="image/*" onChange={e=>setIm(e.target.files[0])}/>{im&&<p style={{color:"green"}}>✅ {im.name}</p>}</div>
<input value={t} onChange={e=>setT(e.target.value)} placeholder="Title" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}/>
<input value={p} onChange={e=>setP(e.target.value)} placeholder="Price" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}/>
<select value={l} onChange={e=>setL(e.target.value)} style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}><option>Sargodha</option><option>Lahore</option><option>Faisalabad</option></select>
<textarea value={d} onChange={e=>setD(e.target.value)} placeholder="Description" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}></textarea>
<input value={w} onChange={e=>setW(e.target.value)} placeholder="WhatsApp Number" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}/>
<button onClick={post} style={{width:"100%",background:"black",color:"white",padding:"12px",borderRadius:"30px"}}>{lo?"Posting...":"Post Ad Now"}</button>
</div>);}
