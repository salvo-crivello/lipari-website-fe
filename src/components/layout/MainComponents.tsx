import {
  TDivProps,
  TFooterProps,
  THeaderProps,
  TMainProps,
  TSectionProps
} from "@/types/components.types"
import { cn, isNullOrUndefined } from "@/utils"

export function Header({ children, className, ...props }: THeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 z-50 mx-auto flex w-full max-w-[1800px] px-4 py-4 sm:px-10 sm:py-10",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}

export function Main({ children, className, ...props }: TMainProps) {
  return (
    <main className={cn("flex flex-1 flex-col", className)} {...props}>
      {children}
    </main>
  )
}

export function Section({ children, className, removePadding, ...props }: TSectionProps) {
  return (
    <section
      className={cn(
        "deborder1 mx-auto w-full max-w-[1800px]",
        {
          "px-4 py-10 sm:px-10 sm:py-20": !removePadding,
          "min-h-screen": isNullOrUndefined(children)
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function SubSection({ children, className, ...props }: TDivProps) {
  return (
    <div className={cn("deborder2 relative flex gap-20 py-20", className)} {...props}>
      {children}
    </div>
  )
}

export function Footer({ children, className, ...props }: TFooterProps) {
  return (
    <footer
      className={cn(
        "z-50 mx-auto flex w-full max-w-[1800px] px-4 py-4 sm:px-10 sm:py-10",
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
}
