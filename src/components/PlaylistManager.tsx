
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { extractVideoId, isValidYoutubeUrl } from '@/utils/youtubeUtils';
import { toast } from 'sonner';

interface PlaylistManagerProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const PlaylistManager: React.FC<PlaylistManagerProps> = ({ urls, onUrlsChange }) => {
  const [newUrl, setNewUrl] = useState('');

  const handleUrlAdd = () => {
    if (!isValidYoutubeUrl(newUrl)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    if (urls.includes(newUrl)) {
      toast.error("This URL is already in your playlist");
      return;
    }

    onUrlsChange([...urls, newUrl]);
    setNewUrl('');
    toast.success("Song added to playlist");
  };

  const handleUrlRemove = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    onUrlsChange(newUrls);
    toast.success("Song removed from playlist");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlAdd();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Playlist</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste a YouTube URL"
          className="flex-1"
        />
        <Button 
          onClick={handleUrlAdd}
          className="bg-neon-purple hover:bg-neon-purple/80"
        >
          Add
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto p-2">
        {urls.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Your playlist is empty. Add some YouTube videos!
          </p>
        ) : (
          urls.map((url, index) => {
            const videoId = extractVideoId(url);
            return (
              <div 
                key={index}
                className="flex justify-between items-center p-2 bg-secondary rounded-md"
              >
                <div className="truncate flex-1 pr-2">
                  <span className="mr-2 text-neon-purple font-bold">{index + 1}.</span>
                  {videoId ? (
                    <span className="text-sm">{videoId}</span>
                  ) : (
                    <span className="text-red-400 text-sm">Invalid URL</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUrlRemove(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlaylistManager;
