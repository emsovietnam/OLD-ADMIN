import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DoneIcon from '@mui/icons-material/Done';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';
import NotesIcon from '@mui/icons-material/Notes';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SchoolIcon from '@mui/icons-material/School';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TaskIcon from '@mui/icons-material/Task';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import FeedIcon from '@mui/icons-material/Feed';
import { Drawer, Toolbar } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PATHS } from 'src/constants/paths';
import ListButton from '../List/ListButton';

const DRAWER_WIDTH = 240;
const theme = createTheme();
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: 'white'
  },
  drawerOpen: {
    overflow: 'hidden',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    // backgroundColor: `${theme.palette.myBackgroundColor?.secondary} !important`
    backgroundColor: '#373737'
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: 53
    },
    // backgroundColor: `${theme.palette.myBackgroundColor?.secondary} !important`
    backgroundColor: '#373737'
  },

  list: {},
  listItem: {
    '&:hover': {
      backgroundColor: '#e5e5e5',
      '& span': {
        color: '#000'
      },
      '& div i': {
        color: '#000'
      }
    }
  },
  listItemSelect: {
    backgroundColor: '#5e5e5e',
    '& span': {
      color: '#000',
      fontSize: 'white',
      fontWeight: 700
    },
    '& div i': {
      color: '#000',
      fontSize: 'white',
      fontWeight: 700
    }
  },
  listIconOpen: {
    minWidth: '30px !important'
  },
  listIconClose: {},
  icon: {
    textAlign: 'center',
    '& i': {
      fontSize: 18,
      color: '#828282'
    }
  },
  textIcon: {
    fontSize: 16,
    fontWeight: 400,
    color: '#828282'
  },
  textHeader: {
    padding: 10,
    fontSize: 20,
    fontWeight: 400,
    color: '#000 !important',
    height: 38
  }
}));

const InitialDataItems = [
  {
    text: 'Report',
    icon: <i className="fas fa-cog"></i>,
    link: PATHS.REPORT
  },
  {
    text: 'Learn Space',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.HOME
  },
  {
    text: 'Grow Space',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.PROJECT
  },
  {
    text: 'Banner',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.CAMPAIGNS
  },
  {
    text: 'Product',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.PRODUCT
  },
  {
    text: 'Post Chart',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.POST_CHART
  },
  {
    text: 'Bảng tin',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.FEED
  },
  {
    text: 'Khiếu nại',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.COMPLAIN
  },
  {
    text: 'Báo lỗi hệ thống',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.REPORT_SYSTEM_ERROR
  },
  {
    text: 'Xác minh',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.VERIFY
  },
  {
    text: 'Tài khoản quảng cáo',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.ADVERTISING_ACCOUNT
  },
  {
    text: 'Đối soát tài chính',
    icon: <i className="fas fa-smile-wink"></i>,
    link: PATHS.FINANCIAL_CONTROL
  }
];

