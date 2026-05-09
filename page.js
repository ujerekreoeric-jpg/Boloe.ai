
'use client'

import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [access, setAccess] = useState(false)
  const [code, setCode] = useState('')

  const login = () => {
    if(code === '11.O6.3GPT'){
      localStorage.setItem('boloe_access', 'true')
      setAccess(true)
    } else {
      alert('Invalid Access Code')
    }
  }

  const analyze = async () => {
    if(!image) return

    setLoading(true)

    const formData = new FormData()
    formData.append('image', image)

    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    setPrompt(data.prompt)
    setLoading(false)
  }

  if(!access && typeof window !== 'undefined'){
    const saved = localStorage.getItem('boloe_access')
    if(saved === 'true'){
      setAccess(true)
    }
  }

  if(!access){
    return (
      <main style={{
        background:'#0f0f0f',
        minHeight:'100vh',
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        gap:'10px',
        fontFamily:'sans-serif'
      }}>
        <h1 style={{fontSize:'40px'}}>BOLOE AI</h1>

        <input
          placeholder="Enter Access Code"
          value={code}
          onChange={(e)=>setCode(e.target.value)}
          style={{
            padding:'14px',
            borderRadius:'10px',
            width:'300px'
          }}
        />

        <button
          onClick={login}
          style={{
            padding:'14px 20px',
            borderRadius:'10px',
            background:'#fff',
            color:'#000',
            border:'none'
          }}
        >
          Enter
        </button>
      </main>
    )
  }

  return (
    <main style={{
      background:'#0f0f0f',
      color:'white',
      minHeight:'100vh',
      padding:'30px',
      fontFamily:'sans-serif'
    }}>
      <h1 style={{fontSize:'42px'}}>BOLOE AI</h1>

      <p>Upload reference image → Generate cinematic AI prompts</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <br/><br/>

      <button
        onClick={analyze}
        style={{
          padding:'14px 20px',
          borderRadius:'12px',
          border:'none',
          background:'#fff',
          color:'#000'
        }}
      >
        {loading ? 'Analyzing...' : 'Generate Prompt'}
      </button>

      <br/><br/>

      <textarea
        value={prompt}
        readOnly
        style={{
          width:'100%',
          height:'400px',
          background:'#161616',
          color:'white',
          padding:'20px',
          borderRadius:'16px'
        }}
      />

      <br/><br/>

      <a
        href="https://labs.google/flow/about"
        target="_blank"
        style={{
          background:'white',
          color:'black',
          padding:'14px 20px',
          borderRadius:'12px',
          textDecoration:'none'
        }}
      >
        Open Google Flow
      </a>
    </main>
  )
}
