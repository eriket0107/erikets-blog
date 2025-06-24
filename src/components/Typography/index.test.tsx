import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "./index";

describe("Typography Components", () => {
  describe("TypographyH1", () => {
    it("renders h1 with correct text", () => {
      render(<Typography.H1>Test Heading</Typography.H1>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test Heading",
      );
    });

    it("applies custom className", () => {
      render(<Typography.H1 className="custom-class">Test</Typography.H1>);
      const element = screen.getByRole("heading", { level: 1 });
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("scroll-m-20");
    });

    it("passes through additional props", () => {
      render(<Typography.H1 data-testid="test-h1">Test</Typography.H1>);
      expect(screen.getByTestId("test-h1")).toBeInTheDocument();
    });
  });

  describe("TypographyH2", () => {
    it("renders h2 with correct text", () => {
      render(<Typography.H2>Test Heading</Typography.H2>);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Test Heading",
      );
    });

    it("applies custom className", () => {
      render(<Typography.H2 className="custom-class">Test</Typography.H2>);
      const element = screen.getByRole("heading", { level: 2 });
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("scroll-m-20");
    });
  });

  describe("TypographyH3", () => {
    it("renders h3 with correct text", () => {
      render(<Typography.H3>Test Heading</Typography.H3>);
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Test Heading",
      );
    });

    it("applies custom className", () => {
      render(<Typography.H3 className="custom-class">Test</Typography.H3>);
      const element = screen.getByRole("heading", { level: 3 });
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("scroll-m-20");
    });
  });

  describe("TypographyH4", () => {
    it("renders h4 with correct text", () => {
      render(<Typography.H4>Test Heading</Typography.H4>);
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
        "Test Heading",
      );
    });

    it("applies custom className", () => {
      render(<Typography.H4 className="custom-class">Test</Typography.H4>);
      const element = screen.getByRole("heading", { level: 4 });
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("scroll-m-20");
    });
  });

  describe("TypographyP", () => {
    it("renders paragraph with correct text", () => {
      render(<Typography.P>Test paragraph</Typography.P>);
      expect(screen.getByText("Test paragraph")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Typography.P className="custom-class">Test</Typography.P>);
      const element = screen.getByText("Test");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("leading-7");
    });
  });

  describe("TypographyLead", () => {
    it("renders lead paragraph with correct text", () => {
      render(<Typography.Lead>Test lead</Typography.Lead>);
      expect(screen.getByText("Test lead")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Typography.Lead className="custom-class">Test</Typography.Lead>);
      const element = screen.getByText("Test");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-muted-foreground");
      expect(element).toHaveClass("text-xl");
    });
  });

  describe("TypographyBlockquote", () => {
    it("renders blockquote with correct text", () => {
      render(<Typography.Blockquote>Test quote</Typography.Blockquote>);
      expect(screen.getByText("Test quote")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Typography.Blockquote className="custom-class">
          Test
        </Typography.Blockquote>,
      );
      const element = screen.getByText("Test");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("mt-6");
      expect(element).toHaveClass("border-l-2");
      expect(element).toHaveClass("pl-6");
      expect(element).toHaveClass("italic");
    });
  });

  describe("TypographySmall", () => {
    it("renders small text with correct content", () => {
      render(<Typography.Small>Test small</Typography.Small>);
      expect(screen.getByText("Test small")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Typography.Small className="custom-class">Test</Typography.Small>,
      );
      const element = screen.getByText("Test");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-sm");
      expect(element).toHaveClass("leading-none");
      expect(element).toHaveClass("font-medium");
    });
  });

  describe("TypographyMuted", () => {
    it("renders muted text with correct content", () => {
      render(<Typography.Muted>Test muted</Typography.Muted>);
      expect(screen.getByText("Test muted")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Typography.Muted className="custom-class">Test</Typography.Muted>,
      );
      const element = screen.getByText("Test");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveClass("text-muted-foreground");
    });
  });

  describe("Component Integration", () => {
    it("renders multiple typography components together", () => {
      render(
        <div>
          <Typography.H1>Main Title</Typography.H1>
          <Typography.H2>Subtitle</Typography.H2>
          <Typography.P>Paragraph text</Typography.P>
          <Typography.Lead>Lead text</Typography.Lead>
        </div>,
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Main Title",
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Subtitle",
      );
      expect(screen.getByText("Paragraph text")).toBeInTheDocument();
      expect(screen.getByText("Lead text")).toBeInTheDocument();
    });
  });
});
