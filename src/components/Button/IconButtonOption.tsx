/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable react-hooks/exhaustive-deps */ /* eslint-disable jsx-a11y/anchor-is-valid */ /* eslint-disable jsx-a11y/alt-text */ import React from 'react';
import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  Box,
  Popper,
  Theme
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouteMatch } from 'react-router-dom';
import { boxShadow } from 'src/constants/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { makeStyles } from '@mui/styles';
// import AvatarSocial from '../ProfileCardImage/AvatarSocial';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cssScroll: {
    overflowY: 'auto',
    overflowX: 'hidden',
    '&:hover': {
      //
    },
    '&::-webkit-scrollbar': {
      width: 10
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#bdbdbd',
      borderRadius: 10
    }
  }
}));

const IconButtonOptions = props => {
  const {
    icon,
    options,
    action,
    style,
    disabled,
    openPopup,
    name,
    styleListMenu,
    stylePopup,
    avatar,
    avatar_social,
    style_avatar_social,
    optionCheckDefault,
    styleNameButton,
    reloadGlobal,
    startIconStyle,
    startIcon,
    description,
    styleText,
    styleAvatar,
    deleteIconButton,
    actionDeleteIconButton,
    horizontalTransform,
    horizontalAnchor,
    typePopup,
    children,
    disablePortal,
    popperPlacement
  } = props;
  const match: any = useRouteMatch();
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [showChecked, setShowChecked] = React.useState(null);
  const [optionsMenu, setOptionsMenu] = React.useState<any>([]);
  const [menuLevel2, setMenuLevel2] = React.useState(false);
  const [loadingPopover, setLoadingPopover] = React.useState(true);
  const [openPopper, setOpenPopper] = React.useState(false);

  React.useEffect(() => {
    setOptionsMenu(options);
  }, [JSON.stringify(options)]);

  React.useEffect(() => {
    if (optionsMenu?.length < 2 && optionsMenu[0]?.length) {
      setLoadingPopover(false);
    } else if (optionsMenu?.length > 1 && optionsMenu[1]?.length) {
      for (var i = 0; i < optionsMenu.length; i++) {
        if (optionsMenu[i].length > 0) {
          setLoadingPopover(false);
        }
      }
    }
  }, [JSON.stringify(optionsMenu)]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (openPopup) {
      setAnchorEl(event.currentTarget);
      setOptionsMenu(options);
      setOpenPopper(true);
    }
    action && action();
  };

  const handleChooseAction = el => {
    if (el.isFather) {
      setOptionsMenu(el.options);
      setMenuLevel2(true);
    } else {
      if (el.action) {
        el.action();
      }
      handleClose();
      setOpenPopper(false);
      setShowChecked(el.id);
      if (reloadGlobal) {
        window.location.reload();
      }
    }
  };
  React.useEffect(() => {
    let { id, tab } = match.params;
    if (optionCheckDefault) {
      setShowChecked(optionCheckDefault);
    } else {
      setShowChecked(id !== undefined ? id : 1);
    }
  }, []);
  const renderLoading = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <CircularProgress size={20} color={'inherit'} />
      </Box>
    );
  };

  const handleClose = () => {
    setOptionsMenu(options);
    setAnchorEl(null);
  };
  const renderContent = () => {
    return (
      <>
        {loadingPopover && renderLoading()}
        {optionsMenu?.length !== 0 &&
          optionsMenu?.map((option: any, index: any) => (
            <React.Fragment key={index}>
              {option.map((el: any) =>
                el.hidden ? null : (
                  <div key={el.title ?? el.label}>
                    {el?.title && (
                      <div
                        key={el.title}
                        style={{
                          maxWidth: '328px',
                          margin: '0px 8px',
                          padding: '2px 4px',
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          ...el.styleTitle
                        }}
                      >
                        {menuLevel2 && (
                          <IconButton
                            size="small"
                            sx={{
                              width: '35px',
                              height: '35px',
                              marginRight: '5px'
                            }}
                            onClick={() => {
                              setOptionsMenu(options);
                              setMenuLevel2(false);
                            }}
                          >
                            <i className="fas fa-arrow-left"></i>
                          </IconButton>
                        )}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <Typography
                            fontWeight={500}
                            fontSize={'17px'}
                            fontFamily={
                              'Segoe UI, Helvetica, Arial, sans-serif'
                            }
                          >
                            {el.title}
                          </Typography>
                          {el.description && (
                            <Typography
                              variant="caption"
                              fontSize={'13px'}
                              fontFamily={
                                'Segoe UI, Helvetica, Arial, sans-serif'
                              }
                              sx={{
                                display: 'block',
                                lineHeight: '1.2308'
                              }}
                            >
                              {el.description}
                            </Typography>
                          )}
                        </div>
                      </div>
                    )}
                    {el?.icon ||
                    el?.avatar_icon ||
                    el?.label ||
                    el?.avatar_social ? (
                      <ListItemButton
                        sx={{
                          margin: '0px 8px',
                          padding: '4px 4px',
                          borderRadius: '5px',
                          maxWidth: 340
                        }}
                        onClick={() => handleChooseAction(el)}
                      >
                        {el.icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: '25px',
                              marginRight: '10px'
                            }}
                          >
                            <i style={el.styleIcon} className={el.icon}></i>
                          </ListItemIcon>
                        )}
                        {/* {el?.avatar_social && (
                          <AvatarSocial
                            type={el.avatar_social.type}
                            avatarObj={el.avatar_social.avatarObj}
                            style={el.avatar_social.style}
                            noAction={true}
                          />
                        )} */}
                        {el.avatar_icon && (
                          <ListItemIcon
                            sx={{
                              minWidth: '25px',
                              marginRight: '10px'
                            }}
                          >
                            <img
                              alt=""
                              style={{
                                height: 36,
                                width: 36,
                                margin: '0px 10px 0px 0px',
                                borderRadius: '50%',
                                ...boxShadow
                              }}
                              src={el.avatar_icon}
                            />
                          </ListItemIcon>
                        )}
                        <ListItemText>
                          <Typography
                            fontWeight={500}
                            fontSize={'15px'}
                            fontFamily={
                              'Segoe UI, Helvetica, Arial, sans-serif'
                            }
                            sx={{ display: 'inline-block', ...el.styleLabel }}
                          >
                            {el.label ?? el.name}
                          </Typography>
                        </ListItemText>
                        {el.checkbox &&
                          (el.id === showChecked ||
                            el.username === showChecked) && (
                            <i
                              style={{
                                color: '#3935f4',
                                margin: '0 10px'
                              }}
                              className="fa-light fa-check"
                            ></i>
                          )}
                        {el.endIcon && (
                          <ListItemIcon
                            sx={{
                              minWidth: '25px'
                            }}
                          >
                            <i
                              className={el.endIcon}
                              style={{ ...el.styleEndIcon }}
                            ></i>
                          </ListItemIcon>
                        )}
                        {el.isFather && (
                          <ListItemIcon
                            sx={{
                              minWidth: '25px'
                            }}
                          >
                            <i className="fal fa-chevron-right"></i>
                          </ListItemIcon>
                        )}
                      </ListItemButton>
                    ) : null}
                  </div>
                )
              )}
              {index !== optionsMenu.length - 1 && (
                <Divider variant="middle" sx={{ margin: '8px 12px' }} />
              )}
            </React.Fragment>
          ))}
      </>
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        sx={{
          height: '36px',
          width: !name ? '48px' : 'fit-content',
          borderRadius: '6px',
          margin: '0 7px',
          backgroundColor: 'button.primary.background',
          '&:hover': {
            backgroundColor: 'button.primary.hover'
          },
          ...style
        }}
      >
        {children}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {startIcon ? (
            <i className={startIcon} style={{ ...startIconStyle }}></i>
          ) : null}
          {/* {avatar_social && (
            <AvatarSocial
              type="avatar"
              avatarObj={avatar_social}
              style={{
                width: 48,
                height: 48,
                margin: '0px 15px 0px 0px',
                border: '1px solid #fff',
                ...style_avatar_social
              }}
              noAction={true}
            />
          )} */}
          {avatar ? (
            <img
              style={{
                height: 48,
                width: 48,
                margin: '0px 10px 0px 0px',
                borderRadius: '50%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
                ...styleAvatar
              }}
              src={avatar}
            />
          ) : null}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              ...styleText
            }}
          >
            {name ? (
              <Typography
                sx={{
                  fontSize: '16px',
                  marginRight: icon ? '10px' : 0,
                  fontWeight: 600,
                  color: 'text.primary',
                  ...styleNameButton
                }}
                align="left"
              >
                {name}
              </Typography>
            ) : null}
            {description ? (
              <Typography
                style={{
                  fontSize: '14px',
                  marginRight: icon ? '10px' : 0,

                  fontFamily: 'Segoe UI',
                  justifyContent: 'start'
                }}
                align="left"
              >
                {description}
              </Typography>
            ) : null}
          </div>
        </div>
        {icon}
        {deleteIconButton && actionDeleteIconButton ? (
          <IconButton onClick={actionDeleteIconButton}>
            {<i className="fa-light fa-circle-x"></i>}
          </IconButton>
        ) : null}
      </IconButton>
      {!typePopup && optionsMenu?.length !== 0 && openPopper && (
        <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
          <Popper
            id={id}
            open={openPopper}
            anchorEl={anchorEl}
            placement={popperPlacement ?? 'top-end'}
            disablePortal={disablePortal !== undefined ? disablePortal : true}
            className={classes.cssScroll}
            style={{
              borderRadius: '8px',
              zIndex: 10000000,
              position: 'relative',
              marginTop: '15px !important',
              ...boxShadow,
              ...stylePopup
            }}
            {...props}
          >
            <div
              style={{
                padding: '10px 0px 15px',
                backgroundColor:
                  theme.palette.mode === 'dark' ? '#242526' : '#fff',
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                borderRadius: '6px',
                ...styleListMenu
              }}
            >
              {renderContent()}
            </div>
          </Popper>
        </ClickAwayListener>
      )}
      {typePopup === 'popover' && optionsMenu?.length !== 0 && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom' || 'top',
            horizontal: horizontalAnchor || 'left'
          }}
          transformOrigin={{
            vertical: 'top' || 'bottom',
            horizontal: horizontalTransform || 'left'
          }}
          sx={{ borderRadius: '8px', ...stylePopup }}
        >
          <div
            style={{
              padding: '10px 0px',
              ...styleListMenu
            }}
          >
            {renderContent()}
          </div>
        </Popover>
      )}
    </>
  );
};

export default IconButtonOptions;
