import { getPostById } from "@/actions/posts";
import { BackButton } from "@/components/BackButton";
import { Box } from "@/components/Box";
import { PageWrapper } from "@/components/PageWrapper";
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
    <PageWrapper>
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
          <Typography.H2
            id="post-title"
            className="text-primary w-full pb-0 text-center text-4xl text-wrap md:max-w-[600px]"
            tabIndex={-1}
          >
            {post?.title[language]}
          </Typography.H2>

          <Ellipsis
            size={48}
            role="presentation"
            aria-hidden="true"
            className="text-primary"
          />

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
            className="text-primary text-base"
            role="text"
            aria-label="Post description"
          >
            {post?.description[language]}
          </Typography.P>

          <Typography.P
            className="text-primary text-lg"
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
    </PageWrapper>
  );
};
