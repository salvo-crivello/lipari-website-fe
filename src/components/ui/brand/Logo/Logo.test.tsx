import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Logo } from "./Logo"

describe("Logo", () => {
  it("renders without crashing", () => {
    const { container } = render(<Logo />)
    expect(container).toBeInTheDocument()
  })
})
