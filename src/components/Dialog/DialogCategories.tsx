import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import {
  modalBackdrop,
  scrollStyle,
  scrollStyleNotrack
} from 'src/constants/styles';
import InputSearch from '../Input/InputSearch';

const useStyles = makeStyles((theme: any) => ({
  wrapContent: {
    width: '100%',
    maxHeight: '400px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center'
    // alignItems: 'center'
  },
  wrapCol: {
    width: '100%',
    maxHeight: '400px',
    overflow: 'auto',
    ...scrollStyleNotrack
  },
  wrapLoading: {
    padding: '20px'
  }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    ...scrollStyle
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    width: 700
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
export default function ScrollDialog(props) {
  const {
    open,
    handleClose,
    categories,
    setCategories,
    productCategory,
    productSubcategory,
    getListCategories,
    handleSearchCategories
  } = props;
  const classes = useStyles();

  const [searchInput, setSearchInput] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   const searchTimer = setTimeout(() => {
  //     handleSearchCategories(searchInput);
  //   }, 500);
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timer);
  //     clearTimeout(searchTimer);
  //   };
  // }, [searchInput]);

  const renderList = (item, type) => {
    return (
      <ListItemButton
        key={item.id}
        onClick={() => {
          if (type === 'parent') {
            getListCategories(item.id);
            setCategories({
              parent: item,
              sub: null
            });
          } else {
            setCategories(prev => ({
              ...prev,
              sub: item
            }));
          }
        }}
      >
        <ListItemText
          primary={
            <Typography
              fontSize={14}
              fontWeight={
                categories?.parent?.id === item.id ||
                categories?.sub?.id === item.id
                  ? 700
                  : 400
              }
              sx={{
                color:
                  categories?.parent?.id === item.id ||
                  categories?.sub?.id === item.id
                    ? '#7165E0'
                    : 'text.primary'
              }}
            >
              {item?.text}
            </Typography>
          }
        />
        {type === 'parent' ? (
          <i
            className="fa-solid fa-chevron-right"
            style={{
              color: categories?.parent?.id === item.id ? '#7165E0' : 'inherit'
            }}
          ></i>
        ) : null}
      </ListItemButton>
    );
  };

  const renderListLoading = () => {
    return (
      <Box className={classes.wrapLoading}>
        <Skeleton animation="wave" width="100%" height="30px" />
        <Skeleton animation="wave" width="100%" height="30px" />
        <Skeleton animation="wave" width="100%" height="30px" />
        <Skeleton animation="wave" width="100%" height="30px" />
      </Box>
    );
  };

  return (
    <div>
      <BootstrapDialog
        open={open}
        scroll={'body'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        BackdropProps={modalBackdrop}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            style={{ fontWeight: 'bold', fontSize: 20 }}
            textAlign={'center'}
          >
            Chỉnh sửa ngành hàng
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <InputSearch
            label="Tên ngành hàng"
            action={() => {
              handleSearchCategories(searchInput);
            }}
            keyword={searchInput}
            setKeyword={setSearchInput}
            styleInput={{ marginBottom: '15px' }}
          />
          <Grid container className={classes.wrapContent}>
            <Grid item xs className={classes.wrapCol}>
              <List>
                {productCategory?.length ? (
                  productCategory.map(item => {
                    return renderList(item, 'parent');
                  })
                ) : isLoading ? (
                  renderListLoading()
                ) : (
                  <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>
                    Không có
                  </Typography>
                )}
              </List>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs className={classes.wrapCol}>
              <List>
                {productSubcategory?.length
                  ? productSubcategory.map(item => {
                      return renderList(item, 'sub');
                    })
                  : null}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonInherit
            label="Hủy"
            style={{ marginRight: 0, marginLeft: 5 }}
            action={handleClose}
          />
          <ButtonInherit
            disabled={!categories}
            label="Lưu"
            color="#1876f2"
            style={{ marginRight: 0, marginLeft: 5 }}
            action={handleClose}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
