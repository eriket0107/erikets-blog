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
      "mb-auto flex h-auto w-full flex-col items-center justify-start gap-4 p-4 pt-32 md:mx-auto md:w-[700px] md:pt-24",
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
