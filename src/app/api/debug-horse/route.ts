import { getHorse } from '@/app/actions/horse'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' })

  const horse = await getHorse(id)
  return NextResponse.json({ horse })
}
