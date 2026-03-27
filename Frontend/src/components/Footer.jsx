import { useInView } from "react-intersection-observer";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <footer className=" bg-sky-50" ref={ref}>
      <div className=" grid ml-2.5 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-3 lg:place-content-center">
        <div className="mb-2 space-y-2  lg:ml-20">
          <h1 className="font-bold text-xl">Support</h1>
          <p>Help Center</p>
          <p>FAQs</p>
          <p>Privacy Policy </p>
          <p>Terms & Conditions</p>
        </div>
        <div className="mb-2 space-y-2">
          <h1 className="font-bold text-xl">Contact Us</h1>
          <p>support@medify.com</p>
          <p>+92 300 1234567</p>
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold text-xl">Follow Us</h1>
          {inView && (
            <div className="ml-2 pb-2 flex gap-6 max-sm:gap-3">
              <a href="https://www.google.com" target="_blank" className="hover:text-blue-600">
                <Facebook />
              </a>
              <a href="https://www.google.com" target="_blank" className="hover:text-blue-600">
                <Instagram size={20} />
              </a>
              <a href="https://www.google.com" target="_blank" className="hover:text-blue-600">
                <Linkedin size={20} />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
