import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HideImageIcon from '@mui/icons-material/HideImage';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { makeStyles } from '@mui/styles';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  UDCampaignsApi,
  getListCampaignsApi
} from 'src/apis/socialCampaign.api';
import BaseButton from 'src/components/Button/BaseButton';
import ButtonOptions from 'src/components/Button/ButtonOptions';
import DialogAddCampaigns from 'src/components/Dialog/DialogAddCampaigns';
import { default as DialogConfirmDelete } from 'src/components/Dialog/DialogConfirm';
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
    justifyContent: 'flex-end',
    padding: '0px 10px 10px 10px'
  },
  text: {
    fontSize: '15px !important',

    fontWeight: '600 !important'
  }
}));

export default function BasicTable(props) {
  const { refScroll } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const match: any = useRouteMatch();
  const [listCampaigns, setListCampaigns] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(true);
  const [rowSelected, setRowSelected] = React.useState<any>(null);
  const [openDialogAddCampaigns, setOpenDialogAddCampaigns] =
    React.useState<any>(false);
  const [type, setType] = React.useState<any>(null);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] =
    React.useState<any>(false);
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

  const getListCampaigns = async () => {
    let res = await getListCampaignsApi();
    if (res.status === 200) {
      setTotal(() => res.data?.meta.total);
      setListCampaigns(() => res.data);
      setIsLoading(false);
    }
  };

  const handleDeleteCampaigns = async () => {
    let res = await UDCampaignsApi(rowSelected?.id, 'delete', null);
    if (res.status === 200) {
      setListCampaigns(prev => ({
        ...prev,
        data: prev.data.filter((item: any) => item?.id !== rowSelected?.id)
      }));
      setTotal(prev => prev - 1);
    }
  };

  React.useEffect(() => {
    if (match.path === PATHS.CAMPAIGNS) {
      getListCampaigns();
    }
  }, [match.path]);

  const iconStyle = { fontSize: '20px' };

  const listOptions = [
    {
      id: 'edit',
      label: 'Sửa',
      icon: <TaskAltIcon />,
      styleIcon: iconStyle,
      action: () => {
        setType(rowSelected?.id);
        setOpenDialogAddCampaigns(true);
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
      key: 'banner',
      label: t('Banner'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'title',
      label: t('Tiêu đề'),
      required: true,
      span: 6
    },
    {
      type: 'Date',
      key: 'start_date',
      label: t('Ngày bắt đầu'),
      required: true,
      span: 6
    },
    {
      type: 'Date',
      key: 'due_date',
      label: t('Ngày kết thúc'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'description',
      label: t('Mô tả'),
      required: true,
      span: 6
    }
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapButton}>
        <BaseButton
          buttonName="Thêm Campaigns"
          startIcon={<AddIcon />}
          onClick={() => {
            setType('create');
            setOpenDialogAddCampaigns(true);
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
      ) : listCampaigns.data?.length ? (
        <BaseTable
          header={fields}
          data={listCampaigns.data}
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
      {openDialogAddCampaigns && (
        <DialogAddCampaigns
          open={openDialogAddCampaigns}
          handleClose={() => setOpenDialogAddCampaigns(false)}
          title="Thêm chiến dịch quảng cáo"
          labelButton="Lưu"
          listCampaigns={listCampaigns}
          setListCampaigns={setListCampaigns}
          setTotal={setTotal}
          setType={setType}
          type={type}
          rowSelected={rowSelected}
          setRowSelected={setRowSelected}
        />
      )}
      {openDialogConfirmDelete && (
        <DialogConfirmDelete
          open={openDialogConfirmDelete}
          handleClose={() => setOpenDialogConfirmDelete(false)}
          action={() => handleDeleteCampaigns()}
          title="Xóa chiến dịch quảng cáo?"
          text={`Bạn có chắc muốn xóa chiến dịch quảng cáo ${rowSelected?.title} ?`}
          labelButton="Xóa"
        />
      )}
    </Box>
  );
}
