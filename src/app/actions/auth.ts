'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/cms-login?error=${encodeURIComponent(error.message)}`)
  }

  // Send email notification (non-blocking)
  fetch('https://formsubmit.co/ajax/tomvanbiene@gmail.com', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': 'https://www.equivestworldwide.com',
      'Referer': 'https://www.equivestworldwide.com/'
    },
    body: JSON.stringify({
      _subject: '⚠️ Beveiligingsmelding: Iemand is ingelogd op Equivest',
      _template: 'basic',
      message: `Er is zojuist succesvol ingelogd op het Equivest CMS.\n\nAccount: ${data.email}\nTijdstip: ${new Date().toLocaleString('nl-NL')}\n\nAls jij dit niet was, controleer dan direct je wachtwoorden.`
    })
  }).catch(err => console.error("Email notification failed:", err))

  // Send WhatsApp notification (non-blocking)
  const waText = encodeURIComponent(`🚨 *Equivest Login* 🚨\nEr is zojuist ingelogd op het CMS!\nEmail: ${data.email}\nTijd: ${new Date().toLocaleTimeString('nl-NL')}`);
  fetch(`https://api.callmebot.com/whatsapp.php?phone=31651641886&text=${waText}&apikey=6121648&t=${Date.now()}`, { cache: 'no-store' })
    .catch(err => console.error("WhatsApp notification failed:", err));

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function investorLogin(formData: FormData) {
  const supabase = await createClient()

  let rawUsername = formData.get('username') as string
  let email = rawUsername
  
  // Format username to email if it's not an email
  if (!email.includes('@')) {
    // Turn "Equivest 11" into "equivest11@equivest.com"
    email = rawUsername.toLowerCase().replace(/\s+/g, '') + '@equivest.com'
  }

  const data = {
    email,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/investor-login?error=${encodeURIComponent("Invalid username or password.")}`)
  }

  revalidatePath('/', 'layout')
  redirect('/horses') // Redirect to portfolio
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
