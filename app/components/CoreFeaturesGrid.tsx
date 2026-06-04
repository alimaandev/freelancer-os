interface CoreFeaturesGridProps {
  id?: string;
}

export default function CoreFeaturesGrid({ id = 'features' }: CoreFeaturesGridProps) {
  const features = [
    {
      title: 'Dashboard Analytics',
      desc: 'Real-time insights into your revenue, outstanding invoices, and client metrics.',
    },
    {
      title: 'Time Tracking',
      desc: 'Log hours per project and client. Automatically calculate billable time.',
    },
    {
      title: 'Email Integration',
      desc: 'Sync emails directly into client profiles. Never miss a message.',
    },
    {
      title: 'Bank Sync',
      desc: 'Connect your bank account to automatically match payments.',
    },
    {
      title: 'Tax Reports',
      desc: 'Generate tax reports automatically. Simplify year-end accounting.',
    },
    {
      title: 'Team Collaboration',
      desc: 'Invite team members with role-based permissions.',
    },
  ];

  return (
    <section id={id} className="py-32 border-t border-gray-200">
      <div className="text-center mb-20">
        <p className="text-sm  text-gray-500 uppercase tracking-widest mb-4">
          Everything You Need
        </p>
        <h2 className="text-5xl  mb-6 text-black">
          Built for Modern Freelancers
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A complete toolkit to manage your business professionally, from client onboarding to payment reconciliation.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="core-feature-card rounded-lg border border-gray-200 bg-white p-8 hover:border-gray-400 hover:shadow-xl"
            style={{animation: `fadeInUp 0.8s ease-out ${idx * 0.1}s both`}}
          >
            <h3 className="text-xl  mb-3 text-black">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
