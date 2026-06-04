interface CTASectionProps {
  id?: string;
  email: string;
  setEmail: (email: string) => void;
  submitted: boolean;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

export default function CTASection({
  id = 'cta',
  email,
  setEmail,
  submitted,
  handleEmailSubmit
}: CTASectionProps) {
  return (
    <section id={id} className="py-32 border-t border-gray-200">
      <div className="cta-depth-card bg-black rounded-lg p-16 sm:p-20 text-center shadow-2xl group">
        <p className="text-sm  text-gray-400 uppercase tracking-widest mb-4">
          Ready to scale your business?
        </p>
        <h2 className="text-5xl mb-8 text-white group-hover:text-gray-100 transition-colors">
          Start Your Free Trial Today
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
          Get instant access to the full platform. No credit card required. Try everything for 14 days.
        </p>
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="depth-input flex-1 px-6 py-4 rounded-full bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-2 focus:ring-gray-800 transition-all text-lg"
            required
          />
          <button
            type="submit"
            className="depth-button px-10 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all whitespace-nowrap shadow-lg hover:shadow-xl text-lg"
          >
            {submitted ? 'Saved!' : 'Get Started'}
          </button>
        </form>
        {submitted && (
          <p className="text-gray-400 text-sm">✓ Check your email for next steps</p>
        )}
      </div>
    </section>
  );
}
