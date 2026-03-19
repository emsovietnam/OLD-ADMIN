import Hls from 'hls.js';
import Plyr from 'plyr';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import './videojs.css';
const VideoJs = props => {
  const {
    src,
    id,
    typePage,
    isClickAction,
    visibleVideo,
    idViewPort,
    action,
    isLiveStream,
    processingLiveStream,
    type,
    autoPlay,
    typeLive,
    styleJs
  } = props;
  const ref: any = React.useRef();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const numberRandom = Math.floor(Math.random() * 1000000000);
  let query = useQuery();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const [playing, setPlaying] = React.useState(false);

  const handleEnded = () => {
    setPlaying(false);
  };

  const isOtherVideoPlaying = (vd: any) => {
    const videos = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
      if (videos[i] !== vd && !videos[i].paused) {
        return true;
      }
    }
    return false;
  };

  const stopOtherVideos = (vd: any) => {
    const videos = document.getElementsByTagName('video');
    for (let i = 0; i < videos.length; i++) {
      if (videos[i] !== vd && !videos[i].paused) {
        videos[i].pause();
      }
    }
  };
  const optionNormal = {
    i18n: {
      play: 'Phát',
      pause: 'Dừng',
      volume: 'Âm lượng',
      mute: 'Tắt tiếng',
      enterFullscreen: 'Toàn màn hình',
      exitFullscreen: 'Thoát toàn màn hình',
      speed: 'Tốc độ',
      normal: 'Thường',
      quality: 'Chất lượng',
      loop: 'Phát lại'
    },
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
    }
  };
  const styleDivRoot = {
    top: '5px',
    left: '5px',
    zIndex: '10',
    display: 'flex'
  };
  const styleDivChildLive = {
    backgroundColor: '#c6213d',
    color: '#fff',
    padding: '4px',
    borderRadius: '5px',
    fontSize: '13px',
    fontWeight: '500',
    marginRight: '5px'
  };
  const styleDivChildSeen = {
    backgroundColor: '#5b5962',
    color: '#fff',
    padding: '4px',
    borderRadius: '5px',
    fontSize: '13px',
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const defaultOptions: any =
    isLiveStream || autoPlay
      ? {
          controls: [
            'play',
            'mute',
            'volume',
            'captions',
            'settings',
            'fullscreen'
          ],
          ...optionNormal
        }
      : optionNormal;

  const updateQualitySelector = (hls, data) => {
    const availableQualities = hls.levels.map(l => l.height);
    availableQualities.unshift(0);

    defaultOptions.quality = {
      default: 0,
      options: availableQualities,
      forced: true,

      onChange: newQuality => {
        if (newQuality === 0) {
          hls.currentLevel = -1;
        } else {
          hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              hls.currentLevel = levelIndex;
            }
          });
        }
      }
    };
    defaultOptions.i18n = {
      ...defaultOptions.i18n,
      qualityLabel: {
        0: 'Tự động'
      }
    };

    hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
      var span: any = document.querySelector(
        ".plyr__menu__container [data-plyr='quality'][value='0'] span"
      );
      if (span) {
        if (hls.autoLevelEnabled) {
          span.innerHTML = `Tự động (${hls.levels[data.level].height}p)`;
        } else {
          span.innerHTML = `Tự động`;
        }
      }
    });

    return defaultOptions;
  };

  React.useEffect(() => {
    if (src?.includes('m3u8')) {
      let hls = new Hls();
      if (Hls.isSupported()) {
        var video: any = document.querySelector(
          type === 'watch-selected'
            ? `#video${type}${numberRandom}${id}${typePage}`
            : `#video${numberRandom}${id}${typePage}`
        );

        hls.loadSource(src);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          const player = new Plyr(video, updateQualitySelector(hls, data));

          hls.attachMedia(video);
          if (typePage === 'preview-video') {
            player.play();
          }
          if (isClickAction) {
            player.pause();
          }
        });
      }
    } else {
      const players = Plyr.setup('.js-player', defaultOptions);
    }

    if (type === 'watch-selected') {
      let listPlyr = {
        quality: 0,
        volume: 1,
        muted: false
      };
      localStorage.setItem('plyr', JSON.stringify(listPlyr));
    } else {
      let listPlyr = {
        quality: 0,
        volume: 1,
        muted: true
      };
      localStorage.setItem('plyr', JSON.stringify(listPlyr));
    }

    return () => {};
  }, [src, isClickAction, match.path, type]);

  React.useEffect(() => {
    if (visibleVideo) {
      let tempVideo: any;
      let videoDOM: any = document.getElementsByClassName('visibleVideo');
      if (videoDOM.length > 0) {
        if (query.get('v')) {
          tempVideo = videoDOM.length - 1;
        } else {
          tempVideo = 0;
        }
        videoDOM[tempVideo]?.play();
        if (isOtherVideoPlaying(videoDOM[tempVideo])) {
          stopOtherVideos(videoDOM[tempVideo]);
        }
        const intervalId = setInterval(() => {
          if (!videoDOM[tempVideo]?.paused) {
            // dispatch(timePlayAction(videoDOM[tempVideo]?.currentTime));
          }
        }, 3000);
        return () => clearInterval(intervalId);
      }
    } else {
      const videos = document.getElementsByTagName('video');
      for (let i = 0; i < videos.length; i++) {
        if (!videos[i].paused) {
          videos[i].pause();
        }
      }
    }
  }, [visibleVideo, JSON.stringify(query.get('v'))]);
  React.useEffect(() => {
    if (idViewPort === id) {
      let listOverlay = document.getElementsByClassName('plyr__video-wrapper');
      let overlayClick = Array.from(listOverlay).find((el: any) =>
        el.children[0].id.includes(idViewPort)
      );
      if (overlayClick) {
        overlayClick.addEventListener('click', () => {
          if (query.get('v') === null) {
            // dispatch(watchSaveTimeRun(ref?.current));
          }
          if (typePage === 'preview-watch' && ref?.current?.paused === true) {
            // dispatch(timePlayAction(ref?.current?.currentTime));
          }
          action && action();
        });
      }
    }
    return () => {};
  }, [ref, idViewPort]);

  const renderVideo = () => {
    return (
      <>
        <video
          ref={ref}
          style={
            typePage === 'preview-video'
              ? match.path.includes('watch')
                ? { width: '100%', maxHeight: 'calc(100vh * 0.75 - 50px)' }
                : { width: '100%', maxHeight: 'calc(100vh - 56px)' }
              : {
                  width: '100%',
                  maxHeight:
                    type === 'watch-selected'
                      ? '600px'
                      : type === 'preview-inBoxChat'
                      ? '200px'
                      : typePage === 'video_course'
                      ? '482px'
                      : typePage === 'preview_livehost'
                      ? '420px'
                      : typeLive
                      ? '100%'
                      : '400px',
                  position: 'relative'
                }
          }
          id={
            type === 'watch-selected'
              ? `video${type}${numberRandom}${id}${typePage}`
              : `video${numberRandom}${id}${typePage}`
          }
          // onLoadedMetadata={handleVideoLoaded}
          // onPlay={handlePlay}
          onEnded={handleEnded}
          className={visibleVideo ? 'js-player visibleVideo' : 'js-player'}
          controls
          autoPlay={autoPlay ?? false}
          preload="none"
          onClick={() => {
            action && action();
          }}
        >
          <source src={src} />
        </video>{' '}
      </>
    );
  };
  return isLiveStream && processingLiveStream !== 'ended_live' ? (
    <div style={{ position: 'relative' }}>
      <div style={{ ...styleDivRoot, position: 'absolute' }}>
        <div style={styleDivChildLive}>TRỰC TIẾP</div>
        <div style={styleDivChildSeen}>
          <i
            className="fa-light fa-eye"
            style={{ color: '#fff', marginRight: '2px' }}
          ></i>
          <div>2,6k</div>
        </div>
      </div>
      {renderVideo()}
    </div>
  ) : (
    renderVideo()
  );
};

export default VideoJs;
