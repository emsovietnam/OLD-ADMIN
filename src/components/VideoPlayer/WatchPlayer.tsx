import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useInView } from 'react-hook-inview';
import VideoJs from './VideoJs';

const WatchPlayer = props => {
  const { video, action, typePage, style, typeWatch, typeLive } = props;
  const [visibleVideo, setVisibleVideo] = React.useState(false);
  const [isClickAction, setIsClickAction] = React.useState(false);
  const [idViewPort, setIdViewPort] = React.useState(null as any);
  const [ref, isVisible] = useInView({
    threshold: 1
  });

  const useStyles = makeStyles((theme: Theme) => ({
    wrapPlayer: {
      display: 'flex',
      width: '100%',
      height: 'calc(100% - 45px)',
      position: 'relative',
      justifyContent: 'center',
      '&>.plyr': {
        width: '100%',
        ...style
      }
    },
    videoPlayer: {
      display: 'flex',
      width: '100%',
      position: 'relative',
      justifyContent: 'center',
      cursor: 'pointer',
      '&>.plyr': {
        width: '100%',
        ...style
      }
    }
  }));
  const classes = useStyles();
  let src = video?.remote_url ?? video?.url;

  React.useEffect(() => {
    if (isVisible) {
      setIdViewPort(video?.id);
      setVisibleVideo(true);
    } else {
      setVisibleVideo(false);
      setIdViewPort(null);
    }

    return () => {
      setIdViewPort(null);
    };
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={classes.wrapPlayer}
      style={{
        height:
          typePage === 'preview_live'
            ? 'calc(100% - 110px)'
            : 'calc(100% - 45px)',
        alignItems: typePage === 'preview_live' ? 'unset' : ' center'
      }}
    >
      <div className={classes.videoPlayer} style={{ ...style }}>
        <VideoJs
          src={src}
          id={video?.id}
          action={action}
          idViewPort={idViewPort}
          typePage={typePage}
          visibleVideo={visibleVideo}
          isClickAction={isClickAction}
          type={typeWatch}
          typeLive={typeLive}
        />
      </div>
    </div>
  );
};

export default WatchPlayer;
