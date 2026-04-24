import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const text = await request.text()
    const params = new URLSearchParams(text)
    
    // Twilio payload
    const body = params.get('Body')?.trim() || ''
    const from = params.get('From') || 'Unknown'
    
    console.log(`[TWILIO WEBHOOK] Ontvangen van ${from}: ${body}`)
    
    const supabase = await createClient()
    let responseText = "Onbekend commando. Typ 'HELP' voor een overzicht van alle commando's."

    const command = body.toUpperCase()

    // ---------------------------------------------------------------------------
    // COMMAND: HELP
    // ---------------------------------------------------------------------------
    if (command === 'HELP' || command === 'INFO') {
      responseText = `📱 *Equivest CMS Commando's*\n\n` +
        `🐴 *PAARD [Naam], [Jaar], [Geslacht], [Discipline], [Prijs]*\n(Vb: PAARD Max, 2018, Ruin, Dressuur, 25k)\n\n` +
        `❌ *VERWIJDER PAARD [Naam]*\n(Vb: VERWIJDER PAARD Max)\n\n` +
        `📅 *AFSPRAAK [Klant], [Datum], [Tijd], [Notitie]*\n(Vb: AFSPRAAK Jan, 2024-06-10, 14:00, Bezichtiging)\n\n` +
        `📢 *MEDEDELING [Tekst]*\n(Zet direct een mededeling op het Staff Prikbord!)`
    }
    
    // ---------------------------------------------------------------------------
    // COMMAND: PAARD (Toevoegen)
    // ---------------------------------------------------------------------------
    else if (command.startsWith('PAARD ')) {
      const dataStr = body.substring(6).trim()
      const parts = dataStr.split(/[,|]/).map(p => p.trim())
      
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
          description: 'Snel toegevoegd via Twilio (WhatsApp/SMS). Bewerk in CMS voor details.'
        })

        if (error) {
          responseText = `❌ Fout bij toevoegen paard: ${error.message}`
        } else {
          responseText = `✅ Paard '${name}' succesvol toegevoegd aan het CMS Portfolio!`
        }
      } else {
        responseText = `⚠️ Verkeerd formaat.\nGebruik: PAARD Naam, Jaar, Geslacht, Discipline, Prijs\nVoorbeeld: PAARD Max, 2018, Ruin, Dressuur`
      }
    }

    // ---------------------------------------------------------------------------
    // COMMAND: VERWIJDER PAARD
    // ---------------------------------------------------------------------------
    else if (command.startsWith('VERWIJDER PAARD ')) {
      const name = body.substring(16).trim()
      
      // Zoek paard op naam (case-insensitive)
      const { data, error: searchError } = await supabase
        .from('horses')
        .select('id, name')
        .ilike('name', name)
        .limit(1)
        .single()

      if (data) {
        const { error: deleteError } = await supabase.from('horses').delete().eq('id', data.id)
        if (deleteError) {
          responseText = `❌ Fout bij verwijderen: ${deleteError.message}`
        } else {
          responseText = `✅ Paard '${data.name}' is definitief verwijderd uit het CMS.`
        }
      } else {
        responseText = `⚠️ Kon geen paard vinden met de naam '${name}'.`
      }
    }

    // ---------------------------------------------------------------------------
    // COMMAND: AFSPRAAK (Inplannen rooster/agenda)
    // ---------------------------------------------------------------------------
    else if (command.startsWith('AFSPRAAK ')) {
      const dataStr = body.substring(9).trim()
      const parts = dataStr.split(/[,|]/).map(p => p.trim())
      
      if (parts.length >= 3) {
        const [client_name, appointment_date, appointment_time, ...notesParts] = parts
        const notes = notesParts.join(', ') || 'Ingepland via Twilio'
        
        const { error } = await supabase.from('appointments').insert({
          client_name,
          client_email: 'twilio@equivest.nl',
          appointment_date,
          appointment_time,
          notes,
          status: 'confirmed'
        })

        if (error) {
          responseText = `❌ Fout bij inplannen: ${error.message}`
        } else {
          responseText = `✅ Agenda: Afspraak met '${client_name}' op ${appointment_date} om ${appointment_time} is succesvol ingepland in het CMS!`
        }
      } else {
        responseText = `⚠️ Verkeerd formaat.\nGebruik: AFSPRAAK KlantNaam, Datum (YYYY-MM-DD), Tijd (HH:MM), Notitie\nVoorbeeld: AFSPRAAK Jan, 2024-05-10, 14:00, Bezichtiging`
      }
    }

    // ---------------------------------------------------------------------------
    // COMMAND: MEDEDELING (Voor op het Staff Prikbord)
    // ---------------------------------------------------------------------------
    else if (command.startsWith('MEDEDELING ')) {
      const message = body.substring(11).trim()
      
      const { error } = await supabase.from('staff_announcements').insert({
        title: 'Nieuwe update via SMS/WhatsApp',
        message: message,
        type: 'info',
        author: 'Directie (via Twilio)'
      })

      if (error) {
        responseText = `❌ Fout bij plaatsen mededeling: ${error.message}`
      } else {
        responseText = `✅ Mededeling is direct op het Staff Prikbord geplaatst!`
      }
    }

    // Return the response to Twilio as XML
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
