import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HideImageIcon from '@mui/icons-material/HideImage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Skeleton,
  useMediaQuery
} from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { makeStyles } from '@mui/styles';
import parse from 'html-react-parser';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import ButtonOptions from 'src/components/Button/ButtonOptions';
import ImageRender from 'src/components/ImageGrid/components/ImageRender';
import { handleTimeShow } from 'src/helpers/string';
import { getPostRequestAction } from 'src/store/action/socialPostAction';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '65px',
    height: 'calc(100% - 75px)',
    overflowY: 'scroll',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: '20px'
  },
  text: {
    fontSize: '15px !important',
    fontWeight: '600 !important'
  },
  textCategories: {
    color: 'rgba(0,0,0,0.37)',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  textCategoriesValue: {
    color: '#050505',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  itemFlex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  boxOrder: {
    marginTop: '20px',
    border: '1px solid #ccc',
    width: '60%',
    maxWidth: '1080px'
  },
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },
  buttonAction: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default function BasicTable(props) {
  const { refScroll } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const match: any = useRouteMatch();
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = React.useState<any>(false);
  const [rowSelected, setRowSelected] = React.useState<any>(null);
  let activities =
    useSelector((state: any) => state.socialPostReducer?.activities) || [];
  let hasMore = useSelector((state: any) => {
    return state.socialPostReducer?.hasMore;
  });

  const [type, setType] = React.useState<any>(null);

  const matches = useMediaQuery('(min-width:1600px)');

  React.useEffect(() => {
    dispatch(
      getPostRequestAction(
        {
          limit: 3
        },
        'stream_home'
      )
    );
  }, []);

  const loadActivity = React.useCallback(
    (maxId, limit) => {
      dispatch(
        getPostRequestAction(
          {
            max_id: maxId,
            limit
          },
          'stream_home'
        )
      );
    },
    [dispatch]
  );

  const funcLoad = (limit = 3) => {
    let postLast = [...activities].pop();
    let maxId = postLast?.score ?? postLast?.id;

    loadActivity(maxId, limit);
  };

  React.useEffect(() => {
    if (!activities.length) {
      funcLoad();
    }
  }, [activities.length]);

  const iconStyle = { fontSize: '20px' };

  const listOptions = [
    {
      id: 'edit',
      label: 'Sửa',
      icon: <TaskAltIcon />,
      styleIcon: iconStyle,
      action: () => {
        setType(rowSelected?.id);
      }
    },
    {
      id: 'hide',
      label: 'Ẩn',
      icon: <HideImageIcon />,
      styleIcon: iconStyle,
      action: () => {
        // setOpenDialogConfirmDelete(true);
      }
    },
    {
      id: 'delete',
      label: 'Xóa',
      icon: <DeleteForeverIcon />,
      styleIcon: iconStyle,
      action: () => {}
    }
  ];

  const loaderProduct = () => {
    return (
      <Box
        className={classes.itemFlex}
        sx={{
          marginTop: '20px'
        }}
      >
        <Grid
          item
          container
          xl={11}
          lg={11}
          md={11}
          sm={11}
          sx={{ flexDirection: 'column', marginLeft: '10px' }}
        >
          <Skeleton sx={{ marginBottom: '16px', borderRadius: 'unset' }} />
          <Skeleton sx={{ borderRadius: ' unset' }} animation="wave" />
        </Grid>
        <Grid item container xl={1} lg={1} md={1} sm={1}>
          <Skeleton variant="rectangular" width={80} height={70} />
        </Grid>
      </Box>
    );
  };

  function formatHashtags(str) {
    if (str !== '') {
      const regex = /#(\S+)/g;
      const replacedText = str.replace(regex, '<strong>#$1</strong>');
      return <span dangerouslySetInnerHTML={{ __html: replacedText }} />;
    } else {
      return str;
    }
  }

  const getBody = post => {
    let newText = post?.content ? post.content : '';
    let tags = post?.tags;
    if (tags && tags.length) {
      return post.post_type === 'moment' ? parse(newText) : newText;
    }

    return post.post_type === 'moment' ? formatHashtags(newText) : newText;
  };

  const renderManage = row => {
    return (
      <Box sx={{ display: 'flex' }}>
        <ButtonOptions
          listOptions={listOptions}
          action={() => {
            setRowSelected({ ...row, ...row.values });
          }}
          styleMenu={{ width: '150px' }}
        />
      </Box>
    );
  };

  return (
    <Box id="scrollableDiv" className={classes.root}>
      {isLoading ? (
        <Box
          sx={{
            height: 'calc(100vh - 75px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : activities?.length ? (
        <InfiniteScroll
          dataLength={activities.length}
          next={funcLoad}
          hasMore={hasMore}
          loader={
            <Card
              sx={{
                marginTop: '20px',
                border: '1px solid #ccc',
                width: '60%',
                maxWidth: '1080px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <CardHeader
                avatar={
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                    // sx={{ bgcolor: '#f0f0f0' }}
                  />
                }
                title={
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="80%"
                    // sx={{ bgcolor: '#f0f0f0' }}
                  />
                }
                subheader={
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="40%"
                    // sx={{ bgcolor: '#f0f0f0' }}
                  />
                }
              />
              {
                <Skeleton
                  sx={{ height: '380px' }}
                  animation="wave"
                  variant="rectangular"
                />
              }
              <CardContent>
                <React.Fragment>
                  <Skeleton
                    animation="wave"
                    height={20}
                    style={{ marginBottom: 6 }}
                    // sx={{ bgcolor: '#f0f0f0' }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    width="80%"
                    // sx={{ bgcolor: '#f0f0f0' }}
                  />
                </React.Fragment>
              </CardContent>
            </Card>
          }
          style={{ overflow: 'hidden' }}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.8}
          endMessage={
            <Box
              sx={{
                backgroundColor: 'background.primary',
                borderRadius: 10,
                width: '100%',
                padding: '10px',
                margin: '20px 0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ marginRight: '20px' }}>
                <Typography style={{ fontSize: 20 }}>
                  <b>Không còn dữ liệu cũ hơn</b>
                </Typography>
              </div>
              <img
                alt=""
                src="https://www.facebook.com/images/pages/offers/offers_background.png"
                style={{ width: '50px' }}
              ></img>
            </Box>
          }
        >
          {activities?.length ? (
            activities?.map((el: any) => (
              <Box
                key={el?.id}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box className={classes.boxOrder}>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={
                            el.account.avatar_media.show_url ??
                            el.account.avatar_static
                          }
                          alt="avatar"
                        >
                          R
                        </Avatar>
                      }
                      action={<Typography>{el.post_category_id}</Typography>}
                      title={el.account.display_name}
                      subheader={handleTimeShow(
                        el.backdated_time ?? el.created_at
                      )}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {el.content ?? ''}
                      </Typography>
                    </CardContent>
                    {el.media_attachments?.length ? (
                      <ImageRender
                        type={el.post_type}
                        post={el}
                        images={el?.media_attachments?.map((item: any) =>
                          item.type !== 'video'
                            ? item.url
                            : item.remote_url ?? item.url
                        )}
                        medias={el?.media_attachments}
                      />
                    ) : null}
                  </Card>
                </Box>
              </Box>
            ))
          ) : (
            <></>
          )}
        </InfiniteScroll>
      ) : (
        <Typography variant="h5" textAlign="center">
          Chưa có dữ liệu
        </Typography>
      )}

      {/* <BasePaginate
        total={total}
        handleChange={handleChangePaginate}
        rowsPerPage={filters.perPage}
      /> */}
    </Box>
  );
}
