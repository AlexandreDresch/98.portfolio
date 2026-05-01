interface PlaylistItemProps {
  item: Track;
  idx: number;
  current: number;
  onClick: (idx: number) => void;
  onRemove: (idx: number) => void;
}

interface VisualizerProps {
  playing: boolean;
}

interface Track {
  id: string;
  title: string;
  duration: number;
}

interface YTPlayer {
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (t: number, allowSeekAhead?: boolean) => void;
  setVolume: (v: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoData: () => { title?: string; video_id?: string };
}

interface VisualizerProps {
  playing: boolean;
}

interface PlaylistItemProps {
  item: Track;
  idx: number;
  current: number;
  onClick: (idx: number) => void;
  onRemove: (idx: number) => void;
}

interface WBtnProps {
  onClick?: () => void;
  title?: string;
  active?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  small?: boolean;
}
