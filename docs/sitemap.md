# Site map

Source: Figma file, page `website` (`341:2`). Shared on every page: nav
(Services / About / Culture & Career / Contact + "LAVORA CON NOI" CTA) and a
dark-navy footer with the link groups shown below.

**Primary pages** (all have a Figma design):

| Route                    | Figma frame              | Notes                                                                                                                                                                 |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                      | HOMEPAGE `443:1183`      | Hi-fi. A stale lo-fi frame also exists under "Desktop - 2" `345:709`, named `HOME` — **ignore it**, it's an old wireframe.                                            |
| `/about`                 | `476:1263`               | Mission/vision, timeline 2007→2024, leader board                                                                                                                      |
| `/services`              | `479:1374`               | Consulting/Technology split, accordion service list                                                                                                                   |
| `/services/[slug]`       | Single-Service `531:852` | Detail template, prev/next nav between services                                                                                                                       |
| `/culture-career`        | `483:1654`               | Culture value blocks, logo strip, open-positions grid                                                                                                                 |
| `/culture-career/[slug]` | Single-Job `537:1651`    | Styled as an overlay w/ close-X in Figma, but **decided: real standalone page, own URL** — SEO for job postings and shareable recruiter links outweigh the modal look |
| `/contact`               | `504:2651`               | Form (Proposta/Domanda tabs)                                                                                                                                          |

**Satellite / legal pages** — footer links only, **no Figma design exists for
these** (confirmed with user). Use one reusable "legal page" template
(`views/legal/LegalPage.tsx`): title + rich-text body. Route slugs are
English regardless of the Italian label shown in the UI:

| Route                     | Footer label (IT, as designed) |
| ------------------------- | ------------------------------ |
| `/whistleblowing`         | Whistleblowing                 |
| `/code-of-ethics`         | Codice Etico                   |
| `/gender-equality-policy` | Politica di Parità di Genere   |
| `/privacy-policy`         | Privacy Policy                 |
| `/cookie-policy`          | Cookie Policy                  |
| `/terms-and-conditions`   | Termini e Condizioni           |

**Design tokens observed in Figma:** dark navy + neon-lime accent palette,
halftone/dither texture overlay on photos, display-sans headlines mixed with
monospace-style micro-labels.

**Figma file reference** (for `get_metadata` / `get_design_context` lookups)
— top-level pages in the file: `0:1` project-feux, `137:439` Components,
`341:2` **website** (the one in use, contains all frames above), `7:2`
project-salamandra-2.0 (a different, unrelated project — don't confuse it
with this one).
