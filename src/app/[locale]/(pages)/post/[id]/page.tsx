import { getPostById } from "@/actions/posts";
import { LanguageType } from "@/interfaces/post";
import { Post as PostLayout } from "@/templates/Post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: LanguageType }>;
}) {
  const { id } = await params;
  const { data: post } = await getPostById(id);

  return {
    title: {
      default: post?.title,
      template: "%s | Coffe & Vanilla Code",
    },
  };
}

const Post = async ({
  params,
}: {
  params: Promise<{ id: string; locale: LanguageType }>;
}) => {
  const { id, locale: language } = await params;
  return <PostLayout id={id} language={language} />;
};

export default Post;
