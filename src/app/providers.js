"use client";

import { ThemeProvider } from "next-themes";
import Card from "../components/Card";

const Providers = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
};

export default Providers;
