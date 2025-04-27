
/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export const extractVideoId = (url: string): string | null => {
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }
  
  return null;
};

/**
 * Creates an embed URL from a YouTube video ID
 */
export const createEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
};

/**
 * Validates if a string is a valid YouTube URL
 */
export const isValidYoutubeUrl = (url: string): boolean => {
  return !!extractVideoId(url);
};

/**
 * Parses YouTube URLs from text content (from file or pasted text)
 */
export const parseUrlsFromText = (text: string): string[] => {
  const lines = text.split('\n');
  return lines
    .map(line => line.trim())
    .filter(line => line && isValidYoutubeUrl(line));
};
