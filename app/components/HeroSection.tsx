import Image from 'next/image';

interface HeroSectionProps {
  onScroll: (id: string) => void;
}

const heroImage = 'https://images.unsplash.com/photo-1771922748624-b205cf5d002d?auto=format&fit=crop&q=80&w=1800';

export default function HeroSection({ onScroll }: HeroSectionProps) {
  return (
    <section className="hero-section pt-40 pb-32">
      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div style={{ animation: 'slideDown 0.8s ease-out' }}>
          <p className="mb-4 text-sm uppercase tracking-widest text-gray-500">
            The Operating System for Freelancers
          </p>
          <h1 className="mb-8 text-5xl leading-tight text-black sm:text-6xl lg:text-7xl">
            Run your freelance business{' '}
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              like a company
            </span>
          </h1>
          <p className="mb-8 max-w-xl text-xl leading-relaxed text-gray-600">
            The all-in-one platform for client management, invoicing, proposals, and payments. Built by freelancers, for freelancers.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onScroll('cta')}
              className="depth-button rounded-full bg-black px-8 py-4 text-white shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-2xl"
            >
              Start Free Today
            </button>
            <button
              onClick={() => onScroll('features')}
              className="depth-button rounded-full border-2 border-black px-8 py-4 text-black transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            >
              Watch Demo
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            No credit card required | 14-day free trial | Cancel anytime
          </p>
        </div>

        <div className="hero-visual" style={{ animation: 'slideUp 0.8s ease-out 0.2s both' }}>
          <div className="hero-visual-card group relative h-[28rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl lg:h-[32rem]">
            <Image
              src={heroImage}
              alt="Freelancer OS dashboard preview on a laptop and phone"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="hero-floating-card hero-floating-card-primary absolute left-5 top-5 rounded-lg border border-white/20 bg-white/90 px-5 py-4 text-black shadow-xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-gray-500">Pipeline</p>
              <p className="mt-1 text-2xl leading-none">$42.8k</p>
            </div>
            <div className="hero-floating-card hero-floating-card-secondary absolute bottom-5 right-5 rounded-lg border border-white/20 bg-black/70 px-5 py-4 text-white shadow-xl backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-white/60">Active projects</p>
              <p className="mt-1 text-2xl leading-none">18</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
