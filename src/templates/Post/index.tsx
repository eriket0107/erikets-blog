import { getPostById } from "@/actions/posts";
import { BackButton } from "@/components/BackButton";
import { Box } from "@/components/Box";
import { PageWrapper } from "@/components/PageWrapper";
import { Typography } from "@/components/Typography";
import { LanguageType } from "@/interfaces/post";
import { Ellipsis } from "lucide-react";
import { getPostData } from "@/lib/posts";
import { MDXContent } from "@/components/MDXContent";
import ArticleImage from "@/components/ArticleImage";
import { Tag } from "@/components/Tag";

export const Post = async ({
  id,
  language,
}: {
  id: string;
  language: LanguageType;
}) => {
  const { data: post } = await getPostById(id);
  const postData = getPostData(id, language);
  return (
    <PageWrapper>
      <Box as="nav" aria-label="Post navigation">
        <BackButton />
      </Box>

      <article
        role="article"
        aria-labelledby="post-title"
        className="align-center flex flex-col justify-center"
      >
        <Box as="header" direction="col" justify="center" align="center">
          <Typography.H2
            id="post-title"
            className="text-primary w-full pb-0 text-center text-4xl text-wrap md:max-w-[700px]"
            tabIndex={-1}
          >
            {post?.title}
          </Typography.H2>

          <Ellipsis
            size={48}
            role="presentation"
            aria-hidden="true"
            className="text-primary"
          />

          <ArticleImage
            src={post.imgSrc}
            alt={`Image of post ${post.title}`}
            className="rounded-t-sm"
            loading="lazy"
          />
        </Box>

        <Box
          as="section"
          className="pt-4"
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
            {post?.description}
          </Typography.P>
          <Box gap="2" height="auto">
            {post.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Box>
          <div
            className="bg-border my-4 h-px w-full"
            role="separator"
            aria-hidden="true"
          />

          <div className="w-full max-w-4xl">
            <MDXContent content={postData.content || ""} />
          </div>
        </Box>
      </article>
    </PageWrapper>
  );
};
