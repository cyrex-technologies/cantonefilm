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
  index?: number;
  isInView?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function ServiceCard({ 
  title, 
  description, 
  index = 0,
  isInView = true,
  icon 
}: ServiceCardProps) {
  // Select icon based on title or use provided icon prop
  const IconComponent = icon || serviceIcons[title as ServiceTitle] || Film;

  return (
    <div
      className={`group relative overflow-hidden transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Main card container with soft rounded corners */}
      <div className="relative h-full bg-cream/80 border-2 border-gold/70 rounded-2xl p-8 md:p-10 transition-all duration-500 group-hover:border-gold group-hover:shadow-2xl group-hover:shadow-gold/10 group-hover:-translate-y-2">
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating decorative element */}
        <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
        
        {/* Content wrapper */}
        <div className="relative z-10 h-full flex flex-col">
          
          {/* Icon and number container */}
          <div className="flex items-start justify-between mb-6">
            {/* Floating icon bubble */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <IconComponent className="w-7 h-7 text-gold transition-all duration-300 group-hover:scale-110 group-hover:text-navy" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Number badge - subtle and modern */}
            <div className="flex items-center gap-2">
              <div className="text-brown/30 font-bold text-sm group-hover:text-gold/50 transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>
              {/* Arrow indicator */}
              <div className="w-8 h-8 rounded-full bg-brown/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-gold/20">
                <ArrowUpRight className="w-4 h-4 text-gold" />
              </div>
            </div>
          </div>

          {/* Title with gradient on hover */}
          <h3 className="font-bold text-2xl mb-4 text-dark leading-tight transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-navy/80 leading-relaxed mb-6 flex-grow">
            {description}
          </p>

          {/* Animated underline link */}
          
        </div>

        {/* Subtle bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
      </div>

      {/* Soft shadow layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl translate-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
    </div>
  );
}
