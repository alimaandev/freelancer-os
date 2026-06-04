export default function Footer() {
  return (
    <>
      <footer className="py-20 border-t border-gray-200 grid md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl  text-black mb-6">Freelancer OS</h3>
          <p className="text-gray-600 text-sm">The operating system for modern freelancers.</p>
        </div>
        <div>
          <p className="text-sm  text-black mb-4">Product</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Features</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Pricing</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Security</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm  text-black mb-4">Company</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">About</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Blog</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-black mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Privacy</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Terms</a></li>
            <li><a href="#" className="depth-link inline-block hover:text-black transition-colors">Contact</a></li>
          </ul>
        </div>
      </footer>

      <div className="py-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2026 Freelancer OS. All rights reserved.</p>
      </div>
    </>
  );
}
