import { tagVariants } from "./Tag.styles"
import type { TTagProps } from "./Tag.types"

export function Tag({ text }: TTagProps) {
  return <span className={tagVariants()}>{text}</span>
}
