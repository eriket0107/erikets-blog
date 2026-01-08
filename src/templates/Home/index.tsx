
import { Box } from "@/components/Box";

import { PageWrapper } from "@/components/PageWrapper";
import { Location } from "@/components/Location";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { ActionsButton } from "@/components/ActionsButton";


export const Home = async () => {
  return (
    <PageWrapper hasHeader={false} hasFooter={false} className=" flex justify-center items-center m-auto! relative h-dvh! w-screen!">
      <Box
        height="auto"
        as="section"
        direction="col"
        aria-labelledby="intro-heading"
        className="max-w-175 animate-fade-in-fast"
        align="center"
        gap="8"
      >
        <Logo />
        <div className="flex flex-col items-center gap-6 animate-fade-in-slow mx-auto w-full ">
          <Navbar className="flex flex-col" />
          <Location />
          <ActionsButton />
        </div>
      </Box>
    </PageWrapper>
  );
};
