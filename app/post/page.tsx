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
if(!title||!price){alert("Please enter Title and Price");return;}
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
else{alert("Ad Posted Successfully!");location.href="/";}
};

return(
<div style={{maxWidth:"420px",margin:"20px auto",padding:"16px",background:"white",borderRadius:"16px",boxShadow:"0 2px 12px #ccc"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"23px",marginBottom:"15px"}}>+ Post Your Ad</h2>

<div style={{border:"2px dashed #000",padding:"12px",marginBottom:"15px",borderRadius:"10px",background:"#f9f9f9"}}>
<b>📸 Upload Ad Photo</b><br/>
<input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])} style={{marginTop:"8px"}}/>
{img&&<p style={{color:"green",fontWeight:"bold",marginTop:"5px"}}>✅ {img.name} selected</p>}
</div>

<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title - e.g. iPhone 12 for Sale" style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}/>

<input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price - e.g. 50000" style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}/>

<select value={loc} onChange={e=>setLoc(e.target.value)} style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}}>
<option>Sargodha</option>
<option>Lalian</option>
<option>Lahore</option>
<option>Faisalabad</option>
<option>Islamabad</option>
</select>

<textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description - e.g. condition, model, features..." style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #000"}} rows={3}></textarea>

<input value={wp} onChange={e=>setWp(e.target.value)} placeholder="WhatsApp Number - 03XX-XXXXXXX" style={{width:"100%",padding:"12px",marginBottom:"15px",borderRadius:"8px",border:"1px solid #000"}}/>

<button onClick={postNow} style={{width:"100%",background:"black",color:"white",padding:"13px",borderRadius:"30px",fontWeight:"bold",fontSize:"16px",cursor:"pointer"}}>
{load?"Posting...":"Post Ad Now"}
</button>

</div>
);
}
