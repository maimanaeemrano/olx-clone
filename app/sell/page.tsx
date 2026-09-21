"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase" // apka supabase file ka path G

export default function SellPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("Sargodha")
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const handlePost = async () => {
    if(!title ||!price || files.length === 0){
      alert("Title, Price aur Photo lazmi hai G!")
      return
    }
    setLoading(true)

    // 1. Saari Photos Upload Karo G
    let imageUrls = []
    for(let file of files){
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from('ad-images').upload(fileName, file)
      if(error) { alert(error.message); setLoading(false); return }

      const { data: urlData } = supabase.storage.from('ad-images').getPublicUrl(fileName)
      imageUrls.push(urlData.publicUrl)
    }

    // 2. Database me Ad Save Karo G
    const { error } = await supabase.from('ads').insert([{
      title: title,
      price: price,
      city: city,
      image_url: imageUrls[0], // pehli photo main hogi G
      images: imageUrls // saari photos G
    }])

    setLoading(false)
    if(error) alert(error.message)
    else alert("MASHALLAH G! Ad lag gaya G! Vercel pe check karo G!")
  }

  return (
    <div style={{padding: "20px", maxWidth: "500px"}}>
      <h2>SSB BAZAAR - Ad Lagao G</h2>

      <input placeholder="Title jaise: book" value={title} onChange={e=>setTitle(e.target.value)} style={{width:"100%", margin:"10px 0", padding:"10px"}} />

      <input placeholder="Price jaise: 600" type="number" value={price} onChange={e=>setPrice(e.target.value)} style={{width:"100%", margin:"10px 0", padding:"10px"}} />

      <select value={city} onChange={e=>setCity(e.target.value)} style={{width:"100%", margin:"10px 0", padding:"10px"}}>
        <option>Sargodha</option>
        <option>Lalian</option>
        <option>Lahore</option>
        <option>All Pakistan</option>
      </select>

      <p>Photo Select Karo G (4 tak) G:</p>
      <input type="file" multiple accept="image/*" onChange={e=>setFiles(Array.from(e.target.files))} />

      <button onClick={handlePost} disabled={loading} style={{width:"100%", padding:"12px", background:"black", color:"white", marginTop:"20px"}}>
        {loading? "Upload ho raha hai G..." : "Ad Post Karo G"}
      </button>
    </div>
  )
}