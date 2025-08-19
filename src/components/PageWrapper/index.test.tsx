import { render } from "@testing-library/react";
import { PageWrapper } from ".";
import { describe } from "node:test";
import { expect, it } from "vitest";

describe("PageWrapper component", () => {
  it("should render with default classes", () => {
    const { container } = render(
      <PageWrapper>
        <div>test</div>
      </PageWrapper>,
    );
    const mainElement = container.firstChild;
    expect(mainElement).toHaveClass(
      "mx-auto mb-auto flex h-auto flex-col items-center justify-start gap-4 p-4 pt-30 w-full md:pt-24",
    );
  });

  it("should render with additional classes", () => {
    const { container } = render(
      <PageWrapper className="extra-class">
        <div>test</div>
      </PageWrapper>,
    );
    const mainElement = container.firstChild;
    expect(mainElement).toHaveClass("extra-class");
  });

  it("should render children", () => {
    const { getByText } = render(
      <PageWrapper>
        <div>test child</div>
      </PageWrapper>,
    );
    expect(getByText("test child")).toBeInTheDocument();
  });
});
