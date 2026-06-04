'use client';

interface NavigationProps {
  onScroll: (id: string) => void;
}

export default function Navigation({ onScroll }: NavigationProps) {
  return (
    <nav className="depth-nav sticky top-0 z-50 flex items-center justify-between py-8 bg-white/80 backdrop-blur-md">
      <div className="text-2xl tracking-tight text-black">
        Freelancer OS
      </div>
      <div className="flex items-center gap-8">
        <button
          onClick={() => onScroll('features')}
          className="depth-link text-sm text-gray-600 hover:text-black transition-colors duration-300"
        >
          Platform
        </button>
        <button
          onClick={() => onScroll('trust')}
          className="depth-link text-sm text-gray-600 hover:text-black transition-colors duration-300"
        >
          Why Us
        </button>
        <button
          onClick={() => onScroll('cta')}
          className="depth-button px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-sm"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
