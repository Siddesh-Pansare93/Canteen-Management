import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#2c2c5b] text-white py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between">
                {/* Left Section */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-xl font-bold text-[#fec723]">Agnel Eats 🍽️</h2>
                    <p className="mt-2 text-lg text-gray-300">
                        Making your campus dining experience quicker, easier, and more delicious.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-lg text-gray-300">
                        <li><a href="/" className="hover:text-[#fec723]">Home</a></li>
                        <li><a href="/menu" className="hover:text-[#fec723]">Menu</a></li>
                        <li><a href="/about" className="hover:text-[#fec723]">About</a></li>
                        <li><a href="/contact" className="hover:text-[#fec723]">Contact</a></li>
                    </ul>
                </div>

                {/* Social Icons */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
                    <div className="flex space-x-4 text-[#fec723] text-2xl">
                        <a href="https://facebook.com"><FaFacebookF /></a>
                        <a href="https://instagram.com"><FaInstagram /></a>
                        <a href="https://twitter.com"><FaTwitter /></a>
                        <a href="mailto:support@quickbite.app"><FaEnvelope /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} QuickBite. All rights reserved.
            </div>
        </footer>
    );
}
