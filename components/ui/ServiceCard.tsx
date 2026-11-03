import Image from 'next/image';
import { Film, Megaphone, GraduationCap, Users, Clapperboard, Video, ArrowUpRight } from 'lucide-react';

// Default icon mapping (used when no icon prop is provided)
const serviceIcons = {
  "Documentary Production": Film,
  "Commercial Films": Megaphone,
  "Educational Content": GraduationCap,
  "Corporate Videos": Users,
  "Event Coverage": Clapperboard,
  "Video Editing": Video,
} as const;

type ServiceTitle = keyof typeof serviceIcons;

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  cta: {
    label: string;
    href: string;
  };
  index?: number;
  isInView?: boolean;
  isCovered?: boolean;
  isDimmed?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function ServiceCard({ 
  title, 
  description, 
  image,
  cta,
  index = 0,
  isInView = true,
  isCovered = false,
  isDimmed = false,
  icon 
}: ServiceCardProps) {
  // Select icon based on title or use provided icon prop
  const IconComponent = icon || serviceIcons[title as ServiceTitle] || Film;

  return (
    <div
      className={`group relative origin-top overflow-hidden rounded-[2rem] transition-[transform,opacity] duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isCovered ? 'scale-[0.95]' : 'scale-100'}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative min-h-[28rem] overflow-hidden border border-cream/15 bg-dark md:min-h-[34rem]">
        <Image
          src={image}
          alt=""
          fill
          loading="lazy"
          sizes="(min-width: 768px) 80vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-dark/45" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(44,36,16,0.92)_0%,rgba(44,36,16,0.66)_36%,rgba(44,36,16,0.2)_72%,rgba(44,36,16,0.65)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/90 via-dark/25 to-transparent" />

        <div className="relative z-10 flex min-h-[28rem] flex-col justify-between p-8 text-cream md:min-h-[34rem] md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_minmax(18rem,0.8fr)] md:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/35 bg-dark/20 text-gold backdrop-blur-sm">
                  <IconComponent className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold tracking-[0.22em] text-cream/65">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-7 text-4xl font-semibold leading-none tracking-[-0.045em] text-cream md:text-5xl">
                {title}
              </h3>
            </div>
            <p className="max-w-md text-base leading-8 text-cream/90 md:pt-14 md:text-lg">
              {description}
            </p>
          </div>

          <a
            href={cta.href}
            className="inline-flex w-fit items-center gap-3 rounded-full border border-cream/65 px-6 py-3 text-sm font-semibold text-cream transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-dark"
          >
            {cta.label}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-20 bg-brown-dark transition-opacity duration-500 ${
            isCovered ? 'opacity-45' : isDimmed ? 'opacity-70' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
