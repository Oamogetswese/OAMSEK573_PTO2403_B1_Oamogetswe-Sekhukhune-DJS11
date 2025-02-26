import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({ src }) => {
  return (
    <div>
      <ReactAudioPlayer
        src={src}
        controls
        autoPlay
      />
    </div>
  );
};

export default AudioPlayer;