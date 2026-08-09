import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { AccordionItem, AccordionRoot } from "./Accordion"

function renderAccordion() {
  return render(
    <AccordionRoot>
      <AccordionItem id="one">
        <AccordionItem.Header>First</AccordionItem.Header>
        <AccordionItem.Content>First content</AccordionItem.Content>
      </AccordionItem>
      <AccordionItem id="two">
        <AccordionItem.Header>Second</AccordionItem.Header>
        <AccordionItem.Content>Second content</AccordionItem.Content>
      </AccordionItem>
    </AccordionRoot>
  )
}

describe("Accordion", () => {
  it("starts with every item collapsed", () => {
    renderAccordion()
    expect(screen.queryByText("First content")).not.toBeInTheDocument()
    expect(screen.queryByText("Second content")).not.toBeInTheDocument()
  })

  it("expands an item on click", async () => {
    renderAccordion()
    await userEvent.click(screen.getByText("First"))
    expect(screen.getByText("First content")).toBeInTheDocument()
  })

  it("only keeps one item open at a time", async () => {
    renderAccordion()
    await userEvent.click(screen.getByText("First"))
    await userEvent.click(screen.getByText("Second"))
    await waitFor(() => expect(screen.queryByText("First content")).not.toBeInTheDocument())
    expect(screen.getByText("Second content")).toBeInTheDocument()
  })

  it("collapses an open item on second click", async () => {
    renderAccordion()
    await userEvent.click(screen.getByText("First"))
    await userEvent.click(screen.getByText("First"))
    await waitFor(() => expect(screen.queryByText("First content")).not.toBeInTheDocument())
  })
})
