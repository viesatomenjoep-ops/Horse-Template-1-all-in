'use server'

import { cookies } from 'next/headers'

export async function loginPortfolio(username: string, pass: string) {
  const cleanUsername = username.toLowerCase().replace(/\s+/g, '')
  if (cleanUsername === 'equivest11' && pass === '1111') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cookieStore = await cookies()
    cookieStore.set('portfolio_access', 'granted', { maxAge: 60 * 60 * 24 * 7 })
    return { success: true }
  }
  return { success: false, error: 'Ongeldige inloggegevens' }
}
