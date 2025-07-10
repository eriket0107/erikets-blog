import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

const defaultProps = {
  imgSrc: "https://example.com/avataxr.jpg",
  alt: "User avatar",
  fallback: "UA",
};

const renderComponent = (props = {}) => {
  return render(<Avatar {...defaultProps} {...props} />);
};

describe("Avatar", () => {
  it("should render correctly", () => {
    renderComponent();

    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();
  });

  it("should render avatar container with correct structure", () => {
    renderComponent();

    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();
    expect(avatarContainer).toHaveClass("relative", "flex", "rounded-full");
  });

  it("should render fallback when image fails to load (default test behavior)", () => {
    renderComponent();

    // In test environments, images typically fail to load, so fallback is shown
    expect(screen.getByText(defaultProps.fallback)).toBeInTheDocument();

    const avatarFallback = document.querySelector(
      '[data-slot="avatar-fallback"]',
    );
    expect(avatarFallback).toBeInTheDocument();
  });

  it("should display custom fallback text", () => {
    const customFallback = "AB";
    renderComponent({ fallback: customFallback });

    expect(screen.getByText(customFallback)).toBeInTheDocument();
  });

  it("should render with different image sources", () => {
    const customSrc = "https://example.com/custom-avatar.png";
    renderComponent({ imgSrc: customSrc });

    // Even if image doesn't load in test, the component should still render
    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();
  });

  it("should handle different alt text props", () => {
    const customAlt = "Custom avatar description";
    renderComponent({ alt: customAlt });

    // The alt text is passed to the AvatarImage component
    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();
  });

  it("should render AvatarFallback when image is not available", () => {
    renderComponent({ imgSrc: "invalid-url" });

    const avatarFallback = document.querySelector(
      '[data-slot="avatar-fallback"]',
    );
    expect(avatarFallback).toBeInTheDocument();
    expect(screen.getByText(defaultProps.fallback)).toBeInTheDocument();
  });

  it("should pass props correctly to child components", () => {
    const { container } = renderComponent();

    // Check that the Avatar component structure is correct
    const avatarRoot = container.querySelector('[data-slot="avatar"]');
    const avatarFallback = container.querySelector(
      '[data-slot="avatar-fallback"]',
    );

    expect(avatarRoot).toBeInTheDocument();
    expect(avatarFallback).toBeInTheDocument();
    expect(avatarFallback).toHaveTextContent(defaultProps.fallback);
  });

  it("should handle props changes", () => {
    const newFallback = "XY";
    renderComponent({ fallback: newFallback });

    expect(screen.getByText(newFallback)).toBeInTheDocument();
    expect(screen.queryByText(defaultProps.fallback)).not.toBeInTheDocument();
  });
});
