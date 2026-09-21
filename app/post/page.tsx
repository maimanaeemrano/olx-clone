"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
export default function Post(){
const [loading,setLoading]=useState(false);
const [form,setForm]=useState({title:"",price:"",location:"",whatsapp:"",description:"",category:"Books"});
const [file,setFile]=useState<any>(null);
async function submit(){
setLoading(true);
let url="";
if(file){
const name=Date.now()+"_"+file.name;
await supabase.storage.from("ads").upload(name,file);
const {data}=supabase.storage.from("ads").getPublicUrl(name);
url=data.publicUrl;
}
await supabase.from("ads").insert([{...form,price:Number(form.price),image_url:url}]);
alert("Ad Lag Gaya G!");
window.location.href="/";
setLoading(false);
}
return(
<div style={{maxWidth:"400px",margin:"20px auto",padding:"15px"}}>
<h2 style={{fontWeight:"bold"}}>Naya Ad Lagao</h2>
<input type="file" onChange={e=>setFile(e.target.files?.[0])} style={{margin:"10px 0"}}/>
<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}>
<option>Books</option><option>Uniform</option><option>Hostel Items</option><option>Others</option>
</select>
<input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<input placeholder="Price" type="number" onChange={e=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<input placeholder="Location" onChange={e=>setForm({...form,location:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<input placeholder="WhatsApp No 9230..." onChange={e=>setForm({...form,whatsapp:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<textarea placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})} style={{width:"100%",padding:"10px",margin:"5px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<button onClick={submit} style={{width:"100%",background:"black",color:"white",padding:"12px",borderRadius:"20px",marginTop:"10px"}}>{loading?"Uploading...":"Post Kar Do"}</button>
</div>
);
}