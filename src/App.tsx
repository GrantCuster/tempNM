import { useAtom } from "jotai";
import { LoadingSegmenterAtom, VideoAtom, VideoLoadedAtom } from "./atoms";
import { Mask } from "./Mask";
import { Settings } from "./Settings";
import { useEffect, useRef } from "react";

function App() {
  return (
    <div className="w-full relative h-[100dvh] overflow-hidden pointer-events-none">
      <Mask />
      <VideoPlayer />
      <Settings />
      <Loading />
    </div>
  );
}

export default App;

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [, setVideo] = useAtom(VideoAtom);
  const [, setVideoLoaded] = useAtom(VideoLoadedAtom);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setVideo(videoRef.current);
        setVideoLoaded(true);
      };
      videoRef.current.src = "/hod.webm";
    }
  }, []);

  return <video className="absolute bottom-0 right-0 w-64" muted playsInline ref={videoRef} />;
}

function Loading() {
  const [loadingSegmenter] = useAtom(LoadingSegmenterAtom);

  return loadingSegmenter ? (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-60">
      <div className="text-lg text-neutral-100 animate-bounce">
        Loading segmenter...
      </div>
    </div>
  ) : null;
}
