export const metadata = {
  title: 'Return on Investment | Antigravity Sport Horses',
  description: 'Discover the financial advantages of investing in premium sport horses.',
}

export default function ROIPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
          Return on <span className="font-semibold italic text-accent">Investment</span>
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 font-light leading-relaxed mb-12">
          Investing in elite sport horses offers a unique alternative asset class. With expert scouting, professional training, and strategic placement, we maximize both athletic potential and financial return.
        </p>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-left">
          <h3 className="text-2xl font-serif font-semibold text-primary dark:text-white mb-4">Why Invest in Horses?</h3>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span><strong>Tangible Asset:</strong> A living, breathing investment that grows in value through training and competition results.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span><strong>Global Market:</strong> High demand for top-tier sport horses across Europe, North America, and Asia.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span><strong>Expert Management:</strong> We handle everything from scouting to sales, ensuring your asset is developed optimally.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
