import { cookies } from 'next/headers'
import PortfolioLogin from '@/components/frontend/PortfolioLogin'

export default async function HorsesLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const access = cookieStore.get('portfolio_access')

  if (access?.value !== 'granted') {
    return <PortfolioLogin />
  }

  return <>{children}</>
}
