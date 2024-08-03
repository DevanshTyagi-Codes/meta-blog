import React from "react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const icons = [
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/devansh-tyagi-aa6745260",
      icon: <LinkedInLogoIcon height="20" width="20" />,
    },
    {
      title: "Github",
      href: "https://github.com/DevanshTyagi-Codes",
      icon: <GitHubLogoIcon height="20" width="20" />,
    },
  ];

  return (
    <div className="bg-[#242535] h-[12vh] w-full p-3">
      <div className="flex gap-4 justify-evenly items-center text-white">
        <div>
          <span className="font-semibold">© Devansh Tyagi</span>
        </div>
        <div className="flex gap-5 items-center justify-center">
          {icons.map((icon) => (
            <div key={icon.title}>
              <a
                href={icon.href}
                className="flex justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-semibold">{icon.title}</span>
                {icon.icon}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
