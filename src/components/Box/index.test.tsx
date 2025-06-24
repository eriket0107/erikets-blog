import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from ".";

describe("Box Component", () => {
  it("should render with default props", () => {
    render(<Box>Test content</Box>);
    const element = screen.getByText("Test content");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("DIV");
  });

  it("should render with custom element type", () => {
    render(<Box as="section">Section content</Box>);
    const element = screen.getByText("Section content");
    expect(element.tagName).toBe("SECTION");
  });

  it("should apply display and direction classes correctly", () => {
    render(
      <Box display="flex" direction="col" data-testid="box">
        Content
      </Box>,
    );
    const element = screen.getByTestId("box");
    expect(element).toHaveClass("flex", "flex-col");
  });

  it("should apply spacing and layout classes", () => {
    render(
      <Box
        gap="4"
        padding="8"
        margin="2"
        justify="center"
        align="center"
        data-testid="box"
      >
        Content
      </Box>,
    );
    const element = screen.getByTestId("box");
    expect(element).toHaveClass(
      "gap-4",
      "p-8",
      "m-2",
      "justify-center",
      "items-center",
    );
  });

  it("should apply border and border radius classes", () => {
    render(
      <Box border="2" borderRadius="lg" data-testid="box">
        Content
      </Box>,
    );
    const element = screen.getByTestId("box");
    expect(element).toHaveClass("border-2", "rounded-lg");
  });
});
