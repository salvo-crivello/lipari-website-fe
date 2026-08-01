import { ButtonHTMLAttributes, HtmlHTMLAttributes, ReactNode, SVGProps } from "react"

export type THeaderProps = HtmlHTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export type TMainProps = HtmlHTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export type TSectionProps = HtmlHTMLAttributes<HTMLElement> & {
  removePadding?: boolean
  fullScreen?: boolean
  children: ReactNode
}

export type TFooterProps = HtmlHTMLAttributes<HTMLElement> & {
  children: ReactNode
}

export type TDivProps = HtmlHTMLAttributes<HTMLDivElement>

export type TButtonHtmlProps = ButtonHTMLAttributes<HTMLButtonElement>

export type TSvgProps = SVGProps<SVGSVGElement>
