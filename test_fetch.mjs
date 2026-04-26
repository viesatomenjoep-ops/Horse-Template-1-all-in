import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
)
// fetch 1 horse ID
async function test() {
  const res = await fetch('https://equivest-platform.vercel.app/horses')
  const html = await res.text()
  const match = html.match(/\/horses\/([a-f0-9\-]{36})/)
  if (match) {
    const id = match[1]
    console.log("Found ID:", id)
    const detail = await fetch(`https://equivest-platform.vercel.app/horses/${id}`)
    console.log("Detail Status:", detail.status)
    const detailHtml = await detail.text()
    if (detail.status === 500) {
       console.log("500 ERROR CAUSE:")
       console.log(detailHtml.substring(0, 1000))
    }
  } else {
    console.log("No ID found")
  }
}
test()
