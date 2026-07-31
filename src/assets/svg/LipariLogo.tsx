import { TSvgProps } from "@/types/components.types"
import { cn } from "@/utils"

function LipariLogo({ className, width, height, ...props }: TSvgProps) {
  return (
    <svg
      width={width ?? 86}
      height={height ?? 118}
      viewBox="0 0 86 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M0 118V33.4559L19.5243 99.4636L82.2811 115.739L24.173 58.3218L86 0L52.0649 58.3218L86 118H0Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const LipariLogoType = ({ size = 80, className }: { size?: number; className?: string }) => {
  return (
    <div className={cn("flex flex-col items-start justify-end", className)}>
      <LipariLogo
        width={size * 0.2}
        height={size * 0.3 * LIPARI_LOGO_RATIO}
        className="text-brand-green mb-1"
      />
      <p
        className="font-condensed leading-none font-bold uppercase"
        style={{ fontSize: size * 0.3 }}
      >
        Lipari
      </p>
      <p
        className="font-condensed leading-tight font-bold uppercase"
        style={{ fontSize: size * 0.15 }}
      >
        Consulting
      </p>
    </div>
  )
}

export const LIPARI_LOGO_RATIO = 118 / 86

export default LipariLogo
