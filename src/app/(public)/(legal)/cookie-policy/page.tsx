import type { Metadata } from "next";

import { LegalPage } from "@/views/legal/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function Page() {
  return (
    <LegalPage title="Cookie Policy">
      <p>Content pending — provided by legal, not part of the Figma design.</p>
    </LegalPage>
  );
}
