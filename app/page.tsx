"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseclient";

export default function PostPage(){
const [form,setForm]=useState({title:"",price:"",location:"Sargodha",category:"Books",whatsapp:"",description:""});
const [file,setFile]=useState<any>(null);
const [loading,setLoading]=useState(false);

async function handlePost(){
if(!form.title ||!form.price) return alert("Title Price likho G!");
setLoading(true);
let image_url="";
try{
if(file){
const fileName=Date.now()+"_"+file.name;
const {error:upErr}=await supabase.storage.from("ads").upload(fileName,file);
if(upErr) throw upErr;
const {data}=supabase.storage.from("ads").getPublicUrl(fileName);
image_url=data.publicUrl;
}
const {error}=await supabase.from("ads").insert([{...form,price:Number(form.price),image_url}]);
if(error) throw error;
alert("Ad Lag Gaya G! Mubarak G!");
window.location.href="/";
}catch(e:any){
alert("Error: "+e.message);
}
setLoading(false);
}

return(
<div style={{maxWidth:"400px",margin:"20px auto",padding:"15px"}}>
<h2 style={{fontWeight:"bold",fontSize:"22px",textAlign:"center"}}>+ Post Your Ad G</h2>

<input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} style={{width:"100%",margin:"15px 0"}}/>

<input placeholder="Title - e.g. iPhone 12 for Sale" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<input placeholder="Price - e.g. 50000" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<select value={form.location} onChange={e=>setForm({...form,location:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}>
<option>Sargodha</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Faisalabad</option><option>Multan</option>
</select>

<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}>
<option>Books</option><option>Mobiles</option><option>Bikes</option><option>Cars</option><option>Furniture</option><option>Others</option>
</select>

<textarea placeholder="Description - Kitab kaisi hai, bike ka model..." value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc",height:"80px"}}/>

<input placeholder="WhatsApp Number - 03XX..." value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<button onClick={handlePost} style={{width:"100%",background:"black",color:"white",padding:"13px",borderRadius:"30px",marginTop:"15px",fontWeight:"bold"}}>{loading?"Uploading G...":"Post Ad Now G"}</button>
</div>
);
}