// pages/_app.js
import React from 'react';

import { HuddleClient, HuddleProvider } from '@huddle01/react';
import { Toaster } from 'react-hot-toast';
import RoomComponent from '../src/component'; 
import SearchComponent from '../src/SearchComponent'; 
import AudioComponent from '../src/AudioComponent'; 
import VideoComponent from '../src/VideoComponent'; 

// Initialize HuddleClient
const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});

const App = ({ Component, pageProps }) => {
  return (
    <>
 
        <title>PodFi</title>
     
      <HuddleProvider client={huddleClient}>
        <Toaster position="bottom-right" />
        <div>
          <RoomComponent />
          <SearchComponent />
          <AudioComponent />
          <VideoComponent />
        </div>
        <Component {...pageProps} />
      </HuddleProvider>
    </>
  );
};

export default App;
