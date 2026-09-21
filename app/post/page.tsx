"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseclient";

export default function PostPage(){
const [form,setForm]=useState({title:"",price:"",location:"Sargodha",category:"Books",whatsapp:"",description:""});
const [file,setFile]=useState<any>(null);
const [loading,setLoading]=useState(false);

async function handlePost(){
if(!form.title ||!form.price ||!form.whatsapp){ alert("Title, Price and WhatsApp are required!"); return; }
setLoading(true);
let image_url="";
try{
if(file){
const fileName = Date.now()+"_"+file.name;
const { error } = await supabase.storage.from("ads").upload(fileName,file);
if(error) throw error;
const { data } = supabase.storage.from("ads").getPublicUrl(fileName);
image_url = data.publicUrl;
}
const { error } = await supabase.from("ads").insert([{...form, price: Number(form.price), image_url}]);
if(error) throw error;
alert("Ad Posted Successfully!");
window.location.href="/";
}catch(e:any){ alert("Error: "+e.message); }
setLoading(false);
}

return(
<div style={{maxWidth:"500px",margin:"30px auto",padding:"25px",background:"white",borderRadius:"12px",boxShadow:"0 4px 15px rgba(0,0,0,0.1)"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"24px",marginBottom:"20px"}}>Post Your Ad</h2>
<label style={{fontWeight:"bold"}}>Upload Photo</label>
<input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0])} style={{width:"100%",margin:"8px 0 15px",padding:"10px",border:"2px dashed #000",borderRadius:"8px"}}/>
<input placeholder="Ad Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<input placeholder="Price" type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<select value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}><option>Sargodha</option><option>Lahore</option><option>Islamabad</option><option>Karachi</option><option>Faisalabad</option><option>Multan</option></select>
<select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}><option>Books</option><option>Mobiles</option><option>Bikes</option><option>Cars</option><option>Furniture</option><option>Electronics</option><option>Others</option></select>
<textarea placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc",height:"90px"}}/>
<input placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e)=>setForm({...form,whatsapp:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>
<button onClick={handlePost} disabled={loading} style={{width:"100%",background:"black",color:"white",padding:"14px",borderRadius:"30px",marginTop:"15px",fontWeight:"bold"}}>{loading? "Uploading..." : "Post Ad Now"}</button>
</div>
);
}