"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseclient";

export default function PostPage(){
const [form,setForm]=useState({
title:"",
price:"",
location:"Sargodha",
category:"Books",
whatsapp:"",
description:""
});
const [file,setFile]=useState<any>(null);
const [loading,setLoading]=useState(false);

async function handlePost(){
if(!form.title ||!form.price ||!form.whatsapp){
alert("Title, Price and WhatsApp are required!");
return;
}
setLoading(true);
let image_url="";
try{
if(file){
const fileName = Date.now()+"_"+file.name;
const { error: upError } = await supabase.storage.from("ads").upload(fileName,file);
if(upError) throw upError;
const { data } = supabase.storage.from("ads").getPublicUrl(fileName);
image_url = data.publicUrl;
}
const { error } = await supabase.from("ads").insert([{
title: form.title,
price: Number(form.price),
location: form.location,
category: form.category,
whatsapp: form.whatsapp,
description: form.description,
image_url: image_url
}]);
if(error) throw error;
alert("Ad Posted Successfully!");
window.location.href="/";
}catch(e:any){
alert("Error: "+e.message);
}
setLoading(false);
}

return(
<div style={{maxWidth:"450px",margin:"30px auto",padding:"20px",background:"white",borderRadius:"12px",boxShadow:"0 2px 10px rgba(0,0,0,0.1)"}}>
<h2 style={{textAlign:"center",fontWeight:"bold",fontSize:"24px",marginBottom:"20px"}}>+ Post Your Ad</h2>

<div style={{marginBottom:"15px"}}>
<label style={{fontWeight:"bold",fontSize:"14px"}}>Upload Photo</label>
<input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0])} style={{width:"100%",marginTop:"5px",padding:"10px",border:"2px dashed #000",borderRadius:"8px",background:"#f9f9f9"}}/>
</div>

<input placeholder="Ad Title - e.g. iPhone 12 for Sale" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<input placeholder="Price - e.g. 50000" type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<select value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc",background:"white"}}>
<option>Sargodha</option>
<option>Lahore</option>
<option>Islamabad</option>
<option>Karachi</option>
<option>Faisalabad</option>
<option>Multan</option>
<option>Gujranwala</option>
</select>

<select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc",background:"white"}}>
<option>Books</option>
<option>Mobiles</option>
<option>Bikes</option>
<option>Cars</option>
<option>Furniture</option>
<option>Electronics</option>
<option>Others</option>
</select>

<textarea placeholder="Description - Condition, Model, Reason for selling..." value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc",height:"90px"}}/>

<input placeholder="WhatsApp Number - 03XX-XXXXXXX" value={form.whatsapp} onChange={(e)=>setForm({...form,whatsapp:e.target.value})} style={{width:"100%",padding:"12px",margin:"8px 0",borderRadius:"8px",border:"1px solid #ccc"}}/>

<button onClick={handlePost} disabled={loading} style={{width:"100%",background:"black",color:"white",padding:"14px",borderRadius:"30px",marginTop:"15px",fontWeight:"bold",fontSize:"16px",cursor:"pointer"}}>
{loading? "Uploading..." : "Post Ad Now"}
</button>
</div>
);
}