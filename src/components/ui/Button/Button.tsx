"use client"

import { cloneElement, useState } from "react"
import { isBlankOrEmpty, isNotNullOrUndefined, isNotBlankOrEmpty, cn } from "@/utils"
import { buttonVariants } from "./Button.styles"
import type { TButton, TButtonLink, TButtonProps } from "./Button.types"
import { motion } from "motion/react"
import { MotionTextScramble } from "@/components/motion/MotionTextScramble"
import Link from "next/link"

function renderIcon(icon: TButtonProps["icon"], marginClassName: string) {
  if (isNotNullOrUndefined(icon) === false) return null
  return cloneElement(icon, {
    className: cn("shrink-0", marginClassName, icon.props.className),
    size: icon.props.size ?? "1.5em"
  })
}

function Button({
  className,
  variant,
  color,
  surface,
  bodyText,
  size = "lg",
  text = "",
  icon,
  iconPos = "left",
  ...props
}: TButton) {
  const onlyIcon = isBlankOrEmpty(text) && isNotNullOrUndefined(icon)
  const isLeftIcon = isNotNullOrUndefined(icon) && iconPos === "left"
  const isRightIcon = isNotNullOrUndefined(icon) && iconPos === "right"
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.button
      aria-label={isNotBlankOrEmpty(text) ? text : icon ? "icon button" : "button"}
      className={cn(
        buttonVariants({ variant, color, surface, bodyText, size, onlyIcon }),
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {isLeftIcon && renderIcon(icon, isNotBlankOrEmpty(text) ? "mr-2" : "")}
      {isNotBlankOrEmpty(text) && <MotionTextScramble text={text} trigger={isHovering} />}
      {isRightIcon && renderIcon(icon, isNotBlankOrEmpty(text) ? "ml-2" : "")}
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
  icon,
  iconPos = "left",
  href,
  ...props
}: TButtonLink) {
  const onlyIcon = isBlankOrEmpty(text) && isNotNullOrUndefined(icon)
  const isLeftIcon = isNotNullOrUndefined(icon) && iconPos === "left"
  const isRightIcon = isNotNullOrUndefined(icon) && iconPos === "right"
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link
      href={href ?? "#"}
      aria-label={isNotBlankOrEmpty(text) ? text : icon ? "icon button" : "button"}
      className={cn(
        buttonVariants({ variant, color, surface, bodyText, size, onlyIcon }),
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {isLeftIcon && renderIcon(icon, isNotBlankOrEmpty(text) ? "mr-2" : "")}
      {isNotBlankOrEmpty(text) && <MotionTextScramble text={text} trigger={isHovering} />}
      {isRightIcon && renderIcon(icon, isNotBlankOrEmpty(text) ? "ml-2" : "")}
    </Link>
  )
}

export default Button
