import type { Metadata } from "next";

import { HomePage } from "@/views/home/HomePage";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return <HomePage />;
}
