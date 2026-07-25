import type { Metadata } from "next";

import { LegalPage } from "@/views/legal/LegalPage";

export const metadata: Metadata = { title: "Termini e Condizioni" };

export default function Page() {
  return (
    <LegalPage title="Termini e Condizioni">
      <p>Content pending — provided by legal, not part of the Figma design.</p>
    </LegalPage>
  );
}
