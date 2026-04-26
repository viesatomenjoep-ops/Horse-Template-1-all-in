export const metadata = {
  title: 'About Us | Antigravity Sport Horses',
  description: 'Learn more about our passion for elite sport horses and our global network.',
}

export const revalidate = 3600

import { getTeamMembers } from '@/app/actions/team'
import Image from 'next/image'

export default async function AboutPage() {
  let team = [];
  try {
    team = await getTeamMembers() || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
            Legacy of <span className="font-semibold italic text-accent">Excellence</span>
          </h1>
          <h2 className="text-2xl font-serif text-secondary dark:text-gray-300">About Equivest</h2>
          <div className="space-y-6 text-lg text-secondary dark:text-gray-400 font-light leading-relaxed text-left">
            <p>
              Equivest is a leading player with over 25 years of experience and a proven track record in the equestrian world. We facilitate high-end investments in world-class showjumpers from the Netherlands, Germany, and Belgium, offering our investors unique opportunities for significant returns through precision selection and expert management.
            </p>
            <p>
              Showjumping has evolved into a highly professional global sport. Investing in genetically superior youngsters and producing them into 5-Star Grand Prix athletes offers a unique, high-yield asset class.
            </p>
            <p>
              Our syndicate model ensures that you co-own elite prospects alongside industry professionals. From world-class training in Europe to targeted global competition, we manage the entire lifecycle to maximize both sport success and financial return.
            </p>
          </div>
          <div className="h-64 sm:h-96 w-full relative mt-12 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
            <Image 
              src="/wellington_showjumper.png" 
              alt="Professional showjumper in Wellington" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-primary dark:text-white">
              Meet The <span className="font-semibold italic text-accent">Team</span>
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          {team.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              The team is being updated. Please check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {team.map((member: any) => (
                <div key={member.id} className="group flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 group-hover:border-accent transition-colors duration-300">
                    {member.image_url ? (
                      <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-4xl text-gray-400 font-serif">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary dark:text-white mb-1">{member.name}</h3>
                  <p className="text-sm text-accent uppercase tracking-wider font-medium mb-4">{member.role}</p>
                  {member.bio && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
