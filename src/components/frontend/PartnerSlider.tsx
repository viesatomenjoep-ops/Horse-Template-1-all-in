import Link from "next/link";

const partners = [
  { name: "#leki.equestrian", url: "https://www.instagram.com/leki.equestrian?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#chesterfield_ltd", url: "https://www.instagram.com/chesterfield_ltd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#louislegrelle", url: "https://www.instagram.com/louislegrelle?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#kardel_global_equine", url: "https://www.instagram.com/kardel_global_equine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#nomoregrayarea36", url: "https://www.instagram.com/nomoregrayarea36?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#elsaj0hanssonn", url: "https://www.instagram.com/elsaj0hanssonn?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#jrice.sporthorses", url: "https://www.instagram.com/jrice.sporthorses?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#apgstables", url: "https://www.instagram.com/apgstables?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { name: "#noe_benlamine", url: "https://www.instagram.com/noe_benlamine?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
];

export default function PartnerSlider() {
  return (
    <div className="w-full bg-white py-6 overflow-hidden relative z-20 border-b border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex items-center w-full">
        {/* We use two identical ticker elements for the infinite loop effect */}
        <div className="flex animate-marquee whitespace-nowrap items-center min-w-max">
          <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mr-8 ml-8">Supported By:</span>
          {partners.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent font-serif text-lg md:text-xl font-bold mx-8 transition-colors duration-300"
            >
              {partner.name}
            </Link>
          ))}
        </div>
        
        <div className="flex animate-marquee whitespace-nowrap items-center min-w-max" aria-hidden="true">
           {/* Duplicate for seamless infinite scroll */}
          <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mr-8 ml-8">Supported By:</span>
          {partners.map((partner, index) => (
            <Link
              key={`dup-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className="text-primary hover:text-accent font-serif text-lg md:text-xl font-bold mx-8 transition-colors duration-300"
            >
              {partner.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
