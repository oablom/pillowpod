"use client";

import Image from "next/image";
// import Logo from "./Logo";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      src="/images/Logo.webp"
      alt="Logo"
      className=" md-block cursor-pointer"
      width={100}
      height={100}
      // onClick={() => router.push("/")}
    />
  );
};
export default Logo;
