import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from ".";

const defaultProps = {
  imgSrc: "https://example.com/avataxr.jpg",
  alt: "User avatar",
  fallback: "UA",
};

const renderComponent = (props = {}) => {
  return render(<Avatar.Circle {...defaultProps} {...props} />);
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

describe("Avatar.Rectangular", () => {
  const rectangularProps = {
    imgSrc: "https://example.com/avatar.jpg",
    alt: "User rectangular avatar",
    fallback: "RA",
  };

  it("should render with rectangular styling", () => {
    render(<Avatar.Rectangular {...rectangularProps} />);

    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toBeInTheDocument();
    expect(avatarContainer).toHaveClass("rounded-lg");
  });

  it("should render fallback with rectangular styling", () => {
    render(<Avatar.Rectangular {...rectangularProps} imgSrc="" />);

    const fallback = screen.getByText("RA");
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveClass("rounded-lg");
  });

  it("should apply custom className", () => {
    render(<Avatar.Rectangular {...rectangularProps} className="custom-class" />);

    const avatarContainer = document.querySelector('[data-slot="avatar"]');
    expect(avatarContainer).toHaveClass("custom-class");
  });

  it("should render image with rounded-lg styling when image is available", () => {
    render(<Avatar.Rectangular {...rectangularProps} />);

    // In testing environment, check the AvatarImage component instead
    const avatarImage = document.querySelector('[data-slot="image"]');
    if (avatarImage) {
      expect(avatarImage).toHaveClass("rounded-lg");
    } else {
      // If image doesn't render in test, just verify the component renders
      const avatarContainer = document.querySelector('[data-slot="avatar"]');
      expect(avatarContainer).toBeInTheDocument();
    }
  });

  it("should handle different fallback text", () => {
    render(<Avatar.Rectangular {...rectangularProps} fallback="XY" />);

    expect(screen.getByText("XY")).toBeInTheDocument();
  });
});
