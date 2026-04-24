import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const text = await request.text()
    const params = new URLSearchParams(text)
    
    // Twilio sends the message text in the 'Body' parameter
    const body = params.get('Body')?.trim() || ''
    const from = params.get('From') || 'Unknown'
    
    console.log(`Received Twilio message from ${from}: ${body}`)
    
    let responseText = "Commando niet herkend. Gebruik PAARD of AFSPRAAK aan het begin van je bericht."

    const supabase = await createClient()

    // COMMAND: PAARD
    // Format: PAARD Naam, Geboortejaar, Geslacht, Discipline, PrijsCategorie
    // Voorbeeld: PAARD Max, 2018, Ruin, Dressuur, €25k-50k
    if (body.toUpperCase().startsWith('PAARD ')) {
      const dataStr = body.substring(6).trim()
      const parts = dataStr.split(',').map(p => p.trim())
      
      if (parts.length >= 4) {
        const [name, birth_year_str, gender, discipline, price_category = 'Price on Request'] = parts
        const birth_year = parseInt(birth_year_str) || new Date().getFullYear()
        
        const { error } = await supabase.from('horses').insert({
          name,
          birth_year,
          gender,
          discipline,
          price_category,
          status: 'Available',
          description: 'Toegevoegd via WhatsApp/SMS'
        })

        if (error) {
          console.error('Database error:', error)
          responseText = `Fout bij toevoegen paard: ${error.message}`
        } else {
          responseText = `✅ Paard '${name}' succesvol toegevoegd aan het CMS!`
        }
      } else {
        responseText = `⚠️ Verkeerd formaat. Gebruik: PAARD Naam, Geboortejaar, Geslacht, Discipline, PrijsCategorie\nVoorbeeld: PAARD Max, 2018, Ruin, Dressuur`
      }
    }
    
    // COMMAND: AFSPRAAK
    // Format: AFSPRAAK KlantNaam, Datum (YYYY-MM-DD), Tijd (HH:MM), Notities
    // Voorbeeld: AFSPRAAK Jan de Vries, 2024-05-10, 14:00, Komen kijken naar Max
    else if (body.toUpperCase().startsWith('AFSPRAAK ')) {
      const dataStr = body.substring(9).trim()
      const parts = dataStr.split(',').map(p => p.trim())
      
      if (parts.length >= 3) {
        const [client_name, appointment_date, appointment_time, ...notesParts] = parts
        const notes = notesParts.join(', ') || 'Via WhatsApp/SMS'
        
        const { error } = await supabase.from('appointments').insert({
          client_name,
          client_email: 'unknown@example.com', // Required in DB but we don't have it via SMS
          appointment_date,
          appointment_time,
          notes,
          status: 'confirmed'
        })

        if (error) {
          console.error('Database error:', error)
          responseText = `Fout bij inplannen afspraak: ${error.message}`
        } else {
          responseText = `✅ Afspraak voor '${client_name}' op ${appointment_date} om ${appointment_time} succesvol ingepland!`
        }
      } else {
        responseText = `⚠️ Verkeerd formaat. Gebruik: AFSPRAAK KlantNaam, Datum (YYYY-MM-DD), Tijd (HH:MM), Notities\nVoorbeeld: AFSPRAAK Jan, 2024-05-10, 14:00, Bezichtiging Max`
      }
    }

    // Twilio expects a TwiML response (XML format)
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${responseText}</Message>
</Response>`

    return new NextResponse(twiml, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })
    
  } catch (error) {
    console.error('Twilio Webhook Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
