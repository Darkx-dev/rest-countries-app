import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between px-24 shadow-md dark:bg-darkblue-1 max-sm:px-4">
      <Link href="/" className="text-2xl font-bold dark:text-white">
        Where is the world? <br/> <span className="text-sm font-medium">दुनिया में कहाँ?</span>
      </Link>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
