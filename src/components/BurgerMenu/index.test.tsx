import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BurgerMenu } from ".";

describe("BurgerMenu", () => {
  beforeEach(() => {});
  it("should render burger menu", () => {
    const { getByTestId } = render(<BurgerMenu />);
    const burgerButton = getByTestId("burger-menu");

    expect(burgerButton).toBeInTheDocument();
  });

  it("should open burger menu", () => {
    const { getByTestId } = render(<BurgerMenu />);
    const burgerButton = getByTestId("burger-menu");

    fireEvent.pointerDown(burgerButton);

    const burgerContainer = getByTestId("burger-menu-container");
    expect(burgerContainer).toBeInTheDocument();
  });

  it("should have all the menu links", () => {
    const { getByText, getByTestId } = render(<BurgerMenu />);
    const burgerButton = getByTestId("burger-menu");

    fireEvent.pointerDown(burgerButton);
    const homeLink = getByText(/Home/);
    const blogLink = getByText(/Blog/);
    const aboutLink = getByText(/About/);

    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(blogLink).toBeInTheDocument();
  });
});
