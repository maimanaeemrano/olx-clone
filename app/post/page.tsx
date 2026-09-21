"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PostAd(){
const [title,setTitle]=useState("");const [price,setPrice]=useState("");const [loc,setLoc]=useState("Sargodha");const [desc,setDesc]=useState("");const [wp,setWp]=useState("");const [img,setImg]=useState<any>(null);const [loading,setLoading]=useState(false);

const handlePost=async()=>{
if(!title||!price){alert("Enter Title & Price");return;}
setLoading(true);
let url="";
try{
if(img){
const name=Date.now()+"-"+img.name;
await supabase.storage.from("ads").upload(name,img);
const {data}=supabase.storage.from("ads").getPublicUrl(name);
url=data.publicUrl;
}
await supabase.from("ads").insert([{title,price,location:loc,description:desc,whatsapp:wp,image_url:url}]);
alert("Ad Posted Successfully!");
window.location.href="/";
}catch(e:any){alert(e.message);}finally{setLoading(false);}
};

return(
<div style={{maxWidth:"420px",margin:"20px auto",padding:"16px",background:"white",borderRadius:"16px",boxShadow:"0 2px 10px #ccc"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"22px"}}>+ Post Your Ad</h2>
<div style={{border:"2px dashed black",padding:"12px",borderRadius:"10px",margin:"15px 0",background:"#fafafa"}}>
<b>Upload Ad Photo</b><br/>
<input type="file" accept="image/*" onChange={(e:any)=>setImg(e.target.files[0])} style={{marginTop:"8px"}}/>
{img && <p style={{color:"green"}}>✅ {img.name} selected</p>}
</div>
<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title - e.g. iPhone 12" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}/>
<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price - e.g. 50000" style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}/>
<select value={loc} onChange={e=>setLoc(e.target.value)} style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}><option>Sargodha</option><option>Lalian</option><option>Lahore</option><option>Faisalabad</option></select>
<textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" rows={3} style={{width:"100%",padding:"12px",marginBottom:"10px",border:"1px solid #000",borderRadius:"8px"}}></textarea>
<input value={wp} onChange={e=>setWp(e.target.value)} placeholder="WhatsApp Number - 03XX" style={{width:"100%",padding:"12px",marginBottom:"15px",border:"1px solid #000",borderRadius:"8px"}}/>
<button onClick={handlePost} style={{width:"100%",background:"black",color:"white",padding:"13px",borderRadius:"30px",fontWeight:"bold"}}>{loading?"Posting...":"Post Ad Now"}</button>
</div>
);
}