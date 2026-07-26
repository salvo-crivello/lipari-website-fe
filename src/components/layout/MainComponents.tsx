import { TFooterProps, THeaderProps, TMainProps, TSectionProps } from "@/types/components.types"
import { cn } from "@/utils"

export function Header({ children, className, ...props }: THeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto flex w-full max-w-[1800px] px-4 py-4 sm:px-10 sm:py-10",
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

export function Section({ children, className, ...props }: TSectionProps) {
  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-4 py-10 sm:px-10 sm:py-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
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
