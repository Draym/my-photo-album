import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      Hello world
      <br />
      <Link href="/gallery">Click to Gallery</Link>
      <br />
      <Link href="/flow">Click to Flow</Link>
    </main>
  )
}
