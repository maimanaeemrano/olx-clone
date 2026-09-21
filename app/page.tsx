"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function PostPage(){
const [form,setForm]=useState({title:"",price:"",location:"Sargodha",category:"Books",whatsapp:"",description:""});
const [file,setFile]=useState<any>(null);
const [loading,setLoading]=useState(false);

async function handlePost(){
if(!form.title||!form.price) return alert("Title Price likho G!");
setLoading(true);
let image_url="";
try{
if(file){
const name=Date.now()+"_"+file.name;
await supabase.storage.from("ads").upload(name,file);
const {data}=supabase.storage.from("ads").getPublicUrl(name);
image_url=data.publicUrl;
}
await supabase.from("ads").insert([{...form,price:Number(form.price),image_url}]);
alert("Ad Lag Gaya G!");
window.location.href="/";
}catch(e:any){alert(e.message)}
setLoading(false);
}

return(
<div style={{maxWidth:"400px",margin:"20px auto",padding:"15px"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"22px"}}>+ Post Your Ad G</h2>

<label style={{fontWeight:"bold"}}>Photo Upload G (Zaroori G)</label>
<input type="file" onChange={e=>setFile(e.target.files?.[0])} style={{width:"100%",margin:"10px 0",padding:"10px",border:"1px dashed black",borderRadius:"8px"}}/>

<input placeholder="Title - e.g. iPhone 12" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<input placeholder="Price - 50000" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<select value={form.location} onChange={e=>setForm({...form,location:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px"}}>
<option>Sargodha</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Faisalabad</option>
</select>

<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid blue"}}>
<option>Books</option><option>Mobiles</option><option>Bikes</option><option>Cars</option><option>Furniture</option><option>Others</option>
</select>

<textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<input placeholder="WhatsApp - 03XX..." value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<button onClick={handlePost} style={{width:"100%",background:"black",color:"white",padding:"12px",borderRadius:"30px",marginTop:"10px"}}>{loading?"Uploading...":"Post Ad Now G"}</button>
</div>
);
}