import {
  TDivProps,
  TFooterProps,
  THeaderProps,
  TMainProps,
  TSectionProps
} from "@/types/components.types"
import { cn, isNullOrUndefined } from "@/utils"

export function BodyOverlay({ className, ...props }: TDivProps) {
  return (
    <div
      className={cn("body-overlay pointer-events-none fixed inset-0 z-100 opacity-50", className)}
      {...props}
    />
  )
}

export function Header({ children, className, ...props }: THeaderProps) {
  return (
    <header
      className={cn("fixed top-0 z-50 mx-auto flex w-full px-4 py-4 sm:px-10 sm:py-10", className)}
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

export function Section({
  children,
  className,
  removePadding,
  fullScreen,
  ...props
}: TSectionProps) {
  return (
    <section
      className={cn(
        "deborder1 mx-auto grid w-full grid-cols-12 gap-4 gap-y-10 sm:gap-10",
        {
          "px-4 py-10 sm:px-10 sm:py-20 md:pt-30 2xl:pt-60": !removePadding,
          "min-h-screen": isNullOrUndefined(children) || fullScreen,
          "pt-36 lg:pt-60": fullScreen
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
    <div
      className={cn(
        "deborder2 relative col-span-12 grid grid-cols-12 gap-4 gap-y-10 sm:gap-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Footer({ children, className, ...props }: TFooterProps) {
  return (
    <footer
      className={cn("z-50 mx-auto flex w-full px-4 py-4 sm:px-10 sm:py-10", className)}
      {...props}
    >
      {children}
    </footer>
  )
}
