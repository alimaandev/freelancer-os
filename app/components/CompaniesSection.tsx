export default function CompaniesSection() {
  const companies = [
    { name: 'Figma' },
    { name: 'Stripe' },
    { name: 'Shopify' },
    { name: 'Notion' },
    { name: 'Webflow' },
  ];

  return (
    <section className="py-20 border-t border-gray-200">
      <p className="text-sm text-gray-500 uppercase tracking-widest mb-8 text-center">
        Trusted by freelancers at
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
        {companies.map((company, idx) => (
          <div key={idx} className="company-tile text-center">
            <p className="cursor-pointer text-gray-700 transition-colors hover:text-black">{company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
