import CloseIcon from '@mui/icons-material/Close';
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import * as React from 'react';
import { useCallback } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { createCampaignsApi } from 'src/apis/socialCampaign.api';
import { convertISO8086toLDate } from 'src/common/string';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import { buttonStyle, modalBackdrop } from 'src/constants/styles';
import { uploadMediaSaga } from 'src/store/saga/socialPostSaga';
import * as Yup from 'yup';
import InputText from '../Input/InputText';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
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

const useStyles = makeStyles(() => ({
  wrapHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '565px',
    position: 'relative'
  },
  wrapUpload: {
    width: '100%',
    borderRadius: 10,
    height: '170px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7f3ff',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#e5f0f4'
    }
  },
  text: {
    fontSize: '15px !important',
    fontWeight: '600 !important'
  },
  wrapRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  wrapText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}));

export default function CustomizedDialogs(props) {
  const {
    title,
    text,
    open,
    handleClose,
    labelButton,
    colorButton,
    alignText,
    hiddenButton,
    styleDialogContent,
    maxWidth,
    listCampaigns,
    setListCampaigns,
    setTotal,
    setType,
    type,
    setRowSelected,
    rowSelected
  } = props;
  const classes = useStyles();
  let now = new Date();
  let tomorrow = new Date(now);
  let lastDay = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  lastDay.setDate(now.getDate() + 7);
  const [dateRange, setDateRange] = React.useState<any>([tomorrow, lastDay]);
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      banner: null as any,
      title: '',
      start_date: convertISO8086toLDate(dateRange[0]),
      due_date: convertISO8086toLDate(dateRange[1]),
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      createCampaigns();
    }
  });

  const onDrop = useCallback(acceptedFiles => {
    formik.setFieldValue(
      'banner',
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  React.useEffect(() => {
    if (type !== 'create') {
      let data = {
        banner: [rowSelected.banner],
        title: rowSelected.title,
        description: rowSelected.description,
        start_date: convertISO8086toLDate(rowSelected.start_date),
        due_date: convertISO8086toLDate(rowSelected.due_date)
      };
      formik.setValues(data);
    }
  }, [type]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png' as unknown as DropzoneOptions['accept'],
    multiple: false,
    onDrop
  });

  const createCampaigns = async () => {
    try {
      let data;
      if (!formik.values?.banner?.id) {
        let listIdMedia = await uploadMediaSaga(
          formik.values?.banner,
          'moment'
        );
        data = {
          banner: listIdMedia[0],
          title: formik.values?.title,
          description: formik.values?.description,
          start_date: formik.values?.start_date,
          due_date: formik.values?.due_date
        };
      } else {
        data = {
          banner: formik.values?.banner[0]?.id,
          title: formik.values?.title,
          description: formik.values?.description,
          start_date: formik.values?.start_date,
          due_date: formik.values?.due_date
        };
      }
      let res = await createCampaignsApi(data, type);
      if (res.status === 200) {
        if (type === 'create') {
          setListCampaigns(prev => ({
            ...prev,
            data: [...prev.data, res.data]
          }));
          setTotal(prev => prev + 1);
        } else {
          let index = listCampaigns.data.findIndex(el => el.id === res.data.id);
          setListCampaigns(prev => ({
            ...prev,
            data: [
              ...prev.data.slice(0, index),
              res.data,
              ...prev.data.slice(index + 1)
            ]
          }));
        }

        setIsLoading(false);
        handleClose();
      }
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const renderContentFile = () => {
    if (formik.values?.banner?.length) {
      return (
        <div style={{ width: '100%' }}>
          <div className={classes.wrapHeader}>
            <img
              src={
                formik.values.banner[0].preview ??
                formik.values.banner[0].show_url ??
                formik.values.banner[0].url
              }
              alt="preview"
              width="100%"
              height="170px"
            />
          </div>
        </div>
      );
    }
  };

  const handleDateChange = date => {
    setDateRange(date);
    formik.setFieldValue('start_date', convertISO8086toLDate(date[0]));
    formik.setFieldValue('due_date', convertISO8086toLDate(date[1]));
  };

  const renderForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {formik.values?.banner?.length ? (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              {renderContentFile()}
              {formik.values?.banner?.length ? (
                <IconButton
                  aria-label="close"
                  onClick={() => formik.setFieldValue('banner', null)}
                  sx={{
                    position: 'absolute',
                    // left: 8,
                    right: 8,
                    top: 8,
                    height: 38,
                    width: 38,
                    backgroundColor: '#E4E6EB',
                    opacity: 0.8,
                    '&:hover': {
                      backgroundColor: '#E3E6EB'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          ) : (
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <div {...getRootProps()} className={classes.wrapUpload}>
                <input {...getInputProps()} />
                <div className={classes.wrapRoot}>
                  <Box className={classes.wrapText}>
                    <Typography className={classes.text}>
                      Tải lên Banner
                    </Typography>
                    <Typography fontSize={13} variant="subtitle2">
                      Kích thước 900x270 hoặc 600x180
                    </Typography>
                  </Box>
                </div>
              </div>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <InputText
            field="title"
            formik={formik}
            required
            fullWidth
            placeholder="Tiêu đề"
          />
        </Grid>
        <Grid item xs={12}>
          <InputText
            field="description"
            formik={formik}
            required
            fullWidth
            placeholder="Mô tả"
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Ngày bắt đầu"
              endText="Ngày kết thúc"
              value={dateRange}
              onChange={handleDateChange}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField fullWidth {...startProps} />
                  <Box sx={{ mx: 2 }}> đến </Box>
                  <TextField fullWidth {...endProps} />
                </React.Fragment>
              )}
              calendars={2}
              disablePast
              disableHighlightToday
              minDate={tomorrow}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={maxWidth ?? undefined}
        BackdropProps={modalBackdrop}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            style={{ fontWeight: 'bold', fontSize: 20 }}
            textAlign={alignText ?? 'start'}
          >
            {title}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent
          // dividers={!hiddenButton}
          style={{ ...styleDialogContent }}
        >
          <Typography style={{ fontSize: 15 }}>{text}</Typography>
          {renderForm()}
        </DialogContent>
        {!hiddenButton && (
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ ...buttonStyle, textTransform: 'none' }}
            >
              Hủy
            </Button>
            <ButtonInherit
              action={() => {
                setIsLoading(true);
                formik.submitForm();
              }}
              color={colorButton || '#1b74e4'}
              style={{ fontSize: '14px' }}
              label={labelButton ? labelButton : 'Xóa'}
              loading={isLoading}
            />
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  );
}
