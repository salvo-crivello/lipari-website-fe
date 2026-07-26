"use client"

import { isBlankOrEmpty, isNotNullOrUndefined, isNotBlankOrEmpty, cn } from "@/utils"
import { buttonVariants } from "./Button.styles"
import type { TButton } from "./Button.types"
import { motion } from "motion/react"

function Button({
  className,
  variant,
  size = "lg",
  text = "",
  icon: Icon,
  iconPos = "left",
  ...props
}: TButton) {
  const onlyIcon = isBlankOrEmpty(text) && isNotNullOrUndefined(Icon)
  const isLeftIcon = isNotNullOrUndefined(Icon) && iconPos === "left"
  const isRightIcon = isNotNullOrUndefined(Icon) && iconPos === "right"

  return (
    <motion.button
      aria-label={isNotBlankOrEmpty(text) ? text : Icon ? "icon button" : "button"}
      className={cn(buttonVariants({ variant, size, onlyIcon }), className)}
      {...props}
    >
      {isLeftIcon && (
        <Icon className={cn("shrink-0", { "mr-2": isNotNullOrUndefined(text) })} size={"1.5em"} />
      )}
      {text}
      {isRightIcon && (
        <Icon className={cn("shrink-0", { "ml-2": isNotNullOrUndefined(text) })} size={"1.5em"} />
      )}
    </motion.button>
  )
}

export default Button
