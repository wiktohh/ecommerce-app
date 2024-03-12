import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Wrapper from "../Wrapper";
import Link from "next/link";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

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
          url: "/contact",
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
      <footer className="">
        <div>
          <div className="flex">
            <div className="w-1/2">
              <h6>Ecommerce App</h6>
              <p>Gliwice, PL</p>
              <div className="flex gap-3">
                <FaFacebook />
                <FaTwitter />
                <FaLinkedin />
              </div>
            </div>
            <div className="w-1/2 flex justify-between">
              {data.map((item, idx) => (
                <div key={idx}>
                  <h6 className="mb-4 font-semibold">{item.title}</h6>
                  <ul className="flex flex-col">
                    {item.links.map((link, idx) => (
                      <Link href={link.url} key={idx}>
                        {link.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p>© {getCurrentYear()} by Wiktor Rzeźnicki</p>
      </footer>
    </Wrapper>
  );
};

export default Footer;
