import { getPageContent } from '@/app/actions/pages'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Services | Antigravity Sport Horses',
  description: 'Explore the premium services we offer for elite sport horses.',
}

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  let pageData = await getPageContent('services')

  if (!pageData) {
    pageData = {
      title: 'Our Services',
      hero_image: '/wellington_showjumper.png',
      content_blocks: [
        { id: '1', type: 'text', content: 'We offer a comprehensive range of services tailored to meet the needs of elite sport horses and discerning riders. From expert training and coaching to high-end sales and investments, our experienced team is dedicated to achieving the highest standards of excellence in the equestrian world.', size: 'text-xl' }
      ]
    }
  }

  const { title, hero_image, content_blocks } = pageData
  const hero_image_2 = content_blocks?.find((b: any) => b.type === 'hero_image_2')?.content || null

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-primary dark:text-white">
            {title}
          </h1>
          <h2 className="text-2xl font-serif text-secondary dark:text-gray-300">Premium Equestrian Services</h2>
          <div className="space-y-6 text-xl md:text-2xl text-gray-800 dark:text-gray-300 font-medium leading-relaxed text-center sm:text-left">
            {content_blocks.map((block: any, index: number) => {
              if (block.type === 'hero_image_2') return null;
              
              let BlockComponent = null;
              if (block.type === 'text') BlockComponent = <p className={block.size || 'text-xl'}>{block.content}</p>;
              else if (block.type === 'heading') BlockComponent = <h3 className={`${block.size || 'text-2xl'} font-bold mt-8 mb-4`}>{block.content}</h3>;
              else if (block.type === 'quote') BlockComponent = <blockquote className="text-2xl italic font-serif border-l-4 border-accent pl-6 my-8">{block.content}</blockquote>;
              else if (block.type === 'bullet-list') BlockComponent = (
                <ul className="list-disc pl-6 space-y-2 mt-4 mb-8">
                  {block.content.split('\n').filter((item: string) => item.trim() !== '').map((item: string, i: number) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300">{item.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
              else if (block.type === 'cta') BlockComponent = (
                <div className="mt-8 mb-4 text-center">
                  <Link href={block.image_url || '/'} className="inline-block bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-colors">
                    {block.content}
                  </Link>
                </div>
              );
              else if (block.type === 'divider') BlockComponent = <div className="w-24 h-1 bg-accent mx-auto my-12" />;
              else if (block.type === 'image') BlockComponent = (
                <div className="w-full relative rounded-2xl overflow-hidden shadow-lg my-8">
                  <Image src={block.content} alt="Image content" width={1200} height={800} className="w-full h-auto object-cover" />
                </div>
              );

              return (
                <div key={block.id || index}>
                  {BlockComponent}
                </div>
              );
            })}
          </div>
          {/* Media Blocks */}
          <div className="grid grid-cols-1 gap-8 mt-16">
            {hero_image && (
              <div className="h-64 sm:h-[500px] w-full relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                {hero_image.toLowerCase().endsWith('.mp4') || hero_image.toLowerCase().endsWith('.webm') || hero_image.toLowerCase().endsWith('.mov') ? (
                  <video src={hero_image} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <Image src={hero_image} alt="Hero Media 1" fill className="object-cover" priority />
                )}
              </div>
            )}
            
            {hero_image_2 && (
              <div className="h-64 sm:h-[500px] w-full relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                {hero_image_2.toLowerCase().endsWith('.mp4') || hero_image_2.toLowerCase().endsWith('.webm') || hero_image_2.toLowerCase().endsWith('.mov') ? (
                  <video src={hero_image_2} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                ) : (
                  <Image src={hero_image_2} alt="Hero Media 2" fill className="object-cover" priority />
                )}
              </div>
            )}
            
            {/* Fallback if both are empty */}
            {!hero_image && !hero_image_2 && (
              <div className="h-64 sm:h-[500px] w-full relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                <Image src="/wellington_showjumper.png" alt="Services image" fill className="object-cover" priority />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
