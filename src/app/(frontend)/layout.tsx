import Navbar from '@/components/frontend/Navbar'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      <Navbar />
      {children}
    </div>
  )
}
