"use client"

import { MotionTextScramble } from "@/components/motion/MotionTextScramble"
import { cn, isBlankOrEmpty, isNotBlankOrEmpty, isNotNullOrUndefined } from "@/utils"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { buttonVariants } from "./Button.styles"
import type { TButton, TButtonLink } from "./Button.types"

function Button({
  className,
  variant,
  color,
  surface,
  bodyText,
  size = "lg",
  text = "",
  icon: Icon,
  iconPos = "left",
  ...props
}: TButton) {
  const onlyIcon = isBlankOrEmpty(text) && isNotNullOrUndefined(Icon)
  const isLeftIcon = isNotNullOrUndefined(Icon) && iconPos === "left"
  const isRightIcon = isNotNullOrUndefined(Icon) && iconPos === "right"
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.button
      aria-label={isNotBlankOrEmpty(text) ? text : Icon ? "icon button" : "button"}
      className={cn(
        buttonVariants({ variant, color, surface, bodyText, size, onlyIcon }),
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {isLeftIcon && <Icon className={cn(isNotBlankOrEmpty(text) && "mr-2")} />}
      {isNotBlankOrEmpty(text) && <MotionTextScramble text={text} trigger={isHovering} />}
      {isRightIcon && <Icon className={cn(isNotBlankOrEmpty(text) && "ml-2")} />}
    </motion.button>
  )
}

export function ButtonLink({
  className,
  variant,
  color = "primary",
  surface = "dark",
  bodyText,
  size = "lg",
  text = "",
  icon: Icon,
  iconPos = "left",
  href,
  ...props
}: TButtonLink) {
  const onlyIcon = isBlankOrEmpty(text) && isNotNullOrUndefined(Icon)
  const isLeftIcon = isNotNullOrUndefined(Icon) && iconPos === "left"
  const isRightIcon = isNotNullOrUndefined(Icon) && iconPos === "right"
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link
      href={href ?? "#"}
      aria-label={isNotBlankOrEmpty(text) ? text : Icon ? "icon button" : "button"}
      className={cn(
        buttonVariants({ variant, color, surface, bodyText, size, onlyIcon }),
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {isLeftIcon && <Icon className={cn(isNotBlankOrEmpty(text) && "mr-2")} />}
      {isNotBlankOrEmpty(text) && <MotionTextScramble text={text} trigger={isHovering} />}
      {isRightIcon && <Icon className={cn(isNotBlankOrEmpty(text) && "ml-2")} />}
    </Link>
  )
}

export default Button
