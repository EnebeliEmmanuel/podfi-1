// src/AudioComponent.js
import React from 'react';
import { Audio } from '@huddle01/react/components';
import { useRemoteAudio } from '@huddle01/react/hooks';

const AudioComponent = () => {
  const { stream } = useRemoteAudio();

  return (
    <div>
      {stream && <Audio stream={stream} />}
    </div>
  );
};

export default AudioComponent;
