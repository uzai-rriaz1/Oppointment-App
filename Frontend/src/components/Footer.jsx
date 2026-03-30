import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className="bg-teal-700 text-white mt-10" ref={ref}>
      <div
        className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid gap-8 
                      grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      >
        <div className="space-y-3">
          <h1 className="font-semibold text-lg">Support</h1>
          <p className="text-sm hover:underline cursor-pointer">Help Center</p>
          <p className="text-sm hover:underline cursor-pointer">FAQs</p>
          <p className="text-sm hover:underline cursor-pointer">
            Privacy Policy
          </p>
          <p className="text-sm hover:underline cursor-pointer">
            Terms & Conditions
          </p>
        </div>

        <div className="space-y-3">
          <h1 className="font-semibold text-lg">Contact Us</h1>
          <p className="text-sm">support@medify.com</p>
          <p className="text-sm">+92 300 1234567</p>
        </div>

        <div className="space-y-3">
          <h1 className="font-semibold text-lg">Follow Us</h1>

          {inView && (
            <div className="flex items-center gap-5">
              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:text-gray-200 transition"
              >
                <Facebook size={22} />
              </a>

              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:text-gray-200 transition"
              >
                <Instagram size={22} />
              </a>

              <a
                href="https://www.google.com"
                target="_blank"
                className="hover:text-gray-200 transition"
              >
                <Linkedin size={22} />
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-teal-500 text-center py-4 text-sm">
        © {new Date().getFullYear()} Medify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
