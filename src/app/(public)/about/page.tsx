import type { Metadata } from "next";

import { AboutPage } from "@/views/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
};

export default function Page() {
  return <AboutPage />;
}