export default function MiniDrawer(props) {
  let { title, icon, dataItems } = props;
  const classes = useStyles();
  const history = useHistory();
  const match: any = useRouteMatch();
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState<any>('home');
  if (!dataItems) dataItems = InitialDataItems;

  const listMenuReport = [
    {
      id: 'report',
      title: 'Báo cáo vi phạm',
      styleTitle: { fontWeight: '600' },
      icon: <ReportIcon />,
      action: () => {
        history.push(PATHS.REPORT);
      },
      accordion: true,
      style: { height: 36, width: 36 },
      styleButton: { marginLeft: '-5px' },
      position: 'top',
      itemChildren: [
        {
          id: 'posts',
          title: 'Bài viết',
          styleTitle: { fontWeight: '400' },
          styleChildren: { marginTop: '5px' },
          icon: <NotesIcon />,
          action: () => {
            history.push(`/report/posts`);
          }
        },
        {
          id: 'users',
          title: 'Người dùng',
          styleTitle: { fontWeight: '400' },
          icon: <PersonIcon />,
          action: () => {
            history.push(`/report/users`);
          }
        },
        {
          id: 'pages',
          title: 'Trang',
          styleTitle: { fontWeight: '400' },
          icon: <FlagIcon />,
          action: () => {
            history.push(`/report/pages`);
          }
        },
        {
          id: 'groups',
          title: 'Nhóm',
          styleTitle: { fontWeight: '400' },
          icon: <GroupsIcon />,
          action: () => {
            history.push(`/report/groups`);
          }
        }
      ]
    },
    {
      id: 'learnSpace',
      title: 'Learn Space',
      styleTitle: { fontWeight: '600' },
      icon: <SchoolIcon />,
      action: () => {
        history.push(PATHS.HOME);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'growSpace',
      title: 'Grow Space',
      styleTitle: { fontWeight: '600' },
      icon: <PaidIcon />,
      accordion: true,
      // action: () => {
      //   history.push(PATHS.PROJECT);
      // },
      style: { height: 36, width: 36 },
      styleButton: { marginLeft: '-5px' },
      position: 'top',
      itemChildren: [
        {
          id: 'growSpace',
          title: 'Phê duyệt dự án',
          styleTitle: { fontWeight: '400' },
          styleChildren: { marginTop: '5px' },
          icon: <VerifiedUserIcon />,
          action: () => {
            history.push(PATHS.PROJECT);
          }
        },
        {
          id: 'growSpace_report',
          title: 'Báo cáo dự án',
          styleTitle: { fontWeight: '400' },
          icon: <TaskIcon />,
          action: () => {
            history.push(`/projects/growSpace_report`);
          }
        }
      ]
    },
    {
      id: 'campaign',
      title: 'Campaign',
      styleTitle: { fontWeight: '600' },
      icon: <ViewCarouselIcon />,
      action: () => {
        history.push(PATHS.CAMPAIGNS);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'product',
      title: 'Thông tin sản phẩm',
      styleTitle: { fontWeight: '600' },
      icon: <EventNoteOutlinedIcon />,
      action: () => {
        history.push(PATHS.PRODUCT);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'post_chart',
      title: 'Thống kê',
      styleTitle: { fontWeight: '600' },
      icon: <BarChartIcon />,
      action: () => {
        history.push(PATHS.POST_CHART);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'feed',
      title: 'Bảng tin',
      styleTitle: { fontWeight: '600' },
      icon: <FeedIcon />,
      action: () => {
        history.push(PATHS.FEED);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'complain',
      title: 'Khiếu nại',
      styleTitle: { fontWeight: '600' },
      icon: <PhoneInTalkIcon />,
      action: () => {
        history.push(PATHS.COMPLAIN);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'report_system_error',
      title: 'Báo lỗi hệ thống',
      styleTitle: { fontWeight: '600' },
      icon: <ReportProblemIcon />,
      action: () => {
        history.push(PATHS.REPORT_SYSTEM_ERROR);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'verify',
      title: 'Xác minh',
      styleTitle: { fontWeight: '600' },
      icon: <VerifiedIcon />,
      action: () => {
        history.push(PATHS.VERIFY);
      },
      accordion: true,
      style: { height: 36, width: 36 },
      styleButton: { marginLeft: '-5px' },
      position: 'top',
      itemChildren: [
        {
          id: 'verify_users',
          title: 'Xác minh người dùng',
          styleTitle: { fontWeight: '400' },
          styleChildren: { marginTop: '5px' },
          icon: <VerifiedUserIcon />,
          action: () => {
            history.push(`/verifies/users`);
          }
        },
        {
          id: 'verify_pages',
          title: 'Xác minh trang',
          styleTitle: { fontWeight: '400' },
          icon: <TaskIcon />,
          action: () => {
            history.push(`/verifies/pages`);
          }
        },
        {
          id: 'public_figure',
          title: 'Người của công chúng',
          styleTitle: { fontWeight: '400' },
          icon: <DoneIcon />,
          action: () => {
            history.push(`/verifies/public_figures`);
          }
        }
      ]
    },
    {
      id: 'advertising_account',
      title: 'Tài khoản quảng cáo',
      styleTitle: { fontWeight: '600' },
      icon: <SupervisedUserCircleIcon />,
      action: () => {
        history.push(PATHS.ADVERTISING_ACCOUNT);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    },
    {
      id: 'financial_control',
      title: 'Đối soát tài chính',
      styleTitle: { fontWeight: '600' },
      icon: <AttachMoneyIcon />,
      action: () => {
        history.push(PATHS.FINANCIAL_CONTROL);
      },
      style: { height: 36, width: 36 },
      position: 'top'
    }
  ];

  React.useEffect(() => {
    let { key } = match?.params;
    switch (match.path) {
      case PATHS.REPORT:
        setSelectedIndex('report');
        break;
      case PATHS.REPORT_MINE:
        if (key) {
          setSelectedIndex(key);
        } else {
          setSelectedIndex('report');
        }
        break;
      case PATHS.PROJECT:
        setSelectedIndex('growSpace');
        break;
      case PATHS.PROJECT_MINE:
        if (key) {
          setSelectedIndex(key);
        } else {
          setSelectedIndex('growSpace');
        }
        break;
      case PATHS.CAMPAIGNS:
        setSelectedIndex('campaign');
        break;
      case PATHS.PRODUCT:
        setSelectedIndex('product');
        break;
      case PATHS.POST_CHART:
        setSelectedIndex('post_chart');
        break;
      case PATHS.FEED:
        setSelectedIndex('feed');
        break;
      case PATHS.COMPLAIN:
        setSelectedIndex('complain');
        break;
      case PATHS.REPORT_SYSTEM_ERROR:
        setSelectedIndex('report_system_error');
        break;
      case PATHS.VERIFY_SUBJECT:
        if (key) {
          setSelectedIndex(key);
        } else {
          setSelectedIndex('verify');
        }
        break;
      case PATHS.VERIFY:
        setSelectedIndex('verify');
        break;
      case PATHS.FINANCIAL_CONTROL:
        setSelectedIndex('financial_control');
        break;
      case PATHS.ADVERTISING_ACCOUNT:
        setSelectedIndex('advertising_account');
        break;
      default:
        setSelectedIndex('learnSpace');
    }
  }, [match.path, JSON.stringify(match.params)]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const renderIcons = () => {
    return (
      <>
        <p className={classes.textHeader}>{openDrawer ? `${title}` : icon}</p>
        <ListButton
          item={listMenuReport.filter(el => el.position === 'top')}
          selectedItem={selectedIndex}
          width={'250px'}
          styleAccordionDetail={{ padding: '3px 10px' }}
        />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Drawer
        style={{ zIndex: 10 }}
        onMouseEnter={handleDrawerOpen}
        // onMouseLeave={handleDrawerClose}
        variant="persistent"
        anchor={'left'}
        open={true}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer
          })
        }}
        // hideBackdrop={true}
      >
        <Toolbar />
        {renderIcons()}
      </Drawer>
    </div>
  );
}
