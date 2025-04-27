
import React from 'react';

interface YoutubePlayerProps {
  videoId: string | null;
}

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  if (!videoId) {
    return (
      <div className="youtube-container bg-gray-900 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No video selected</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  return (
    <div className="youtube-container rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
    </div>
  );
};

export default YoutubePlayer;
