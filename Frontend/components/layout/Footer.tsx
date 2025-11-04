import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-bold text-blue-700 mb-4">HighImpact Solutions</h3>
          <p className="text-sm">
            Building smarter agricultural solutions with interactive maps, analytics, and insights for farmers, developers, and enterprises.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-blue-700 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link href="/map" className="hover:text-blue-600 transition">Map</Link></li>
            <li><Link href="/chatbot" className="hover:text-blue-600 transition">Chatbot</Link></li>
            <li><Link href="/signup" className="hover:text-blue-600 transition">Sign Up</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-bold text-blue-700 mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-blue-600 transition">Parcel Management</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Insights & Analytics</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Farm Monitoring</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Support</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-bold text-blue-700 mb-4">Connect with Us</h3>
          <p className="text-sm mb-4">Follow us on social media or contact us directly.</p>
          <div className="flex space-x-4 mb-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition"><FaFacebookF /></Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition"><FaTwitter /></Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition"><FaLinkedinIn /></Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600 transition"><FaInstagram /></Link>
          </div>
          <p className="text-sm">
            Email: <Link href="mailto:info@highimpact.com" className="hover:text-blue-600 transition">info@highimpact.com</Link><br />
            Phone: <Link href="tel:+1234567890" className="hover:text-blue-600 transition">+1 234 567 890</Link>
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} HighImpact Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
