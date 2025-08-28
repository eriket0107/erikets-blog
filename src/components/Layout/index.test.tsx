import { render } from "@testing-library/react";
import { Layout } from ".";
import { describe, expect, it } from "vitest";

describe("Layout component", () => {
  it("should render with default classes", () => {
    const { container } = render(
      <Layout>
        <div>test</div>
      </Layout>,
    );
    const mainElement = container.firstChild;
    expect(mainElement).toHaveClass(
      "text-primary dark:text-primary-foreground screen-layout relative h-dvh overflow-y-scroll",
    );
  });

  it("should render children", () => {
    const { getByText } = render(
      <Layout>
        <div>test child</div>
      </Layout>,
    );
    expect(getByText("test child")).toBeInTheDocument();
  });

  it("should have main role", () => {
    const { getByRole } = render(
      <Layout>
        <div>test</div>
      </Layout>,
    );
    expect(getByRole("main")).toBeInTheDocument();
  });
});
