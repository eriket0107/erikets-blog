import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Coffe and Vanilla Code",
  },
  description: "Coffe and Vanilla Code",
};

const Blog = () => {
  return <>Blog</>;
};
export default Blog;
