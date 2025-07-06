import { getPostById } from "@/actions/posts";
import { Box } from "@/components/Box";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Typography } from "@/components/Typography";
import { LanguageType } from "@/interfaces/posts";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export const Post = async ({
  id,
  language,
}: {
  id: string;
  language: LanguageType;
}) => {
  const post = await getPostById(id);

  return (
    <>
      <ScrollProgress />
      <Box
        justify="center"
        direction="col"
        align="center"
        padding="4"
        width="600"
        className="relative pb-8 md:mt-[5%]"
      >
        <Typography.H2 className="max-w-[600px] text-center text-4xl text-wrap">
          {post?.title[language]}
        </Typography.H2>

        <Ellipsis size={48} />

        <Image
          src={post.imgSrc}
          width={600}
          height={400}
          alt={post.title[language]}
          className="rounded-t-sm"
          loading="lazy"
        />
        <Box
          className="max-w-[600px] pt-4"
          direction="col"
          gap="2"
          justify="center"
          align="center"
        >
          <Typography.Muted className="underline">{post.date}</Typography.Muted>
          <Typography.P className="text-base">
            {post?.description[language]}
          </Typography.P>
          <Typography.P className="text-lg">
            {post?.text?.[language]}
          </Typography.P>
        </Box>
      </Box>
      <div className="to-background/100 from-background/0 fixed bottom-10 hidden h-[70px] w-full bg-gradient-to-b md:block md:max-w-[600px]" />
    </>
  );
};
