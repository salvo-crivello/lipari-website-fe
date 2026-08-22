import { Section } from "@/components/layout/MainComponents"
import { Typo } from "@/components/ui/brand/Typo/Typo"
import { ButtonLink } from "@/components/ui/Button/Button"
import { getLabels } from "@/lib/content-client"
import { ROUTES } from "@/constant/routes"

async function ContactCta() {
  const { about } = await getLabels()
  const { eyebrow, title, description, cta } = about.contactCta

  return (
    <Section className="bg-slate-200">
      <Typo.H4 text={eyebrow} color="dark" className="col-span-4 text-slate-500 md:col-span-2" />
      <Typo.H2 color="dark" text={title} className="col-span-12 md:col-span-8 2xl:col-span-6" />
      <Typo.P
        color="dark"
        text={description}
        className="col-span-10 col-end-13 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 2xl:col-span-4 2xl:col-start-9"
        splitBy="line"
        stagger={0.1}
      />
      <ButtonLink
        href={ROUTES.CONTACT}
        text={cta}
        surface="light"
        color="tertiary"
        variant="fill"
        className="col-span-12 mt-6 justify-self-start max-sm:w-full md:col-span-4 md:col-start-9 md:mt-0 md:justify-self-end"
      />
    </Section>
  )
}

export default ContactCta
