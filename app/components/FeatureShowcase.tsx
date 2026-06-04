import Image from 'next/image';

type FeatureVisual = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  detail: string;
  stat: string;
  statLabel: string;
  tone?: 'blue' | 'green' | 'amber' | 'rose';
};

interface FeatureShowcaseProps {
  title: string;
  description: string;
  features: string[];
  visual: FeatureVisual;
  animation?: string;
  imageLeft?: boolean;
}

const toneClasses = {
  blue: 'border-sky-200 bg-sky-50 text-sky-950',
  green: 'border-emerald-200 bg-emerald-50 text-emerald-950',
  amber: 'border-amber-200 bg-amber-50 text-amber-950',
  rose: 'border-rose-200 bg-rose-50 text-rose-950',
};

function FeatureVisualPanel({
  visual,
  imageLeft,
}: {
  visual: FeatureVisual;
  imageLeft: boolean;
}) {
  return (
    <div
      className={`feature-visual ${imageLeft ? 'feature-visual-left' : 'feature-visual-right'}`}
      style={{ animation: `${imageLeft ? 'slideInLeft' : 'slideInRight'} 0.8s ease-out both` }}
    >
      <div className="feature-visual-card group relative h-[26rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="feature-visual-copy absolute bottom-5 left-5 right-5 text-white">
          <p className="mb-2 text-xs uppercase tracking-widest text-white/70">{visual.eyebrow}</p>
          <h3 className="text-2xl leading-tight">{visual.title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">{visual.detail}</p>
        </div>
        <div className={`feature-visual-stat absolute right-5 top-5 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-md ${toneClasses[visual.tone || 'blue']}`}>
          <p className="text-2xl leading-none">{visual.stat}</p>
          <p className="mt-1 text-xs uppercase tracking-widest opacity-70">{visual.statLabel}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeatureShowcase({
  title,
  description,
  features,
  visual,
  animation = 'slideInRight',
  imageLeft = false,
}: FeatureShowcaseProps) {
  return (
    <section className="py-32 border-t border-gray-200">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {imageLeft && <FeatureVisualPanel visual={visual} imageLeft={imageLeft} />}
        <div style={{ animation: `${animation} 0.8s ease-out` }}>
          <h2 className="mb-6 text-5xl leading-tight text-black" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="mb-8 text-xl leading-relaxed text-gray-600">
            {description}
          </p>
          <ul className="mb-8 space-y-4">
            {features.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 text-black">-&gt;</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <button className="depth-button rounded-full border-2 border-black px-8 py-4 text-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-xl">
            Learn More
          </button>
        </div>
        {!imageLeft && <FeatureVisualPanel visual={visual} imageLeft={imageLeft} />}
      </div>
    </section>
  );
}
