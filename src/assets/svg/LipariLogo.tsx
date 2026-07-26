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

export default LipariLogo
