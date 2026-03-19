import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Grid, Typography, Box, Avatar } from '@mui/material';
import VideoPlayer from 'src/components/VideoPlayer/WatchPlayer';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMeasure } from 'react-use';

const useStyles = makeStyles(theme => ({
  title: {
    color: 'white',
    fontSize: '40px !important',
    fontWeight: '600 !important',
    textAlign: 'center',
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  button: {
    '&:hover': {
      cursor: 'pointer'
    },
    height: '100%'
  },
  image: {
    height: '100%'
  }
}));
const PictureGrid = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    setMediaSelected,
    images,
    medias,
    setIndexMedia,
    type,
    post,
    typePost,
    scrollToTop,
    postShare
  } = props;
  const result = useSelector(state => state?.socialPostReducer?.activities);

  const theme = useTheme();
  const [refImg, { width }] = useMeasure();
  const isAVideo = path => {
    if (!path) return;
    if (
      path?.includes('.mp4') ||
      path?.includes('.mov') ||
      path?.includes('m3u8')
    ) {
      return true;
    }

    return false;
  };

  const hasAVideo = paths => {
    var hasVideo = false;
    paths.map(path => {
      if (
        path.includes('.mp4') ||
        path.includes('.mov') ||
        path.includes('m3u8')
      ) {
        hasVideo = true;
      }
    });

    return hasVideo;
  };
  const filterVideoPost = paths => {
    return paths.filter(item => isAVideo(item));
  };

  const renderWatch = (video, action, width, height, isAutoPlay) => {
    return (
      <VideoPlayer
        video={video}
        videoPost={post}
        action={action}
        typePage="preview-watch"
        type={type}
        style={{ width: width, height: height }}
        isAutoPlay={isAutoPlay}
      />
    );
  };

  const displayImage = images => {
    if (images) {
      if (images.length === 1) {
        if (isAVideo(images[0])) {
          // dispatch(dataActivity(result));
          return (
            <Grid container direction="row" justify="center" height="100%">
              {renderWatch(
                medias[0],
                () => {
                  if (post.page && post.page.id) {
                    // dispatch(postSelectedAction(post));
                    if (type === 'watch-search') {
                      history.push(`/watch?v=${post.content}`);
                    } else {
                      history.push(`/watch?v=${medias[0].id}`);
                      scrollToTop();
                    }
                  } else {
                    setMediaSelected && setMediaSelected(medias[0].id);
                  }
                },
                '100%',
                medias[0].meta?.small?.aspect < 1 ? '650px' : 'auto',
                true
              )}

              {/* <video
                className={classes.button}
                onClick={() =>
                  setMediaSelected && setMediaSelected(medias[0].id)
                }
                style={{ backgroundColor: medias[0].meta?.small?.average_color }}
                width={'100%'}
                height={medias[0].meta?.small?.aspect < 1 ? '650' : 'auto'}
                src={images[0]}
                controls
              /> */}
            </Grid>
          );
        } else {
          return (
            <div
              className={classes.button}
              container
              justify="center"
              style={
                medias[0].meta?.original?.aspect < 1 && !post.in_reply_to_id
                  ? {
                      backgroundColor: `${medias[0].meta?.original?.average_color}`,
                      maxHeight: 700,
                      width: '100%',
                      padding: typePost === 'pinned' ? '0px' : '0px 100px',
                      overflow: 'hidden'
                    }
                  : {}
              }
              onClick={() => setMediaSelected && setMediaSelected(medias[0].id)}
            >
              <img
                style={{
                  marginBottom: -6,
                  borderRadius: post.in_reply_to_id
                    ? 15
                    : postShare
                    ? '10px 10px 0px 0px'
                    : 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                src={images[0]}
                alt="images"
              />
            </div>
          );
        }
      } else if (images.length === 2) {
        if (hasAVideo(images)) {
          return (
            <Grid spacing={0.5} container height="100%">
              {typePost === 'pinned' ? (
                <Grid item md={12} lg={12} xl={12} xs={12} sm={12}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                      },
                      '100%',
                      medias[0]?.meta?.small?.aspect < 1 ? 650 : 360,
                      filterVideoPost(images)[0] === images[0]
                    )}
                  </Grid>
                </Grid>
              ) : (
                images.map((image, index) => {
                  if (isAVideo(image)) {
                    return (
                      <Grid key={index} item md={6} lg={6} xl={6} xs={6} sm={6}>
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          height="100%"
                        >
                          {renderWatch(
                            medias[index],
                            () => {
                              setMediaSelected &&
                                setMediaSelected(medias[index].id);
                            },
                            '100%',
                            medias[0]?.meta?.small?.aspect < 1 &&
                              medias[1]?.meta?.small?.aspect < 1
                              ? 650
                              : 360,
                            filterVideoPost(images)[0] === image
                          )}
                        </Grid>
                      </Grid>
                    );
                  }
                  return (
                    <Grid key={index} item md={6} lg={6} xl={6} xs={6} sm={6}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        style={{
                          backgroundImage: `url(${image}`,
                          width: 'auto',
                          height:
                            medias[0]?.meta?.small?.aspect < 1 &&
                            medias[1]?.meta?.small?.aspect < 1
                              ? 650
                              : 360,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                        className={classes.button}
                        onClick={() => {
                          setMediaSelected &&
                            setMediaSelected(medias[index].id);
                          setIndexMedia && setIndexMedia(index);
                        }}
                      ></Grid>
                    </Grid>
                  );
                })
              )}
            </Grid>
          );
        } else if (medias[0].meta?.original?.aspect < 1.2) {
          return (
            <Grid container>
              {images.map((image, index) => {
                return (
                  <Grid
                    key={index}
                    sx={{ padding: '1px !important' }}
                    item
                    xs={6}
                    ref={refImg}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      style={{
                        backgroundImage: `url(${image})`,
                        width: '100%',
                        height:
                          typePost === 'pinned'
                            ? '300px'
                            : width /
                              (medias[0].meta?.original?.width /
                                medias[0].meta?.original?.height),
                        maxHeight: '600px',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                      className={classes.button}
                      onClick={() => {
                        setMediaSelected && setMediaSelected(medias[index].id);
                        setIndexMedia && setIndexMedia(index);
                      }}
                    ></Grid>
                  </Grid>
                );
              })}
            </Grid>
          );
        } else if (medias[0].meta?.original?.aspect > 1.2) {
          if (medias[1].meta?.original?.aspect > 1.2) {
            return images.map((image, index) => (
              <Grid
                key={index}
                sx={{ padding: '1px !important' }}
                item
                md={12}
                lg={12}
                xl={12}
                xs={12}
                sm={12}
                ref={refImg}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  style={{
                    width: '100%',
                    // height:
                    //   width /
                    //   (medias[index].meta?.original?.width /
                    //     medias[index].meta?.original?.height),
                    overflow: 'hidden',
                    maxHeight: '350px'
                  }}
                  className={classes.button}
                  onClick={() => {
                    setMediaSelected && setMediaSelected(medias[index].id);
                    setIndexMedia && setIndexMedia(index);
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                </Grid>
              </Grid>
            ));
          } else if (medias[1].meta?.original?.aspect < 1.2) {
            return (
              <Grid container md={12} lg={12} xl={12} xs={12} sm={12}>
                {images.map((image, index) => (
                  <Grid
                    key={index}
                    sx={{ padding: '1px !important' }}
                    item
                    md={6}
                    lg={6}
                    xl={6}
                    xs={6}
                    sm={6}
                    ref={refImg}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      style={
                        index === 0 && !post.in_reply_to_id
                          ? {
                              backgroundImage: `url(${image})`,
                              width: '100%',
                              height:
                                typePost === 'pinned'
                                  ? '280px'
                                  : width /
                                    (medias[1].meta?.original?.width /
                                      medias[1].meta?.original?.height),
                              maxHeight: '500px',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }
                          : {
                              backgroundImage: `url(${image})`,
                              width: '100%',
                              height:
                                typePost === 'pinned'
                                  ? '280px'
                                  : width /
                                    (medias[index].meta?.original?.width /
                                      medias[index].meta?.original?.height),
                              maxHeight: '500px',
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }
                      }
                      className={classes.button}
                      onClick={() => {
                        setMediaSelected && setMediaSelected(medias[index].id);
                        setIndexMedia && setIndexMedia(index);
                      }}
                    ></Grid>
                  </Grid>
                ))}
              </Grid>
            );
          } else if (medias[1].meta?.original?.aspect === 1.2) {
            return (
              <Grid container>
                {images.map((image, index) => {
                  return (
                    <Grid
                      key={index}
                      sx={{ padding: '1px !important' }}
                      item
                      xs={6}
                      ref={refImg}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        style={{
                          backgroundImage: `url(${image})`,
                          width: '100%',
                          height: width,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                        className={classes.button}
                        onClick={() => {
                          setMediaSelected &&
                            setMediaSelected(medias[index].id);
                          setIndexMedia && setIndexMedia(index);
                        }}
                      ></Grid>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }
        } else if (medias[0].meta?.original?.aspect === 1.2) {
          return (
            <Grid container>
              {images.map((image, index) => {
                return (
                  <Grid
                    key={index}
                    sx={{ padding: '1px !important' }}
                    item
                    xs={6}
                    ref={refImg}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      style={{
                        backgroundImage: `url(${image})`,
                        width: '100%',
                        height: width,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                      className={classes.button}
                      onClick={() => {
                        setMediaSelected && setMediaSelected(medias[index].id);
                        setIndexMedia && setIndexMedia(index);
                      }}
                    ></Grid>
                  </Grid>
                );
              })}
            </Grid>
          );
        }
      } else if (images.length === 3) {
        if (medias[0].meta?.small?.aspect <= 1) {
          return (
            <Grid container spacing={0.5}>
              <Grid
                sx={{ padding: '1px !important' }}
                item
                md={8}
                lg={8}
                xl={8}
                xs={8}
                sm={8}
              >
                {isAVideo(images[0]) ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                      },
                      '100%',
                      600,
                      true
                    )}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      backgroundImage: `url(${images[0]}`,
                      height: 600,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() =>
                      setMediaSelected && setMediaSelected(medias[0].id)
                    }
                  ></Grid>
                )}
              </Grid>
              <Grid
                sx={{ padding: '1px !important' }}
                item
                md={4}
                lg={4}
                xl={4}
                xs={4}
                sm={4}
              >
                {images.map((image, index) => {
                  if (index != 0) {
                    if (isAVideo(image)) {
                      return (
                        <Grid
                          key={index}
                          item
                          md={12}
                          lg={12}
                          xl={12}
                          xs={12}
                          sm={12}
                        >
                          <Grid container direction="row" justify="center">
                            {renderWatch(
                              medias[index],
                              () => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              },
                              '100%',
                              299,
                              isAVideo(images[0])
                                ? false
                                : filterVideoPost(images)[0] === image
                            )}
                          </Grid>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid
                          key={index}
                          container
                          direction="row"
                          justify="center"
                          style={{
                            backgroundImage: `url(${image}`,
                            width: 'auto',
                            height: 299,
                            marginBottom: 2,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                          className={classes.button}
                          onClick={() => {
                            setMediaSelected &&
                              setMediaSelected(medias[index].id);
                            setIndexMedia && setIndexMedia(index);
                          }}
                        ></Grid>
                      );
                    }
                  }
                })}
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid container spacing={0.5}>
              <Grid
                sx={{ padding: '1px !important' }}
                item
                md={12}
                lg={12}
                xl={12}
                xs={12}
                sm={12}
              >
                {isAVideo(images[0]) ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                        setIndexMedia && setIndexMedia(0);
                      },
                      '100%',
                      400,
                      true
                    )}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      backgroundImage: `url(${images[0]}`,
                      height: 400,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() =>
                      setMediaSelected && setMediaSelected(medias[0].id)
                    }
                  ></Grid>
                )}
              </Grid>
              <Grid
                sx={{ padding: '1px !important' }}
                container
                spacing={0.2}
                item
                md={12}
                lg={12}
                xl={12}
                xs={12}
                sm={12}
              >
                {images.map((image, index) => {
                  if (index != 0) {
                    if (isAVideo(image)) {
                      return (
                        <Grid key={index} item xs={6}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            height="100%"
                          >
                            {renderWatch(
                              medias[index],
                              () => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              },
                              '100%',
                              300,
                              isAVideo(images[0])
                                ? false
                                : filterVideoPost(images)[0] === image
                            )}
                          </Grid>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid key={index} item xs={6}>
                          <Grid
                            key={index}
                            container
                            direction="row"
                            justify="center"
                            style={{
                              backgroundImage: `url(${image}`,
                              width: '100%',
                              height: 299,
                              marginBottom: 2,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                            className={classes.button}
                            onClick={() => {
                              setMediaSelected &&
                                setMediaSelected(medias[index].id);
                              setIndexMedia && setIndexMedia(index);
                            }}
                          ></Grid>
                        </Grid>
                      );
                    }
                  }
                })}
              </Grid>
            </Grid>
          );
        }
      } else if (images.length === 4) {
        if (medias[0].meta?.small?.aspect === 1) {
          return (
            <Grid container spacing={0.3}>
              {images?.map((image, index) => {
                if (isAVideo(image)) {
                  return (
                    <Grid key={index} item xs={6}>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        height="100%"
                      >
                        {renderWatch(
                          medias[index],
                          () => {
                            setMediaSelected &&
                              setMediaSelected(medias[index].id);
                            setIndexMedia && setIndexMedia(index);
                          },
                          '100%',
                          290,
                          filterVideoPost(images)[0] === image
                        )}
                      </Grid>
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={6} key={index}>
                    <Grid
                      style={{
                        backgroundImage: `url(${image}`,
                        height: 290,
                        width: '100%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                      className={classes.button}
                      onClick={() => {
                        setMediaSelected && setMediaSelected(medias[index].id);
                        setIndexMedia && setIndexMedia(index);
                      }}
                      sx={{ padding: '1px !important' }}
                      container
                      direction="row"
                      justify="center"
                    ></Grid>
                  </Grid>
                );
              })}
            </Grid>
          );
        } else if (
          medias[0].meta?.original?.aspect < 1 &&
          medias[0].meta?.original?.aspect >= 0.67 &&
          !hasAVideo(images)
        ) {
          return (
            <Grid
              style={{
                height: 370,
                marginLeft: 6,
                marginRight: 8,
                width: 'calc(100% - 24px)'
              }}
              container
              spacing={1.5}
            >
              {medias?.map((el, index) => (
                <Grid
                  item
                  container
                  alignItems={
                    [0, 2].includes(index) ? 'flex-start' : 'flex-end'
                  }
                  xs={3}
                  key={index}
                >
                  <Grid
                    style={{
                      backgroundImage: `url(${images[index]}`,
                      height: 340,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      borderRadius: 10,
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}
                    className={classes.button}
                    onClick={() => {
                      setMediaSelected && setMediaSelected(medias[index].id);
                      setIndexMedia && setIndexMedia(index);
                    }}
                    sx={{ padding: '1px !important' }}
                    container
                    direction="row"
                    justify="center"
                  ></Grid>
                </Grid>
              ))}
            </Grid>
          );
        } else if (
          medias[0].meta?.small?.aspect > 1 ||
          medias[0].meta?.small?.width / medias[0].meta?.small?.height > 1
        ) {
          return (
            <Grid key={4} container spacing={0.5} height="100%">
              <Grid
                sx={{ padding: '1px !important' }}
                item
                md={12}
                lg={12}
                xl={12}
                xs={12}
                sm={12}
              >
                {isAVideo(images[0]) ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                        setIndexMedia && setIndexMedia(0);
                      },
                      '100%',
                      390,
                      true
                    )}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      backgroundImage: `url(${images[0]}`,
                      // width: 250,
                      height: 400,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() =>
                      setMediaSelected && setMediaSelected(medias[0].id)
                    }
                  ></Grid>
                )}
              </Grid>{' '}
              {typePost !== 'pinned' ? (
                <Grid
                  sx={{ padding: '1px !important' }}
                  item
                  container
                  spacing={0.2}
                  md={12}
                  lg={12}
                  xl={12}
                  xs={12}
                  sm={12}
                >
                  {images.map((image, index) => {
                    if (index != 0) {
                      if (isAVideo(image) && typePost !== 'pinned') {
                        return (
                          <Grid
                            key={index}
                            item
                            md={4}
                            lg={4}
                            xl={4}
                            xs={4}
                            sm={4}
                          >
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              height="100%"
                            >
                              {renderWatch(
                                medias[index],
                                () => {
                                  setMediaSelected &&
                                    setMediaSelected(medias[index].id);
                                  setIndexMedia && setIndexMedia(index);
                                },
                                '100%',
                                199,
                                isAVideo(images[0])
                                  ? false
                                  : filterVideoPost(images)[0] === image
                              )}
                            </Grid>
                          </Grid>
                        );
                      }
                      return (
                        <Grid key={index} item xs={4}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            style={{
                              backgroundImage: `url(${image}`,
                              width: '100%',
                              height: 199,
                              marginBottom: 2,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                            className={classes.button}
                            onClick={() => {
                              setMediaSelected &&
                                setMediaSelected(medias[index].id);
                              setIndexMedia && setIndexMedia(index);
                            }}
                          ></Grid>
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              ) : null}
            </Grid>
          );
        } else {
          return (
            <Grid key={4} container spacing={0.5}>
              {isAVideo(images[0]) ? (
                <Grid sx={{ padding: '1px !important' }} item xs={8}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                        setIndexMedia && setIndexMedia(0);
                      },
                      '100%',
                      600,
                      true
                    )}
                  </Grid>
                </Grid>
              ) : (
                <Grid sx={{ padding: '1px !important' }} item xs={8}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{
                      backgroundImage: `url(${images[0]}`,
                      // width: 250,
                      height: 600,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() =>
                      setMediaSelected && setMediaSelected(medias[0].id)
                    }
                  ></Grid>
                </Grid>
              )}

              <Grid sx={{ padding: '1px !important' }} item xs={4}>
                {images.map((image, index) => {
                  if (index != 0) {
                    if (isAVideo(image)) {
                      return (
                        <Grid key={index} item xs={12}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            height="100%"
                          >
                            {renderWatch(
                              medias[index],
                              () => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              },
                              '100%',
                              199,
                              isAVideo(images[0])
                                ? false
                                : filterVideoPost(images)[0] === image
                            )}
                          </Grid>
                        </Grid>
                      );
                    }
                    return (
                      <Grid
                        key={index}
                        container
                        direction="row"
                        justify="center"
                        style={{
                          backgroundImage: `url(${image}`,
                          width: 'auto',
                          height: 199,
                          marginBottom: 2,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                        className={classes.button}
                        onClick={() => {
                          setMediaSelected &&
                            setMediaSelected(medias[index].id);
                          setIndexMedia && setIndexMedia(index);
                        }}
                      ></Grid>
                    );
                  }
                })}
              </Grid>
            </Grid>
          );
        }
      } else {
        if (medias[0]?.meta?.small?.aspect > 1) {
          if (typePost === 'pinned') {
            return (
              <Grid item md={12} lg={12} xl={12} xs={12} sm={12} height="100%">
                <Grid container direction="row" justify="center" height="100%">
                  {renderWatch(
                    medias[0],
                    () => {
                      setMediaSelected && setMediaSelected(medias[0].id);
                    },
                    '100%',
                    medias[0]?.meta?.small?.aspect < 1 ? 650 : 360,
                    filterVideoPost(images)[0] === images[0]
                  )}
                </Grid>
              </Grid>
            );
          } else {
            return (
              <Grid spacing={0.1} container>
                <Grid spacing={0.2} container item xs={6}>
                  {[0, 1]?.map(el => (
                    <Grid key={el} item xs={12}>
                      {isAVideo(images[el]) ? (
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          height="100%"
                        >
                          {renderWatch(
                            medias[el],
                            () => {
                              setMediaSelected &&
                                setMediaSelected(medias[el].id);
                              setIndexMedia && setIndexMedia(el);
                            },
                            '100%',
                            350,
                            filterVideoPost([images])[0] === images[el]
                          )}
                        </Grid>
                      ) : (
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          sx={{ padding: '1px !important' }}
                          style={{
                            width: '100%',
                            backgroundImage: `url(${images[el]}`,
                            height: 350,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                          className={classes.button}
                          onClick={() => {
                            setMediaSelected && setMediaSelected(medias[el].id);
                            setIndexMedia && setIndexMedia(el);
                          }}
                        ></Grid>
                      )}
                    </Grid>
                  ))}
                </Grid>
                <Grid container item xs={6}>
                  {images.map((image, index) => {
                    if (index >= 2 && index <= 3) {
                      return (
                        <Grid
                          key={index}
                          sx={{ padding: '1px !important' }}
                          item
                          xs={12}
                        >
                          {isAVideo(images[index]) ? (
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              height="100%"
                            >
                              {renderWatch(
                                medias[index],
                                () => {
                                  setMediaSelected &&
                                    setMediaSelected(medias[index].id);
                                  setIndexMedia && setIndexMedia(index);
                                },
                                '100%',
                                232,
                                isAVideo(images[0]) || isAVideo(images[1])
                                  ? false
                                  : filterVideoPost(images)[0] === image
                              )}
                            </Grid>
                          ) : (
                            <Grid
                              container
                              direction="row"
                              justify="center"
                              style={{
                                backgroundImage: `url(${image}`,
                                width: '100%',
                                height: 232,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center'
                              }}
                              className={classes.button}
                              onClick={() => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              }}
                            ></Grid>
                          )}
                        </Grid>
                      );
                    } else if (index === 4) {
                      return (
                        <Grid key={index} item xs={12}>
                          {isAVideo(images[index]) ? (
                            <Grid
                              style={{ position: 'relative' }}
                              container
                              direction="row"
                              justify="center"
                              height="100%"
                            >
                              {renderWatch(
                                medias[index],
                                () => {
                                  setMediaSelected &&
                                    setMediaSelected(medias[index].id);
                                  setIndexMedia && setIndexMedia(index);
                                },
                                '100%',
                                232,
                                hasAVideo([
                                  images[0],
                                  images[1],
                                  images[2],
                                  images[3]
                                ])
                                  ? false
                                  : true
                              )}

                              {images.length - index - 1 ? (
                                <Typography
                                  style={{
                                    position: 'absolute',
                                    top: 75
                                  }}
                                  className={classes.title}
                                  onClick={() => {
                                    setMediaSelected &&
                                      setMediaSelected(medias[index].id);
                                    setIndexMedia && setIndexMedia(index);
                                  }}
                                >
                                  +{images.length - index - 1}
                                </Typography>
                              ) : null}
                            </Grid>
                          ) : (
                            <Grid
                              container
                              sx={{ padding: '1px !important' }}
                              direction="row"
                              justify="center"
                              alignItems="center"
                              style={{
                                background: 'gray',
                                width: '100%',
                                height: 232,
                                cursor: 'pointer',

                                backgroundImage: `url(${images[index]})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'none'
                              }}
                              className={classes.button}
                              onClick={() => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              }}
                            >
                              {images.length - index - 1 ? (
                                <Typography className={classes.title}>
                                  +{images.length - index - 1}
                                </Typography>
                              ) : null}
                            </Grid>
                          )}
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Grid>
              </Grid>
            );
          }
        } else {
          return (
            <Grid spacing={0.2} container>
              <Grid item xs={6}>
                {isAVideo(images[0]) ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[0],
                      () => {
                        setMediaSelected && setMediaSelected(medias[0].id);
                      },
                      '100%',
                      350,
                      true
                    )}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    sx={{ padding: '1px !important' }}
                    style={{
                      backgroundImage: `url(${images[0]}`,
                      height: 350,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() =>
                      setMediaSelected && setMediaSelected(medias[0].id)
                    }
                  ></Grid>
                )}
              </Grid>{' '}
              <Grid item xs={6}>
                {isAVideo(images[1]) ? (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    height="100%"
                  >
                    {renderWatch(
                      medias[1],
                      () => {
                        setMediaSelected && setMediaSelected(medias[1].id);
                        setIndexMedia && setIndexMedia(1);
                      },
                      '100%',
                      350,
                      isAVideo(images[0]) ? false : true
                    )}
                  </Grid>
                ) : (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    sx={{ padding: '1px !important' }}
                    style={{
                      backgroundImage: `url(${images[1]}`,
                      height: 350,
                      paddingRight: 5,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                    className={classes.button}
                    onClick={() => {
                      setMediaSelected && setMediaSelected(medias[1].id);
                      setIndexMedia && setIndexMedia(1);
                    }}
                  ></Grid>
                )}
              </Grid>
              <Grid spacing={0.2} container item xs={12}>
                {images.map((image, index) => {
                  if (index >= 2 && index <= 3) {
                    return (
                      <Grid
                        key={index}
                        sx={{ padding: '1px !important' }}
                        item
                        xs={4}
                      >
                        {isAVideo(images[index]) ? (
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            height="100%"
                          >
                            {renderWatch(
                              medias[index],
                              () => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              },
                              '100%',
                              200,
                              isAVideo(images[0]) || isAVideo(images[1])
                                ? false
                                : filterVideoPost([images[2], images[3]])[0] ===
                                    image
                            )}
                          </Grid>
                        ) : (
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            style={{
                              backgroundImage: `url(${image}`,
                              width: 'auto',
                              height: 200,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                            }}
                            className={classes.button}
                            onClick={() => {
                              setMediaSelected &&
                                setMediaSelected(medias[index].id);
                              setIndexMedia && setIndexMedia(index);
                            }}
                          ></Grid>
                        )}
                      </Grid>
                    );
                  } else if (index === 4) {
                    return (
                      <Grid key={index} item xs={4}>
                        {isAVideo(images[4]) ? (
                          <Grid
                            style={{ position: 'relative' }}
                            container
                            direction="row"
                            justify="center"
                            height="100%"
                          >
                            {renderWatch(
                              medias[4],
                              () => {
                                setMediaSelected &&
                                  setMediaSelected(medias[index].id);
                                setIndexMedia && setIndexMedia(index);
                              },
                              '100%',
                              200,
                              hasAVideo([
                                images[0],
                                images[1],
                                images[2],
                                images[3]
                              ])
                                ? false
                                : true
                            )}

                            {images.length - index - 1 ? (
                              <Typography
                                style={{
                                  position: 'absolute',
                                  top: 70
                                }}
                                className={classes.title}
                              >
                                +{images.length - index - 1}
                              </Typography>
                            ) : null}
                          </Grid>
                        ) : (
                          <Grid
                            container
                            sx={{ padding: '1px !important' }}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{
                              background: 'gray',
                              width: 'auto',
                              height: 200,
                              cursor: 'pointer',

                              backgroundImage: `url(${images[index]})`,
                              backgroundSize: 'cover',
                              backgroundRepeat: 'none'
                            }}
                            className={classes.button}
                            onClick={() => {
                              setMediaSelected &&
                                setMediaSelected(medias[index].id);
                              setIndexMedia && setIndexMedia(index);
                            }}
                          >
                            {images.length - index - 1 ? (
                              <Typography className={classes.title}>
                                +{images.length - index - 1}
                              </Typography>
                            ) : null}
                          </Grid>
                        )}
                      </Grid>
                    );
                  } else {
                    return null;
                  }
                })}
              </Grid>
            </Grid>
          );
        }
      }
    }
  };

  const displayAvatar = images => {
    return (
      <Box
        sx={{
          height: 460,
          position: 'relative',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => setMediaSelected && setMediaSelected(medias[0].id)}
      >
        {post?.page?.banner?.show_url ? (
          <div
            style={{
              backgroundImage: `url(${
                post.page.banner.show_url ??
                '../src/assets/images/group_cover1.png'
              })`,

              height: 250,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        ) : post?.account?.banner?.show_url ? (
          <div
            style={{
              backgroundImage: `url(${
                post.account.banner.show_url ?? post.account.banner.preview_url
              })`,
              height: 250,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        ) : (
          <div
            style={{ height: 250, backgroundColor: 'rgba(0,0,0,0.2)' }}
          ></div>
        )}

        <div
          style={{
            position: 'absolute',
            top: 30,
            left: 0,
            width: '100%',
            height: 430,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Avatar
            alt=""
            src={post.media_attachments[0]}
            sx={{ width: 320, height: 320 }}
          />
        </div>
      </Box>
    );
  };

  return (
    <div
      style={{
        width: postShare ? '95%' : '100%',
        height: type === 'scheduled_action' ? 'auto' : '100%'
      }}
    >
      {displayImage(images) != null && (
        <div
          className={classes.image}
          style={{
            borderTop:
              medias[0]?.meta?.original?.aspect < 1 &&
              medias[0]?.meta?.original?.aspect >= 0.67
                ? 'unset'
                : '1px solid #d2d2d2',
            borderBottom:
              medias[0]?.meta?.original?.aspect < 1 &&
              medias[0]?.meta?.original?.aspect >= 0.67
                ? 'unset'
                : '1px solid #d2d2d2'
          }}
        >
          {['account_avatar', 'page_avatar'].includes(post.post_type)
            ? displayAvatar(images)
            : medias[0]?.url.slice(-3) !== 'glb'
            ? displayImage(images)
            : null}
        </div>
      )}
    </div>
  );
};

export default React.memo(PictureGrid);
