interface TrustSectionProps {
  id?: string;
}

export default function TrustSection({ id = 'trust' }: TrustSectionProps) {
  const trustFeatures = [
    {
      title: 'End-to-End Encryption',
      desc: 'All data encrypted in transit and at rest using military-grade standards.',
    },
    {
      title: 'SOC 2 Compliant',
      desc: 'Independently audited and verified for security and compliance.',
    },
    {
      title: '2FA & SSO',
      desc: 'Two-factor authentication and single sign-on for team accounts.',
    },
  ];

  return (
    <section id={id} className="py-32 border-t border-gray-200">
      <div className="text-center mb-20">
        <p className="text-sm  text-gray-500 uppercase tracking-widest mb-4">
          Enterprise Grade Security
        </p>
        <h2 className="text-5xl  mb-6 text-black">
          Built for Trust
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your business data is sacred. We protect it with enterprise-grade security and compliance standards.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {trustFeatures.map((trust, idx) => (
          <div key={idx} className="depth-card text-center p-8 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300">
            <h3 className="text-lg  mb-3 text-black">{trust.title}</h3>
            <p className="text-gray-600 leading-relaxed">{trust.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
