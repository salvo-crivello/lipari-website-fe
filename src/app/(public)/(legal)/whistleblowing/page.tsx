import type { Metadata } from "next";

import { LegalPage } from "@/views/legal/LegalPage";

export const metadata: Metadata = { title: "Whistleblowing" };

export default function Page() {
  return (
    <LegalPage title="Whistleblowing">
      <p>Content pending — provided by legal, not part of the Figma design.</p>
    </LegalPage>
  );
}
