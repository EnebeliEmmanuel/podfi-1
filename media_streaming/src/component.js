// src/RoomComponent.js
import React from 'react';
import { useRoom, useRoomControls, usePeerIds, useLocalPeer, useRemotePeer, useLocalVideo, useLocalAudio } from '@huddle01/react/hooks';

const RoomComponent = () => {
  const room = useRoom();
  const { muteMicrophone, unmuteMicrophone, muteCamera, unmuteCamera } = useRoomControls();
  const peerIds = usePeerIds();
  const localPeer = useLocalPeer();
  const remotePeers = useRemotePeer();
  
  const { stream: localVideoStream, isVideoOn, enableVideo, disableVideo } = useLocalVideo();
  const { stream: localAudioStream, isAudioOn, enableAudio, disableAudio } = useLocalAudio();

  // Function to toggle video on/off
  const handleVideo = async () => {
    if (isVideoOn) {
      await disableVideo();
    } else {
      await enableVideo();
    }
  };

  // Function to toggle audio on/off
  const handleAudio = async () => {
    if (isAudioOn) {
      await disableAudio();
    } else {
      await enableAudio();
    }
  };

  return (
    <div>
      <h2>Room Info</h2>
      <p>Room ID: {room.id}</p>

      <h3>Local Peer</h3>
      <p>Peer ID: {localPeer.id}</p>

      <h3>Remote Peers</h3>
      <ul>
        {remotePeers.map(peer => (
          <li key={peer.id}>Peer ID: {peer.id}</li>
        ))}
      </ul>

      <h3>Peer IDs</h3>
      <ul>
        {peerIds.map(peerId => (
          <li key={peerId}>Peer ID: {peerId}</li>
        ))}
      </ul>

      <div>
        {/* Video Controls */}
        <button onClick={handleVideo}>{isVideoOn ? 'Disable Video' : 'Enable Video'}</button>
        {localVideoStream && <video ref={localVideoStream} autoPlay muted playsInline />}

        {/* Audio Controls */}
        <button onClick={handleAudio}>{isAudioOn ? 'Disable Audio' : 'Enable Audio'}</button>
        {localAudioStream && <audio ref={localAudioStream} autoPlay muted />}
      </div>

      {/* Room Controls */}
      <div>
        <button onClick={muteMicrophone}>Mute Microphone</button>
        <button onClick={unmuteMicrophone}>Unmute Microphone</button>
        <button onClick={muteCamera}>Mute Camera</button>
        <button onClick={unmuteCamera}>Unmute Camera</button>
      </div>
    </div>
  );
};

export default RoomComponent;
