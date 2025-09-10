type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title} // Set the title for accessibility purposes
        className="absolute top-0 left-0 h-full w-full rounded-sm"
        loading="lazy"
      />
    </div>
  );
}
