import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import * as React from 'react';
export default function ButtonOptions(props) {
  const { listOptions, action, styleMenu } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (action) {
      action();
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip title="Menu hành động">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreHorizIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            ...styleMenu,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {listOptions?.length
          ? listOptions?.map((option, index) => {
              return (
                <Box key={option?.id}>
                  <MenuItem
                    onClick={() => {
                      if (option?.action) {
                        option?.action();
                      }
                      handleClose();
                    }}
                  >
                    <ListItemIcon>{option?.icon}</ListItemIcon>
                    {option?.label}
                  </MenuItem>
                  {index === 1 ? <Divider /> : null}
                </Box>
              );
            })
          : null}
      </Menu>
    </React.Fragment>
  );
}
