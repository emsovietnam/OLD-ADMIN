import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import FaceRetouchingOffSharpIcon from '@mui/icons-material/FaceRetouchingOffSharp';
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  approvalProject,
  deleteProjectApi,
  getCalendarProjectApi
} from 'src/apis/socialProject.api';
import { UDReportApi, getReportApi } from 'src/apis/socialReport.api';
import ButtonOptions from 'src/components/Button/ButtonOptions';
import {
  default as DialogConfirm,
  default as DialogConfirmDelete
} from 'src/components/Dialog/DialogConfirm';
import DialogRejected from 'src/components/Dialog/DialogRejected';
import BasePaginate from 'src/components/Paginate/BasePaginate';
import PipelineButton from 'src/components/Pipeline/PipelineButton';
import BaseTable from 'src/components/Table/BaseTable';
import { pipeLineData } from 'src/constants/common';

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
  const [listProject, setListProject] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(true);
  const [listProjectFilter, setListProjectFilter] = React.useState<any>([]);
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
    search: '',
    status: ''
  } as any);

  React.useEffect(() => {
    if (filters.status) {
      setListProjectFilter(() =>
        listProject?.filter(item => item.status === filters.status)
      );
    }
  }, [filters?.status]);

  React.useEffect(() => {
    if (listProjectFilter?.length) {
      setTotal(() => listProjectFilter?.length);
    }
  }, [listProjectFilter?.length]);

  const handleChangePaginate = paginate => {
    setFilters(preValue => {
      let temp = cloneDeep(preValue);
      temp.page = paginate.page;
      temp.perPage = paginate.perPage;
      return temp;
    });
  };

  const getListProject = async () => {
    let res: any = await getCalendarProjectApi({});
    if (res.status === 200) {
      setTotal(() => res.data?.meta?.total);
      setListProject(() => res.data.data);
      setIsLoading(false);
    }
  };

  const getListProjectReport = async (params: any) => {
    let res = await getReportApi(params);
    if (res.status === 200) {
      setTotal(() => res.data?.length);
      setListProject(() => res.data);
      setIsLoading(false);
    }
  };

  const handleApproval = async (data: any) => {
    if (rowSelected?.id) {
      if (match.params.key === 'growSpace_report') {
        let res = await UDReportApi(rowSelected?.id, 'patch', data);
        if (res.status === 200) {
          setListProject(prev =>
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
      } else {
        let res = await approvalProject(rowSelected?.id, data);
        if (res.status === 200) {
          setListProject(prev =>
            prev.map(item =>
              item?.id === rowSelected?.id
                ? {
                    ...item,
                    status: data.status
                  }
                : item
            )
          );
        }
      }
    }
  };

  React.useEffect(() => {
    if (filters.status && filters.status !== 'all') {
      setListProjectFilter(() =>
        listProject?.filter(item => item.status === filters.status)
      );
    }
  }, [filters?.status]);

  React.useEffect(() => {
    if (
      listProjectFilter?.length &&
      filters?.status &&
      filters?.status !== 'all'
    ) {
      setTotal(() => listProjectFilter?.length);
    }
  }, [listProjectFilter?.length, filters?.status]);

  const handleDeleteProject = async () => {
    let res = await deleteProjectApi(rowSelected?.id);
    if (res.status === 200) {
      setListProject(() =>
        listProject.filter((item: any) => item?.id !== rowSelected?.id)
      );
    }
  };

  React.useEffect(() => {
    let { key } = match.params;
    if (key) {
      getListProjectReport({
        entity_type: 'Project'
      });
    } else {
      getListProject();
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
        setOpenDialogRejected(true);
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
      key: 'title',
      label: t('Tên dự án'),
      required: true,
      span: 6
    },
    {
      type: 'object',
      key: 'category',
      label: t('Danh mục'),
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
      type: 'Currency',
      key: 'target_value',
      label: t('Số vốn kêu gọi'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'address',
      label: t('Địa chỉ'),
      required: true,
      span: 6
    },
    {
      type: 'number',
      key: 'phone_number',
      label: t('Số điện thoại'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'status',
      label: t('Trạng thái'),
      required: true,
      span: 6
    }
  ];

  const fieldsReport = [
    {
      type: 'number',
      key: 'id',
      label: t('Id'),
      required: true,
      span: 6
    },
    {
      type: 'object',
      key: 'project',
      label: t('Id bị báo cáo'),
      required: true,
      span: 6
    },
    {
      type: 'project_title',
      key: 'project_title',
      label: t('Tên dự án'),
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
      key: 'note',
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
      key: 'report_violation_status',
      label: t('Trạng thái'),
      required: true,
      span: 6
    }
  ];

  const handleClickPipeline = value => {
    if (value) {
      setFilters(prev => ({
        ...prev,
        status: value.id
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        status: ''
      }));
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapPipeLine}>
        {match.params.key !== 'growSpace_report' ? (
          <PipelineButton
            dataItems={pipeLineData}
            onChange={value => handleClickPipeline(value)}
          />
        ) : null}
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
      ) : (
        <BaseTable
          header={
            match.params.key !== 'growSpace_report' ? fields : fieldsReport
          }
          data={
            filters?.status && filters?.status !== 'all'
              ? listProjectFilter
              : listProject
          }
          renderManage={renderManage}
          page={filters.page}
          perPage={filters.perPage}
        />
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
            if (match.params.key === 'growSpace_report') {
              handleApproval({
                report_violation_status: 'rejected'
              });
            } else {
              handleApproval({
                status: 'rejected',
                note: 'Từ chối phê duyệt'
              });
            }
          }}
          text={`Lý do từ chối dự án ${
            match.params.key === 'growSpace_report'
              ? rowSelected?.project.title
              : rowSelected?.title
          }`}
        />
      )}
      {openDialogConfirmApproved && (
        <DialogConfirm
          open={openDialogConfirmApproved}
          handleClose={() => setOpenDialogConfirmApproved(false)}
          action={() => {
            if (match.params.key === 'growSpace_report') {
              handleApproval({
                report_violation_status: 'approved'
              });
            } else {
              handleApproval({
                status: 'approved',
                note: 'Đã phê duyệt'
              });
            }
          }}
          title="Xác nhận phê duyệt"
          text={`Bạn có chắc phê duyệt dự án ${
            match.params.key === 'growSpace_report'
              ? rowSelected.project.title
              : rowSelected?.title
          } ?`}
          labelButton="Duyệt"
        />
      )}
      {openDialogConfirmDelete && (
        <DialogConfirmDelete
          open={openDialogConfirmDelete}
          handleClose={() => setOpenDialogConfirmDelete(false)}
          action={() => handleDeleteProject()}
          title="Xóa khóa học"
          text={`Bạn có chắc muốn xóa dự án ${rowSelected?.title} ?`}
          labelButton="Xóa"
        />
      )}
    </Box>
  );
}
