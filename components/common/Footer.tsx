import Link from "next/link";

const Footer = () => {
  const links = [
    {
      name: "Links",
      items: [
        {
          name: "Home",
          href: "/",
        },
        {
          name: "Pricing",
          href: "/",
        },
        {
          name: "About us",
          href: "/",
        },
        {
          name: "Careers",
          href: "/",
        },
        {
          name: "Features",
          href: "/",
        },
        {
          name: "Demo the product",
          href: "/",
        },
        {
          name: "Blog",
          href: "/",
        },
      ],
    },
    {
      name: "Legal",
      items: [
        {
          name: "Terms of use",
          href: "/",
        },
        {
          name: "Terms & conditions",
          href: "/",
        },
        {
          name: "Privacy policy",
          href: "/",
        },
        {
          name: "Cookie policy",
          href: "/",
        },
      ],
    },
    {
      name: "Products",
      items: [
        {
          name: "​​Take the tour",
          href: "/",
        },
        {
          name: "Live chat",
          href: "/",
        },
        {
          name: "Self-service",
          href: "/",
        },
        {
          name: "Social",
          href: "/",
        },
        {
          name: "Mobile",
          href: "/",
        },
        {
          name: "babun Reviews",
          href: "/",
        },
      ],
    },
  ];
  return (
    <footer className="container pb-6">
      <div className="flex py-10 xl:py-14 flex-col lg:flex-row items-start justify-between gap-6">
        <div className="basis-full w-full lg:basis-[40%]">
          <div className="sm:w-[365px] w-full mx-auto lg:mx-0 h-[340px] sm:h-[365px] rounded-full bg-[#FFF6C6] flex flex-col items-center justify-center gap-y-7">
            <img src={"/images/logo.png"} alt="" width={180} height={75} />
            <p className="text-center max-w-[260px] mx-auto opacity-70 text-xl">
              2190 Urban Terrace, Mirpur, Licensed in 50 states.
            </p>
            <p className=" text-xl xl:text-2xl font-medium text-center">
              +757 699-4478
            </p>
          </div>
        </div>
        <div className="basis-full lg:basis-[60%] flex flex-wrap gap-6  justify-between ">
          {links.map((l, index) => (
            <div key={index}>
              <div>
                <h4 className="text-xl xl:text-2xl font-bold">{l.name}</h4>
              </div>
              <ul className="pt-2 space-y-2">
                {l.items.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-lg hover:underline xl:text-xl font-normal opacity-60"
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between ">
        <p className="text-sm xl:text-base font-normal">
          Copyright @2023 babun inc.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <Link className="text-base font-medium" href={"/"}>
              Privacy & Terms.
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={"/"}>
              Cookies.
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={"/"}>
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          <li>
            <Link className="text-base font-medium" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M22.4 0.418945H2.8C1.26 0.418945 0 1.67881 0 3.21864V22.8165C0 24.3577 1.26 25.6162 2.8 25.6162H12.6V15.8172H9.8V12.3526H12.6V9.48294C12.6 6.45368 14.2968 4.32591 17.8724 4.32591L20.3966 4.32871V7.97531H18.7208C17.3292 7.97531 16.8 9.0196 16.8 9.98829V12.354H20.3952L19.6 15.8172H16.8V25.6162H22.4C23.94 25.6162 25.2 24.3577 25.2 22.8165V3.21864C25.2 1.67881 23.94 0.418945 22.4 0.418945Z"
                  fill="black"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
              >
                <path
                  d="M23.6001 1.02763C22.6425 1.70304 21.5822 2.21961 20.4601 2.55746C19.8578 1.86505 19.0574 1.37429 18.1671 1.15155C17.2768 0.928804 16.3396 0.984833 15.4822 1.31205C14.6248 1.63928 13.8885 2.2219 13.3731 2.98113C12.8576 3.74037 12.5878 4.63957 12.6001 5.55713V6.55702C10.8427 6.60258 9.10137 6.21287 7.53111 5.42259C5.96084 4.63231 4.61041 3.466 3.6001 2.02752C3.6001 2.02752 -0.399902 11.0265 8.6001 15.0261C6.54063 16.4239 4.08725 17.1248 1.6001 17.0259C10.6001 22.0253 21.6001 17.0259 21.6001 5.52714C21.5992 5.24862 21.5724 4.97079 21.5201 4.69723C22.5407 3.69083 23.2609 2.42019 23.6001 1.02763Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M16.6001 1.01758H6.6001C3.83867 1.01758 1.6001 3.25591 1.6001 6.01703V16.0159C1.6001 18.777 3.83867 21.0154 6.6001 21.0154H16.6001C19.3615 21.0154 21.6001 18.777 21.6001 16.0159V6.01703C21.6001 3.25591 19.3615 1.01758 16.6001 1.01758Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6003 10.3869C15.7237 11.2191 15.5816 12.0691 15.1941 12.8159C14.8066 13.5627 14.1934 14.1683 13.4419 14.5466C12.6904 14.9248 11.8387 15.0565 11.0081 14.9228C10.1774 14.7892 9.41005 14.397 8.81513 13.8021C8.22021 13.2071 7.82803 12.4398 7.69436 11.6091C7.5607 10.7785 7.69236 9.9268 8.07062 9.17528C8.44888 8.42376 9.05448 7.81064 9.80128 7.42314C10.5481 7.03565 11.398 6.89349 12.2303 7.0169C13.0792 7.14279 13.8651 7.53837 14.472 8.14521C15.0788 8.75205 15.4744 9.53798 15.6003 10.3869Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.1001 5.5166H17.1101"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link className="text-base font-medium" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={26}
                viewBox="0 0 27 26"
                fill="none"
              >
                <path
                  d="M17.9335 8.67676C19.6574 8.67676 21.3107 9.36158 22.5297 10.5806C23.7487 11.7996 24.4335 13.4529 24.4335 15.1768V22.7601H20.1001V15.1768C20.1001 14.6021 19.8719 14.051 19.4655 13.6447C19.0592 13.2384 18.5081 13.0101 17.9335 13.0101C17.3588 13.0101 16.8077 13.2384 16.4014 13.6447C15.9951 14.051 15.7668 14.6021 15.7668 15.1768V22.7601H11.4335V15.1768C11.4335 13.4529 12.1183 11.7996 13.3373 10.5806C14.5563 9.36158 16.2096 8.67676 17.9335 8.67676Z"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.10006 9.75977H2.76672V22.7598H7.10006V9.75977Z"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.93339 6.51009C6.13001 6.51009 7.10006 5.54004 7.10006 4.34342C7.10006 3.14681 6.13001 2.17676 4.93339 2.17676C3.73677 2.17676 2.76672 3.14681 2.76672 4.34342C2.76672 5.54004 3.73677 6.51009 4.93339 6.51009Z"
                  stroke="black"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
