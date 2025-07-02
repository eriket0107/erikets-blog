import { PostType } from "@/interfaces/posts";


const postsMock: PostType[] = [
  {
    id: "1",
    imgSrc: "https://picsum.photos/600/400?random=1",
    title: "Mastering Advanced TypeScript",
    description: "A deep dive into advanced TypeScript features like conditional types, mapped types, and decorators. Perfect for experienced developers.",
    date: "2025-07-02",
    text: "Welcome to our deep dive into advanced TypeScript! In this post, we will explore some of the most powerful features that TypeScript has to offer. We'll start with conditional types, which allow you to create types that change based on the properties of other types. Then, we'll move on to mapped types, a feature that lets you transform existing types into new ones. Finally, we'll cover decorators, an experimental feature that provides a way to add annotations and meta-programming syntax for classes and class members. By the end of this article, you'll have a solid understanding of how to leverage these features to write more robust, flexible, and maintainable code.",
  },
  {
    id: "2",
    imgSrc: "https://picsum.photos/600/400?random=2",
    title: "Building a Scalable API with Node.js and Fastify",
    description: "Learn how to build high-performance, low-overhead web applications and APIs using Fastify, a modern Node.js framework.",
    date: "2025-07-01",
    text: "When it comes to building APIs with Node.js, Express has long been the go-to choice. However, a new generation of frameworks is pushing the boundaries of performance. Enter Fastify. Designed from the ground up to be highly performant, Fastify achieves this through a powerful hook system and a schema-based approach to JSON parsing and serialization. This post will guide you through the process of setting up a new project, defining routes, validating input, and connecting to a database. We will build a complete RESTful API that is not only fast but also well-structured and easy to scale.",
  },
  {
    id: "3",
    imgSrc: "https://picsum.photos/600/400?random=3",
    title: "Testing React Components with Vitest and Testing Library",
    description: "Ensure your React components are robust and bug-free by writing effective tests with the modern and fast Vitest framework.",
    date: "2025-06-30",
    text: "Testing is a critical part of modern web development, and the React ecosystem has fantastic tools to help. While Jest has been a popular choice, Vitest has emerged as a compelling alternative, offering a blazing-fast testing experience with a familiar API. Combined with React Testing Library, which encourages you to write tests that resemble how users interact with your components, you can build a powerful and efficient testing suite. This tutorial will walk you through setting up Vitest in a React project, writing your first component tests, mocking API calls, and testing user interactions. Get ready to ship your components with confidence!",
  },
  {
    id: "4",
    imgSrc: "https://picsum.photos/600/400?random=4",
    title: "Modern CSS: Beyond Flexbox and Grid",
    description: "Explore new and upcoming CSS features like container queries, the :has() selector, and scroll-driven animations.",
    date: "2025-06-29",
    text: "CSS has evolved dramatically over the past few years. While Flexbox and Grid have revolutionized layout, a new wave of features is giving developers even more power and control. In this article, we'll explore the future of CSS. We'll look at container queries, which allow components to adapt to their container's size, not just the viewport's. We will also dive into the :has() selector, often called the 'parent selector,' which opens up new possibilities for styling based on an element's children. Finally, we'll experiment with scroll-driven animations, a new way to create engaging user experiences tied to scroll position.",
  },
  {
    id: "5",
    imgSrc: "https://picsum.photos/600/400?random=5",
    title: "Interactive Data Visualization with D3.js",
    description: "A comprehensive guide to creating beautiful and interactive charts and graphs for the web using the powerful D3.js library.",
    date: "2025-06-28",
    text: "Data is everywhere, and the ability to visualize it effectively is a key skill for any web developer. D3.js (Data-Driven Documents) is the most powerful library for creating custom, interactive data visualizations for the web. Unlike other charting libraries, D3 gives you full control over the final result by allowing you to bind arbitrary data to a Document Object Model (DOM), and then apply data-driven transformations to the document. This guide will cover the core concepts of D3, including selections, data binding, scales, and transitions. We will build a simple bar chart from scratch and then add interactivity to bring it to life.",
  },
];

export default postsMock
// You can export it to use in other files
// export default postsMock;