import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import IconButtonOptions from '../Button/IconButtonOption';
import BaseLink from '../Link/BaseLink';
// import AvatarSocial from '../ProfileCardImage/AvatarSocial';

const useStyles = makeStyles(
  (theme: any) =>
    createStyles({
      avatar: {
        width: '56px !important',
        height: '56px !important',
        marginRight: '10px'
      },
      list: {
        width: '100%'
      },
      selected: {
        backgroundColor: theme.palette?.button.primary.background
      },
      darkSelected: {
        backgroundColor: theme.pallete?.button.primary.background
      },
      iconSelected: {
        backgroundColor: '#217bf1 !important',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '3px'
      },
      icon: {
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: '3px'
      },
      rootAccordionChat: {
        paddingLeft: '0px !important'
      },
      rootAccordionCommon: {
        paddingLeft: '0px !important'
      }
    }),
  { index: 1 }
);

function ListButton(props) {
  const classes = useStyles();
  const {
    item,
    itemChildren,
    selectedItem,
    chooseItem,
    setChooseItem,
    width,
    colorIcon,
    styleChildren,
    noButtonChildren,
    styleAccordion,
    styleAccordionDetail,
    expandInfoStyle,
    dividerBottomAccordion,
    dividerBottomList,
    type,
    checkedIcon
  } = props;

  const theme = useTheme();

  if (!item?.length) {
    return (
      <Typography style={{ margin: '14px 14px' }} variant="subtitle2">
        Không có dữ liệu
      </Typography>
    );
  }
  const handleChooseAction = (actionChoose: any, id: any) => {
    if (actionChoose) {
      actionChoose();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value) => {
    let newChooseItem: any = [...chooseItem];
    if (event.target.checked) {
      setChooseItem(newChooseItem.concat([value]));
    } else {
      setChooseItem(newChooseItem.filter((el: any) => el.id !== value.id));
    }
  };

  const componentItem = (item: any, style: any, buttonChildren: any) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '8px'
        }}
      >
        <ListItem
          sx={{
            borderRadius: '10px',
            paddingLeft: '5px',
            // marginLeft: '0px',
            backgroundColor:
              selectedItem === item?.id ? '#ebebeb' : 'transparent',
            ...style,
            ...item.styleButton
          }}
          button={buttonChildren || false}
          onClick={() =>
            item?.action ? handleChooseAction(item?.action, item?.id) : null
          }
          key={item?.id}
          className={selectedItem === item?.id ? classes.selected : undefined}
          secondaryAction={
            item.checkbox ? (
              <Checkbox
                edge="end"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, item)
                }
                checked={
                  chooseItem?.find((el: any) => el?.id === item.id)
                    ? true
                    : false
                }
              />
            ) : checkedIcon && selectedItem === item.id ? (
              <i
                style={{
                  color: '#3935f4',
                  margin: '0 10px'
                }}
                className="fa-light fa-check"
              ></i>
            ) : null
          }
        >
          {/* {item?.avatar_social && (
            <AvatarSocial
              type="avatar"
              avatarObj={item.avatar_social}
              style={{
                width: 30,
                height: 30,
                margin: '0px 15px 0px 0px',
                border: '1px solid #fff'
              }}
            />
          )} */}
          {item?.avatar_icon && (
            <ListItemAvatar
              className={classes.icon}
              style={{
                width: 31,
                minWidth: 31,
                height: 31,
                ...item.styleAvatar
              }}
            >
              <img
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  ...item.styleImgAvatar
                }}
                src={item?.avatar_icon}
                alt="icons"
              />
            </ListItemAvatar>
          )}
          {item?.iconImage && (
            <ListItemAvatar
              className={classes.icon}
              style={{
                width: 35,
                minWidth: 35,
                height: 35,
                ...item.style
              }}
            >
              {item.iconImage && (
                <img
                  style={{
                    height: 20,
                    width: 20
                  }}
                  src={item.iconImage}
                  alt="icons"
                />
              )}
            </ListItemAvatar>
          )}
          {item?.icon && type !== 'watch' && (
            <ListItemAvatar
              style={{
                width: 35,
                minWidth: 35,
                height: 35,
                ...item.style
              }}
              className={
                colorIcon && selectedItem === item?.id
                  ? classes.iconSelected
                  : classes.icon
              }
            >
              {item.icon}
            </ListItemAvatar>
          )}
          {item?.icon && type === 'watch' && (
            <ListItemIcon sx={{ minWidth: 24 }}>
              <i className={`${item.icon} fa-lg`}></i>
            </ListItemIcon>
          )}
          {item?.cover_image_url && (
            <ListItemIcon>
              <Avatar
                variant="rounded"
                className={classes.avatar}
                src={item?.cover_image_url}
              ></Avatar>
            </ListItemIcon>
          )}
          <div style={{ ...item.styleText }}>
            {item?.titleTop && (
              <ListItemText
                primary={
                  <Typography variant="caption" sx={{ fontSize: 12 }}>
                    <b>{item?.titleTop}</b>
                  </Typography>
                }
                sx={{ margin: '-5px 0' }}
              />
            )}
            <ListItemText
              style={{ marginLeft: 10 }}
              primary={
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    ...item.styleTitle
                  }}
                >
                  {item?.title}
                </Typography>
              }
              secondary={
                item?.expandInfo ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: 12,
                        margin: '0px 5px',
                        ...expandInfoStyle
                      }}
                    >
                      {item?.expandInfo}
                    </Typography>
                    {item?.expandInfoToo ? (
                      <Typography
                        sx={{
                          fontSize: 12,
                          margin: '0px 5px',
                          ...expandInfoStyle
                        }}
                      >
                        {item?.expandInfoToo}
                      </Typography>
                    ) : null}
                  </>
                ) : null
              }
            />
          </div>
          {item?.button && (
            <ListItemButton
              style={{
                display: 'flex',
                justifyContent: 'end'
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent'
                },
                cursor: item.button?.disabled ? 'no-drop' : 'pointer'
              }}
            >
              {item?.buttonPrev && (
                <ButtonInherit
                  action={item.buttonPrev.action}
                  color={item.buttonPrev.inherit ? null : '#1b74e4'}
                  label={item.buttonPrev.label}
                  loading={item.buttonPrev.loading}
                  style={{
                    fontSize: 14,
                    marginRight: 0,
                    ...item.buttonPrev.style
                  }}
                  disabled={item.buttonPrev.disabled}
                />
              )}
              <ButtonInherit
                action={item.button.action}
                color={item.button.inherit ? null : '#1b74e4'}
                label={item.button.label}
                loading={item.button.loading}
                style={{
                  fontSize: 14,
                  margin: 0,
                  ...item.button.style
                }}
                disabled={item.button.disabled}
              />
            </ListItemButton>
          )}
        </ListItem>
        {item?.stackButton?.length && (
          <Grid
            sx={{
              width: '100%',
              display: 'flex',
              marginBottom: '10px'
            }}
            container
            item
            spacing={1}
            xs={12}
          >
            {item.stackButton.map((el: any) =>
              el.type === 'expand_button' ? (
                <Grid item xs={4}>
                  <IconButtonOptions
                    name={el?.label}
                    icon={
                      <i
                        style={{ fontSize: '14px' }}
                        className="fa-solid fa-caret-down"
                      ></i>
                    }
                    openPopup={true}
                    style={{
                      margin: '0px 0px',
                      minWidth: '101px',
                      width: '100%'
                    }}
                    options={el?.option}
                    styleListMenu={{ minWidth: '300px' }}
                    styleNameButton={{ fontSize: 14 }}
                  />
                </Grid>
              ) : (
                <Grid item xs={8}>
                  <ButtonInherit
                    action={el?.action}
                    color={el?.inherit ? null : '#e7f3ff'}
                    textColor={el.inherit ? null : '#1874e4'}
                    label={el?.label}
                    loading={el?.loading}
                    style={{
                      fontSize: 14,
                      margin: 0,
                      width: '100%',
                      ...el?.style
                    }}
                    fullWidth={el?.fullWidth}
                  />
                </Grid>
              )
            )}
          </Grid>
        )}
        {item?.divider && <Divider sx={{ marginTop: '-5px' }} />}
      </div>
    );
  };

  return (
    <List className={classes.list}>
      {item?.map((el: any, index) => (
        <BaseLink
          key={index}
          url={el?.url ? el?.url : null}
          component={
            !el?.accordion ? (
              componentItem(
                {
                  ...el,
                  styleButton: {
                    width: width,
                    ...el.styleButton
                  }
                },
                null,
                true
              )
            ) : (
              <Accordion
                sx={{
                  overflowY: 'hidden',
                  boxShadow: 'none',
                  margin: '0px 5px 0px 5px',
                  backgroundImage: 'none',
                  backgroundColor: 'transparent',
                  width: width ? width : '100%',
                  ...styleAccordion
                }}
                disableGutters
              >
                <AccordionSummary
                  aria-controls="panel1bh-content"
                  classes={{
                    root: classes.rootAccordionCommon
                  }}
                  sx={{
                    borderRadius: '10px',
                    '& .MuiAccordionSummary-content': {
                      margin: 0
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                      // marginLeft: '40px'
                    },
                    '& .MuiAccordionSummary-expandIconWrapper': {
                      // marginLeft: '40px'
                    },
                    backgroundColor: 'transparent'
                  }}
                  className={
                    selectedItem === el?.id
                      ? theme.palette.mode === 'dark'
                        ? classes.darkSelected
                        : classes.selected
                      : undefined
                  }
                  expandIcon={
                    <IconButton
                      sx={{
                        borderRadius: '50%',
                        color: 'text.primary'
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                >
                  {componentItem(el, null, true)}
                </AccordionSummary>
                {dividerBottomAccordion && (
                  <Divider sx={{ margin: '0px 5px' }} />
                )}
                <AccordionDetails
                  sx={{
                    marginTop: '-8px',
                    ...styleAccordionDetail
                  }}
                >
                  {itemChildren?.length ? (
                    itemChildren.map((item: any, index) => (
                      <BaseLink
                        key={index}
                        url={item?.url ? item?.url : null}
                        component={componentItem(
                          item,
                          styleChildren,
                          !noButtonChildren
                        )}
                      />
                    ))
                  ) : el?.itemChildren?.length ? (
                    el.itemChildren.map((element: any, index) => (
                      <BaseLink
                        key={index}
                        component={componentItem(
                          element,
                          element.styleChildren,
                          !noButtonChildren
                        )}
                      />
                    ))
                  ) : (
                    <Typography style={{ margin: 10 }} variant="subtitle2">
                      Không có dữ liệu
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          }
        />
      ))}
      {dividerBottomList && <Divider sx={{ margin: '0px 5px -15px 5px' }} />}
    </List>
  );
}

export default ListButton;
