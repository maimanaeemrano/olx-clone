"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase.js";

export default function PostAd(){
const [title,setTitle]=useState("");
const [price,setPrice]=useState("");
const [loc,setLoc]=useState("Sargodha");
const [desc,setDesc]=useState("");
const [wp,setWp]=useState("");
const [img,setImg]=useState(null);
const [load,setLoad]=useState(false);

const postNow=async()=>{
if(!title||!price){alert("Title Price likho G");return;}
setLoad(true);
let url="";
if(img){
const name=Date.now()+"-"+img.name;
const {error}=await supabase.storage.from("ads").upload(name,img);
if(!error){
const {data}=supabase.storage.from("ads").getPublicUrl(name);
url=data.publicUrl;
}
}
const {error}=await supabase.from("ads").insert([{title,price,location:loc,description:desc,whatsapp:wp,image_url:url}]);
setLoad(false);
if(error)alert(error.message);
else{alert("MASHALLAH G Ad Ho Gayi G!");location.href="/";}
};

return(
<div style={{maxWidth:"400px",margin:"20px auto",padding:"15px",background:"white",borderRadius:"15px",boxShadow:"0 2px 10px #ccc"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"22px"}}>+ Post Your Ad</h2>

<div style={{border:"2px dashed black",padding:"10px",margin:"15px 0",borderRadius:"10px"}}>
<b>📸 Photo Lagao G (Zaroori)</b><br/>
<input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])}/>
{img&&<p style={{color:"green",fontWeight:"bold"}}>✅ {img.name} select ho gayi G!</p>}
</div>

<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title - e.g. iPhone 12" style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}/>

<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price - e.g. 50000" style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}/>

<select value={loc} onChange={e=>setLoc(e.target.value)} style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}>
<option>Sargodha</option>
<option>Lalian</option>
<option>Lahore</option>
<option>Faisalabad</option>
</select>

<textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description - Kitab kaisi hai, bike ka model..." style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}></textarea>

<input value={wp} onChange={e=>setWp(e.target.value)} placeholder="WhatsApp 03XX-XXXXXXX" style={{width:"100%",padding:"12px",marginBottom:"15px",borderRadius:"8px",border:"1px solid #000"}}/>

<button onClick={postNow} style={{width:"100%",background:"black",color:"white",padding:"13px",borderRadius:"30px",fontWeight:"bold",fontSize:"16px"}}>
{load?"Posting... G":"Post Ad Now"}
</button>

</div>
);
}
