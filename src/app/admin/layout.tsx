import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white ">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
