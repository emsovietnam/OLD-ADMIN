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
import {
  approvalCourse,
  deleteCourseApi,
  getCalendarCourseApi
} from 'src/apis/socialCourse.api';
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
    backgroundColor: '#fff'
  }
}));

export default function BasicTable(props) {
  const { refScroll } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [listCourse, setListCourse] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<any>(true);
  const [listCourseFilter, setListCourseFilter] = React.useState<any>([]);
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
    perPage: 5,
    search: '',
    status: ''
  } as any);

  const handleChangePaginate = paginate => {
    setFilters(preValue => {
      let temp = cloneDeep(preValue);
      temp.page = paginate.page;
      temp.perPage = paginate.perPage;
      return temp;
    });
  };

  const getListCourse = async () => {
    let res: any = await getCalendarCourseApi({});
    if (res.status === 200) {
      setTotal(() => res.data?.meta?.total);
      setListCourse(() =>
        res.data?.data?.filter?.(item => item?.status !== 'draft')
      );
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (filters.status && filters.status !== 'all') {
      setListCourseFilter(() =>
        listCourse?.filter(item => item.status === filters.status)
      );
    }
  }, [filters?.status]);

  React.useEffect(() => {
    if (
      listCourseFilter?.length &&
      filters?.status &&
      filters?.status !== 'all'
    ) {
      setTotal(() => listCourseFilter?.length);
    }
  }, [listCourseFilter?.length, filters?.status]);

  const handleApproval = async (data: any) => {
    if (rowSelected?.id) {
      let res = await approvalCourse(rowSelected?.id, data);
      if (res.status === 200) {
        setListCourse(prev =>
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
  };

  const handleDeleteCourse = async () => {
    let res = await deleteCourseApi(rowSelected?.id);
    if (res.status === 200) {
      setListCourse(() =>
        listCourse.filter((item: any) => item?.id !== rowSelected?.id)
      );
    }
  };

  React.useEffect(() => {
    getListCourse();
  }, []);

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

    // [
    //   {
    //     id: 'delete',
    //     label: 'Xóa',
    //     icon: 'fa-light fa-user-gear',
    //     styleIcon: iconStyle,
    //     action: () => {
    //       setOpenDialogConfirmDelete(true);
    //     }
    //   },
    //   {
    //     id: 'limited',
    //     label: 'Giới hạn phân phối',
    //     icon: 'fa-light fa-user-gear',
    //     styleIcon: iconStyle,
    //     action: () => {}
    //   },
    //   {
    //     id: 'send',
    //     label: 'Gửi lên cấp trên',
    //     icon: 'fa-light fa-user-gear',
    //     styleIcon: iconStyle,
    //     action: () => {}
    //   }
    // ]
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
      label: t('Tên khóa học'),
      required: true,
      span: 6
    },
    {
      type: 'object',
      key: 'course_category',
      label: t('Danh mục'),
      required: true,
      span: 6
    },
    {
      type: 'Currency',
      key: 'price',
      label: t('Giá'),
      required: true,
      span: 6
    },
    {
      type: 'string',
      key: 'age_restrictions',
      label: t('Đối tượng hướng đến'),
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
      key: 'free',
      label: t('Miễn phí'),
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

  const handleClickPipeline = value => {
    if (value) {
      setFilters(prev => ({
        ...prev,
        status: value.id,
        page: 0
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        status: '',
        page: 0
      }));
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapPipeLine}>
        <PipelineButton
          dataItems={pipeLineData}
          onChange={value => handleClickPipeline(value)}
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
      ) : (
        <BaseTable
          header={fields}
          data={
            filters?.status && filters?.status !== 'all'
              ? listCourseFilter
              : listCourse
          }
          renderManage={renderManage}
          page={filters.page}
          perPage={filters.perPage}
        />
      )}

      {total > 0 && (
        <BasePaginate
          total={total}
          handleChange={handleChangePaginate}
          rowsPerPage={filters.perPage}
        />
      )}

      {openDialogRejected && (
        <DialogRejected
          open={openDialogRejected}
          handleClose={() => setOpenDialogRejected(false)}
          action={handleApproval}
          text={`Lý do từ chối khóa học ${rowSelected?.title}`}
        />
      )}
      {openDialogConfirmApproved && (
        <DialogConfirm
          open={openDialogConfirmApproved}
          handleClose={() => setOpenDialogConfirmApproved(false)}
          action={() =>
            handleApproval({
              status: 'approved',
              note: 'Đã phê duyệt'
            })
          }
          title="Xác nhận phê duyệt"
          text={`Bạn có chắc phê duyệt khóa học ${rowSelected?.title} ?`}
          labelButton="Duyệt"
        />
      )}
      {openDialogConfirmDelete && (
        <DialogConfirmDelete
          open={openDialogConfirmDelete}
          handleClose={() => setOpenDialogConfirmDelete(false)}
          action={() => handleDeleteCourse()}
          title="Xóa khóa học"
          text={`Bạn có chắc muốn xóa khóa học ${rowSelected?.title} ?`}
          labelButton="Xóa"
        />
      )}
    </Box>
  );
}
