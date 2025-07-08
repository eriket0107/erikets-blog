import { getPostById } from "@/actions/posts";
import { LanguageType } from "@/interfaces/posts";
import { Post as PostLayout } from "@/templates/Post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: LanguageType }>;
}) {
  const { locale, id } = await params;
  const post = await getPostById(id);

  return {
    title: {
      default: post?.title?.[locale],
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
