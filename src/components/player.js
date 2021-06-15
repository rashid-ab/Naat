import React from 'react';
import YouTube from 'react-native-youtube';

const Player = ({videoId}) => {
  return (
    <YouTube
      videoId={videoId}
      apiKey="AIzaSyB7NmYtBUTSjhKpARjvVSpZMbImY1iqI1k"
      play={true}
      fullscreen={false}
      loop={false}
      onReady={(e) => console.log('onReady')}
      onChangeState={(e) => console.log('onChangeState:', e.state)}
      onChangeQuality={(e) => console.log('onChangeQuality: ', e.quality)}
      onError={(e) => console.log('onError: ', e.error)}
      style={{width: '100%', height: 300}}
    />
  );
};

export default Player;
