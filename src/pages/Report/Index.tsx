import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FaceRetouchingOffSharpIcon from '@mui/icons-material/FaceRetouchingOffSharp';
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import { makeStyles } from '@mui/styles';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  UDReportApi,
  UDReportStatusApi,
  deletePostApi,
  getReportApi,
  getReportStatus
} from 'src/apis/socialReport.api';
import ButtonOptions from 'src/components/Button/ButtonOptions';
import {
  default as DialogConfirm,
  default as DialogConfirmDelete
} from 'src/components/Dialog/DialogConfirm';
import DialogRejected from 'src/components/Dialog/DialogRejected';
import BasePaginate from 'src/components/Paginate/BasePaginate';
import BaseTable from 'src/components/Table/BaseTable';

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
  wrapPipeLine: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#fff',
    marginLeft: '60px'
  }
}));

export default function BasicTable(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const match: any = useRouteMatch();
  const [listReport, setListReport] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(true);
  const [rowSelected, setRowSelected] = React.useState<any>(null);
  const [openDialogRejected, setOpenDialogRejected] =
    React.useState<any>(false);
  const [openDialogConfirmApproved, setOpenDialogConfirmApproved] =
    React.useState<any>(false);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] =
    React.useState<any>(false);
  const [total, setTotal] = React.useState(10);
  const [filters, setFilters] = React.useState({
    month: moment().format('YYYY-MM'),
    page: 0,
    perPage: 10,
    search: ''
  } as any);

  const handleChangePaginate = paginate => {
    setFilters(preValue => {
      let temp = cloneDeep(preValue);
      temp.page = paginate.page;
      temp.perPage = paginate.perPage;
      return temp;
    });
  };

  const getListReport = async (params: any) => {
    let res = await getReportApi(params);
    if (res.status === 200) {
      setTotal(() => res.data?.length);
      setListReport(() => res.data);
      setIsLoading(false);
    }
  };

  const handleDeletePost = async id => {
    let res = await deletePostApi(id);
    if (res.status === 200) {
    }
  };

  const getListReportStatus = async () => {
    let res = await getReportStatus();
    if (res.status === 200) {
      setTotal(() => res.data?.length);
      setListReport(() => res.data);
      setIsLoading(false);
    }
  };

  const handleApproval = async (data: any) => {
    if (rowSelected?.id) {
      if (match.params.key === 'posts') {
        let res = await UDReportStatusApi(rowSelected?.id, 'patch', data);
        if (res.status === 200) {
          setListReport(() =>
            listReport.filter((item: any) => item?.id !== rowSelected?.id)
          );
          setTotal(prev => prev - 1);
        }
      } else {
        let res = await UDReportApi(rowSelected?.id, 'patch', data);
        if (res.status === 200) {
          setListReport(prev =>
            prev.map(item =>
              item?.id === rowSelected?.id
                ? {
                    ...item,
                    report_violation_status: data.report_violation_status
                  }
                : item
            )
          );
        }
      }
    }
  };

  const handleDeleteReport = async () => {
    let res =
      match.params.key === 'posts'
        ? await UDReportStatusApi(rowSelected?.id, 'delete', null)
        : await UDReportApi(rowSelected?.id, 'delete', null);
    if (res.status === 200) {
      setListReport(() =>
        listReport.filter((item: any) => item?.id !== rowSelected?.id)
      );
      setTotal(prev => prev - 1);
    }
  };

  React.useEffect(() => {
    let { key } = match.params;
    switch (key) {
      case 'posts':
        getListReportStatus();
        break;
      case 'users':
        getListReport({
          entity_type: 'Account'
        });
        break;
      case 'pages':
        getListReport({
          entity_type: 'Page'
        });
        break;
      case 'groups':
        getListReport({
          entity_type: 'Group'
        });
        break;
      default:
        getListReport({});
        break;
    }
  }, [match.params]);

  const iconStyle = { fontSize: '20px' };

  const listOptions = [
    {
      id: 'approved',
      label: 'Duyệt',
      icon: <TaskAltIcon />,
      styleIcon: iconStyle,
      action: () => {
        setOpenDialogConfirmApproved(true);
      }
    },
    {
      id: 'rejected',
      label: 'Từ chối',
      icon: <DoDisturbIcon />,
      styleIcon: iconStyle,
      action: () => {
        setOpenDialogConfirmDelete(true);
      }
    },
    {
      id: 'limited',
      label: 'Giới hạn phân phối',
      icon: <FaceRetouchingOffSharpIcon />,
      styleIcon: iconStyle,
      action: () => {}
    },
    {
      id: 'send',
      label: 'Gửi lên cấp trên',
      icon: <IosShareSharpIcon />,
      styleIcon: iconStyle,
      action: () => {}
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
      key:
        match.params.key === 'users'
          ? 'target_account'
          : match.params.key === 'pages'
          ? 'page'
          : match.params.key === 'groups'
          ? 'group'
          : 'statuses',
      label: t('Id bị báo cáo'),
      required: true,
      span: 6
    },
    // {
    //   type:
    //     match.params.key === 'users'
    //       ? 'display_name'
    //       : match.params.key === 'pages'
    //       ? 'page_title'
    //       : match.params.key === 'groups'
    //       ? 'group_title'
    //       : 'statuses',
    //   key:
    //     match.params.key === 'users'
    //       ? 'display_name'
    //       : match.params.key === 'pages'
    //       ? 'page_title'
    //       : match.params.key === 'groups'
    //       ? 'group_title'
    //       : 'statuses',
    //   label: t('Tên'),
    //   required: true,
    //   span: 6
    // },
    {
      type: 'type',
      key:
        match.params.key === 'users'
          ? 'Tài khoản'
          : match.params.key === 'pages'
          ? 'Trang'
          : match.params.key === 'groups'
          ? 'Nhóm'
          : 'Bài viết',
      label: t('Loại'),
      required: true,
      span: 6
    },
    {
      type: 'object',
      key: 'report_category',
      label: t('Lý do'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: match.params.key === 'posts' ? 'comment' : 'note',
      label: t('Chi tiết lý do'),
      required: true,
      span: 6
    },
    {
      type: 'object',
      key: 'account',
      label: t('Id tài khoản báo cáo'),
      required: true,
      span: 6
    },
    {
      type: 'status',
      key:
        match.params.key === 'posts'
          ? 'report_status'
          : 'report_violation_status',
      label: t('Trạng thái'),
      required: true,
      span: 6
    }
  ];

  return (
    <Box className={classes.root}>
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
      ) : listReport?.length ? (
        <BaseTable
          header={fields}
          data={listReport}
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
      {openDialogRejected && (
        <DialogRejected
          open={openDialogRejected}
          handleClose={() => setOpenDialogRejected(false)}
          action={() => {
            handleApproval({ report_violation_status: 'rejected' });
          }}
          text={`Bạn có chắc từ chối báo cáo ${rowSelected?.id}?`}
          noComment
        />
      )}
      {openDialogConfirmApproved && (
        <DialogConfirm
          open={openDialogConfirmApproved}
          handleClose={() => setOpenDialogConfirmApproved(false)}
          action={() => {
            if (match.params.key === 'posts') {
              handleApproval({
                report_status: 'approved'
              });
              handleDeletePost(rowSelected?.statuses.id);
            } else {
              handleApproval({
                report_violation_status: 'approved'
              });
            }
          }}
          title="Xác nhận phê duyệt"
          text={`Bạn có chắc phê duyệt báo cáo ${rowSelected?.id} ?`}
          labelButton="Duyệt"
        />
      )}
      {openDialogConfirmDelete && (
        <DialogConfirmDelete
          open={openDialogConfirmDelete}
          handleClose={() => setOpenDialogConfirmDelete(false)}
          action={() => handleDeleteReport()}
          title="Xóa báo cáo"
          text={`Bạn có chắc muốn xóa báo cáo ${rowSelected?.id} ?`}
          labelButton="Xóa"
        />
      )}
    </Box>
  );
}
