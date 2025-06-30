import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "About",
    template: "%s | Coffe and Vanilla Code",
  },
  description: "Coffe and Vanilla Code",
};

const About = () => {
  return <>About</>;
};

export default About;
