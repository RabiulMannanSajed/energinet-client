export const getEmbedUrl = (url) => {
  try {
    // Extract the video ID from youtu.be or youtube.com
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  } catch {
    return url;
  }
};
