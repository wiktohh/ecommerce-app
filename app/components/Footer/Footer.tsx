import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Wrapper from "../Wrapper";
import Link from "next/link";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const socials = [
    {
      id: 1,
      icon: <FaFacebook />,
    },
    {
      id: 2,
      icon: <FaTwitter />,
    },
    {
      id: 3,
      icon: <FaLinkedin />,
    },
  ];

  const data = [
    {
      title: "Sklep",
      links: [
        {
          name: "Karty podarunkowe",
          url: "/about",
        },
        {
          name: "Mapa",
          url: "/map",
        },
        {
          name: "Kontakt",
          url: "/contact",
        },
      ],
    },
    {
      title: "Sprzedaż",
      links: [
        {
          name: "Zespoły",
          url: "/teams",
        },
        {
          name: "Forum",
          url: "/forum",
        },
        {
          name: "Partnerzy",
          url: "/partners",
        },
      ],
    },
    {
      title: "Informacje",
      links: [
        {
          name: "Polityka prywatności",
          url: "/privacy",
        },
        {
          name: "Regulamin",
          url: "/terms",
        },
        {
          name: "Cookies",
          url: "/cookies",
        },
      ],
    },
    {
      title: "Pomoc",
      links: [
        {
          name: "FAQ",
          url: "/faq",
        },
        {
          name: "Dokumentacja",
          url: "/docs",
        },
        {
          name: "Pomoc",
          url: "/help",
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <footer className="pb-12">
        <div>
          <div className="flex">
            <div className="w-full md:w-1/2">
              <h6 className="font-semibold text-orange-500 text-center md:text-left">
                FoodieMarket
              </h6>
              <p className="text-center md:text-left">Gliwice, PL</p>
              <div className="flex gap-3 justify-center md:justify-start">
                {socials.map((social) => (
                  <div
                    className="my-2 hover:text-orange-500 cursor-pointer"
                    key={social.id}
                  >
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex md:w-1/2 md:justify-between">
              {data.map((item) => (
                <div key={item.title}>
                  <h6 className="mb-4 font-semibold">{item.title}</h6>
                  <ul className="md:flex md:flex-col">
                    {item.links.map((link) => (
                      <Link
                        className="hover:text-red-500"
                        href={link.url}
                        key={link.url}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center md:text-left">
          © {getCurrentYear()} by Wiktor Rzeźnicki
        </p>
      </footer>
    </Wrapper>
  );
};

export default Footer;
