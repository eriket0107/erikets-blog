import { getPostById } from "@/actions/posts";
import { BackButton } from "@/components/BackButton";
import { Box } from "@/components/Box";
import { Typography } from "@/components/Typography";
import { LanguageType } from "@/interfaces/post";
import { Ellipsis } from "lucide-react";
// import Image from "next/image";

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
      <div className="flex h-auto w-[600px] flex-col items-center justify-start gap-4 p-4 pt-30 md:pt-24">
        <Box as="nav" aria-label="Post navigation">
          <BackButton />
        </Box>

        <Box
          as="article"
          direction="col"
          justify="center"
          align="center"
          role="article"
          aria-labelledby="post-title"
        >
          <Box as="header" direction="col" justify="center" align="center">
            <Typography.H1
              id="post-title"
              className="w-full pb-0 text-center text-4xl text-wrap md:max-w-[600px]"
              tabIndex={-1}
            >
              {post?.title[language]}
            </Typography.H1>

            <Ellipsis size={48} role="presentation" aria-hidden="true" />

            {/* <Image
              src={post.imgSrc}
              width={600}
              height={400}
              alt={post.title[language]}
              className="rounded-t-sm"
              priority
              role="img"
            /> */}
          </Box>

          <Box
            as="section"
            className="max-w-[600px] pt-4"
            direction="col"
            gap="2"
            justify="center"
            align="center"
            aria-labelledby="post-content"
          >
            <Typography.Muted
              className="underline"
              role="text"
              aria-label={`Published on ${post.date}`}
            >
              {post.date}
            </Typography.Muted>

            <Typography.P
              className="text-base"
              role="text"
              aria-label="Post description"
            >
              {post?.description[language]}
            </Typography.P>

            <Typography.P
              className="text-lg"
              role="text"
              aria-label="Post content"
            >
              {post?.text?.[language]}
            </Typography.P>

            <div
              className="bg-border my-4 h-px w-full"
              role="separator"
              aria-hidden="true"
            />
          </Box>
        </Box>
      </div>

      <div
        className="to-background/100 from-background/0 fixed bottom-10 hidden h-[70px] w-full bg-gradient-to-b md:block md:max-w-[600px]"
        aria-hidden="true"
        role="presentation"
      />
    </>
  );
};
