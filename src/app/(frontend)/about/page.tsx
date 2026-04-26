export const metadata = {
  title: 'About Us | Antigravity Sport Horses',
  description: 'Learn more about our passion for elite sport horses and our global network.',
}

export const revalidate = 3600

import { getTeamMembers } from '@/app/actions/team'
import Image from 'next/image'
import { Reveal, StaggerContainer, StaggerItem, ParallaxImage, HoverCard } from '@/components/animations/MotionComponents'

export default async function AboutPage() {
  let team = [];
  try {
    team = await getTeamMembers() || [];
  } catch (error) {
    console.error("Error fetching team members:", error);
  }

  return (
    <div className="pt-6 pb-16 min-h-screen overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Reveal delay={0.2}>
            <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
              Legacy of <span className="font-semibold italic text-accent">Excellence</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.4} direction="left">
            <h2 className="text-2xl font-serif text-secondary dark:text-gray-300">About Equivest</h2>
          </Reveal>
          
          <StaggerContainer delayChildren={0.6} staggerChildren={0.2}>
            <div className="space-y-6 text-xl md:text-2xl text-gray-800 dark:text-gray-300 font-medium leading-relaxed text-center sm:text-left">
              <StaggerItem>
                <p>
                  Equivest is a leading player with over 25 years of experience and a proven track record in the equestrian world. We facilitate high-end investments in world-class showjumpers from the Netherlands, Germany, and Belgium, offering our investors unique opportunities for significant returns through precision selection and expert management.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  Show jumping has evolved into a highly professional global sport. Investing in genetically superior youngsters and producing them into 5-Star Grand Prix athletes offers a unique, high-yield asset class.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p>
                  Our syndicate model ensures that you co-own elite prospects alongside industry professionals. From world-class training in Europe to targeted global competition, we manage the entire lifecycle to maximize both sport success and financial return.
                </p>
              </StaggerItem>
            </div>
          </StaggerContainer>
          
          <Reveal delay={1.0} direction="up">
            <div className="h-64 sm:h-[500px] w-full relative mt-16 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
              <ParallaxImage 
                src="/wellington_showjumper.png" 
                alt="Professional showjumper in Wellington" 
                className="w-full h-full rounded-xl"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-24 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Reveal direction="down">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
                Meet The <span className="font-semibold italic text-accent">Team</span>
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </Reveal>

          {team.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-xl">
              The team is being updated. Please check back soon.
            </div>
          ) : (
            <StaggerContainer delayChildren={0.3} staggerChildren={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {team.map((member: any) => (
                <StaggerItem key={member.id}>
                  <HoverCard className="p-8 h-full bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center group cursor-pointer">
                    <div className="relative w-56 h-56 mb-8 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 group-hover:border-accent group-hover:scale-105 transition-all duration-500">
                      {member.image_url ? (
                        <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-6xl text-gray-400 font-serif">{member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-primary dark:text-white mb-2">{member.name}</h3>
                    <p className="text-lg text-accent uppercase tracking-widest font-bold mb-6">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-md">
                        {member.bio}
                      </p>
                    )}
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </div>
  )
}
