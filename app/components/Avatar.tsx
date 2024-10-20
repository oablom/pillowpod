"use client";
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.webp"
      alt="Avatar"
      className="rounded-full"
      width={30}
      height={30}
    />
  );
};

export default Avatar;
