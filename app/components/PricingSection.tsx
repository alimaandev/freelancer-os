interface PricingSectionProps {
  id?: string;
}

export default function PricingSection({ id }: PricingSectionProps) {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: 'Forever',
      features: ['Up to 5 clients', 'Basic invoicing', 'Email support'],
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      features: ['Unlimited clients', 'Advanced reporting', 'Priority support', 'Team collaboration'],
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      features: ['Everything in Professional', 'Advanced API', 'Dedicated support', 'Custom integrations'],
    },
  ];

  return (
    <section id={id} className="py-32 border-t border-gray-200">
      <div className="text-center">
        <p className="text-sm  text-gray-500 uppercase tracking-widest mb-4">
          Transparent Pricing
        </p>
        <h2 className="text-5xl  mb-6 text-black">
          Plans That Scale With You
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
          Start free. Upgrade anytime. No surprise fees, ever.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`pricing-card rounded-lg p-8 border-2 ${
                plan.highlight
                  ? 'border-black bg-black text-white shadow-2xl'
                  : 'border-gray-200 bg-white hover:border-gray-400'
              }`}
            >
              <h3 className="text-2xl  mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl ">{plan.price}</span>
                <span className={`text-sm ${plan.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                  {' '}{plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className={`flex items-center gap-2 ${plan.highlight ? 'text-gray-100' : 'text-gray-700'}`}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`depth-button w-full py-3 rounded-full transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
