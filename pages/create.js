import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Create() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Need Repair')
  const [condition, setCondition] = useState('Fair')
  const [image, setImage] = useState(null)
  const router = useRouter()

  function onImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result)
    reader.readAsDataURL(file)
  }

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, type, condition, image })
    })
    if (res.ok) router.push('/')
  }

  return (
    <div className="container">
      <h1>Create Listing</h1>
      <form onSubmit={submit} className="card">
        <label>Title
          <input value={title} onChange={e=>setTitle(e.target.value)} required />
        </label>
        <label>Type
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option>Need Repair</option>
            <option>For Sale</option>
            <option>Free Pickup</option>
          </select>
        </label>
        <label>Condition
          <input value={condition} onChange={e=>setCondition(e.target.value)} />
        </label>
        <label>Photo
          <input type="file" accept="image/*" onChange={onImage} />
        </label>
        <div style={{marginTop:12}}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
