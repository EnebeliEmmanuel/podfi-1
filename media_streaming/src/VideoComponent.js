// src/VideoComponent.js
import React from 'react';
import { Video } from '@huddle01/react/components';
import { useRemoteVideo } from '@huddle01/react/hooks';

const VideoComponent = () => {
  const { stream } = useRemoteVideo();

  return (
    <div>
      {stream && <Video stream={stream} />}
    </div>
  );
};

export default VideoComponent;
