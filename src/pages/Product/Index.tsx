import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HideImageIcon from '@mui/icons-material/HideImage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { makeStyles } from '@mui/styles';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { productCategories } from 'src/apis/socialProduct.api';
import BaseButton from 'src/components/Button/BaseButton';
import ButtonOptions from 'src/components/Button/ButtonOptions';
import DialogAddField from 'src/components/Dialog/DialogAddField';
import BasePaginate from 'src/components/Paginate/BasePaginate';
import BaseTable from 'src/components/Table/BaseTable';
import { PATHS } from 'src/constants/paths';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '60px',
    height: 'calc(100vh - 75px)',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginLeft: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 10px 10px 10px'
  },
  text: {
    fontSize: '15px !important',

    fontWeight: '600 !important'
  },
  required: {
    color: 'red'
  },
  wrapCategories: {
    width: '100%',
    border: '1px solid rgb(118, 118, 118)',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    '&:hover': {
      border: '1px solid #d2d2d2',
      cursor: 'pointer'
    },
    borderRadius: '10px'
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
  }
}));

export default function BasicTable(props) {
  const { refScroll } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const match: any = useRouteMatch();
  const [listField, setListField] = React.useState<any>([
    {
      id: '1',
      field_name: 'Chất liệu',
      code: '220397',
      created_at: '2023-04-19T00:00:00.000+07:00',
      updated_at: '2023-04-25T00:00:00.000+07:00',
      data_type: 'Option',
      value: ['Nỉ', 'Nỉ Lông', 'Cotton']
    },
    {
      id: '2',
      field_name: 'Xuất xứ',
      code: '220391',
      created_at: '2023-04-19T00:00:00.000+07:00',
      updated_at: '2023-04-25T00:00:00.000+07:00',
      data_type: 'Option',
      value: ['Nỉ', 'Nỉ Lông', 'Cotton']
    },
    {
      id: '3',
      field_name: 'Mẫu',
      code: '220392',
      created_at: '2023-04-20T00:00:00.000+07:00',
      updated_at: '2023-04-27T00:00:00.000+07:00',
      data_type: 'Option',
      value: ['Nỉ', 'Nỉ Lông', 'Cotton']
    },
    {
      id: '4',
      field_name: 'Phong cách',
      code: '220398',
      created_at: '2023-04-19T00:00:00.000+07:00',
      updated_at: '2023-04-19T00:00:00.000+07:00',
      data_type: 'Date',
      value: ['Nỉ', 'Nỉ Lông', 'Cotton']
    },
    {
      id: '5',
      field_name: 'Tall Fit',
      code: '220396',
      created_at: '2023-04-19T00:00:00.000+07:00',
      updated_at: '2023-04-30T00:00:00.000+07:00',
      data_type: 'Option',
      value: ['Nỉ', 'Nỉ Lông', 'Cotton']
    }
  ]);
  const [isLoading, setIsLoading] = React.useState<any>(false);
  const [rowSelected, setRowSelected] = React.useState<any>(null);
  const [openDialogAddField, setOpenDialogAddField] =
    React.useState<any>(false);
  const [type, setType] = React.useState<any>(null);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] =
    React.useState<any>(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [categories, setCategories] = React.useState<any>({
    parent: null,
    sub: null
  });
  const [productCategory, setProductCategory] = React.useState<any>([]);
  const [productSubcategory, setProductSubcategory] = React.useState<any>([]);
  const [total, setTotal] = React.useState(10);
  const [filters, setFilters] = React.useState({
    month: moment().format('YYYY-MM'),
    page: 0,
    perPage: 10,
    search: ''
  } as any);

  const matches = useMediaQuery('(min-width:1600px)');

  const handleChangePaginate = paginate => {
    setFilters(preValue => {
      let temp = cloneDeep(preValue);
      temp.page = paginate.page;
      temp.perPage = paginate.perPage;
      return temp;
    });
  };
  const getListCategories = async id => {
    let res = await productCategories(id);
    if (res.status === 200) {
      if (id) {
        setProductSubcategory(() => res.data);
      } else {
        setProductCategory(res.data);
      }
    }
  };

  React.useEffect(() => {
    if (match.path === PATHS.PRODUCT) {
      getListCategories(null);
    }
    return () => {
      setProductCategory([]);
      setProductSubcategory([]);
    };
  }, []);

  const iconStyle = { fontSize: '20px' };

  const listOptions = [
    {
      id: 'edit',
      label: 'Sửa',
      icon: <TaskAltIcon />,
      styleIcon: iconStyle,
      action: () => {
        setType(rowSelected?.id);
        setOpenDialogAddField(true);
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
      action: () => {
        setOpenDialogConfirmDelete(true);
      }
    }
  ];

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

  const fields = [
    {
      type: 'number',
      key: 'id',
      label: t('Id'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'field_name',
      label: t('Tên trường'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'code',
      label: t('Mã trường'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'data_type',
      label: t('Loại'),
      required: true,
      span: 6
    },
    {
      type: 'Date',
      key: 'created_at',
      label: t('Ngày tạo'),
      required: true,
      span: 6
    },
    {
      type: 'Date',
      key: 'updated_at',
      label: t('Ngày cập nhật'),
      required: true,
      span: 6
    }
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapButton}>
        <Box sx={{ width: '40%' }}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={3}>
              <Typography textAlign="right" sx={{ marginRight: '10px' }}>
                <span className={classes.required}>*</span> Ngành hàng
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box
                className={classes.wrapCategories}
                onClick={() => {
                  setOpenCategories(true);
                }}
              >
                <Typography
                  className={
                    categories?.parent
                      ? classes.textCategoriesValue
                      : classes.textCategories
                  }
                >
                  {categories?.parent
                    ? `${categories.parent?.text} ${
                        categories?.sub ? '> ' + categories?.sub?.text : ''
                      }`
                    : 'Chọn ngành hàng'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <BaseButton
          buttonName="Thêm Field"
          startIcon={<AddIcon />}
          onClick={() => {
            setType('create');
            setOpenDialogAddField(true);
          }}
        />
      </Box>
      {isLoading ? (
        <Box
          sx={{
            height: 'calc(100vh - 75px)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : listField?.length ? (
        <BaseTable
          header={fields}
          data={listField}
          renderManage={renderManage}
          page={filters.page}
          perPage={filters.perPage}
        />
      ) : (
        <Typography variant="h5" textAlign="center">
          Chưa có dữ liệu
        </Typography>
      )}

      <BasePaginate
        total={total}
        handleChange={handleChangePaginate}
        rowsPerPage={filters.perPage}
      />
      {/* {openDialogConfirmDelete && (
        <DialogConfirmDelete
          open={openDialogConfirmDelete}
          handleClose={() => setOpenDialogConfirmDelete(false)}
          action={() => handleDeleteCampaigns()}
          title="Xóa chiến dịch quảng cáo?"
          text={`Bạn có chắc muốn xóa chiến dịch quảng cáo ${rowSelected?.title} ?`}
          labelButton="Xóa"
        />
      )} */}

      {openDialogAddField && (
        <DialogAddField
          open={openDialogAddField}
          handleClose={() => setOpenDialogAddField(false)}
          title="Thêm Trường"
          labelButton="Lưu"
          listField={listField}
          setListField={setListField}
          setTotal={setTotal}
          setType={setType}
          type={type}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      )}
    </Box>
  );
}
