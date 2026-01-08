
import { PageWrapper } from "@/components/PageWrapper";
import { Location } from "@/components/Location";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import { ActionsContainer } from "@/components/ActionsContainer";


export const Home = async () => {
  return (
    <PageWrapper hasHeader={false} hasFooter={false} className=" flex justify-center items-center m-auto! relative h-dvh!  w-screen!">
      <div className="max-w-175 animate-fade-in-fast">
        <Logo />
      </div>
      <div className="flex flex-col items-center gap-6 animate-fade-in-slow mx-auto w-full ">
        <span className="bg-background/50 shadow-lg backdrop-blur-md rounded-full px-6 py-2">
          <Navbar className="flex flex-col" />
        </span>
        <Location />
        <ActionsContainer />
      </div>
    </PageWrapper >
  );
};
