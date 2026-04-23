export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900 ">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Stat Cards */}
        <div className="bg-white  overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500  truncate">Total Horses</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 ">12</dd>
          </div>
        </div>
        <div className="bg-white  overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500  truncate">New Leads</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 ">4</dd>
          </div>
        </div>
      </div>
    </div>
  )
}
