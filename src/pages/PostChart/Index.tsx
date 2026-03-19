import { Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDataChartApi } from 'src/apis/socialDashboard.api';
import { bgColor, borderColor } from 'src/store/common';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    width: '70%'
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: 'calc(100vh - 164px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [timePeriod, setTimePeriod] = useState(1);
  const [dataChart, setDataChart] = useState({});

  const getDataChart = async params => {
    let res = await getDataChartApi(params);
    if (res.status === 200) {
      setDataChart(res.data);
    }
  };

  React.useEffect(() => {
    getDataChart({ date: 1 });
    return () => setDataChart({});
  }, []);

  const handleTimePeriodChange = event => {
    getDataChart({ date: event.target.value });
    setTimePeriod(event.target.value);
  };

  const convertString = data => {
    switch (data) {
      case 'account_avatar':
        return 'Ảnh đại diện người dùng';
      case 'account_banner':
        return 'Ảnh bìa người dùng';
      case 'event_banner':
        return 'Ảnh bìa sự kiện';
      case 'event_shared':
        return 'Sự kiện được chia sẻ';
      case 'group_banner':
        return 'Ảnh bìa nhóm';
      case 'livestream':
        return 'Livestream';
      case 'media':
        return 'Media';
      case 'moment':
        return 'Khoảnh khắc';
      case 'page_avatar':
        return 'Ảnh đại diện Trang';
      case 'page_banner':
        return 'Ảnh bìa Trang';
      case 'project_banner':
        return 'Ảnh bìa Dự án';
      case 'question':
        return 'Câu hỏi';
      case 'rating':
        return 'Đánh giá';
      case 'status':
        return 'Bài viết';
      case 'target':
        return 'Đặt mục tiêu';
      case 'user':
        return 'Tài khoản';
      case 'watch':
        return 'Watch';
    }
  };

  let dataValues = Object.keys(dataChart)?.length
    ? Object.values(dataChart)
    : [0, 0, 0, 0];

  const data: any = {
    labels: Object.keys(dataChart)?.length
      ? Object.keys(dataChart).map(label => convertString(label))
      : ['Bài viết', 'Khoảnh khắc', 'Watch', 'Tài khoản mới'],
    datasets: [
      {
        backgroundColor: Object.keys(dataChart)?.length
          ? bgColor.slice(0, Object.keys(dataChart)?.length)
          : bgColor.slice(0, 4),
        borderColor: Object.keys(dataChart)?.length
          ? borderColor.slice(0, Object.keys(dataChart)?.length)
          : borderColor.slice(0, 4),
        borderWidth: 1,
        data: dataValues // Giá trị dữ liệu
      }
    ]
  };

  // Cấu hình biểu đồ
  const options: ChartOptions<'bar'> = {
    // responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000000'
      },
      legend: {
        display: false // Ẩn hiển thị legend
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  } as any;
  return (
    <Box
      sx={{
        marginLeft: '250px',
        marginTop: '65px',
        backgroundColor: '#fff'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          marginBottom: '10px',
          backgroundColor: '#fff',
          padding: '10px 20px'
        }}
      >
        <Typography variant="h4">Thống kê</Typography>
        <FormControl>
          <Select
            labelId="time-period-label"
            value={timePeriod}
            onChange={handleTimePeriodChange}
          >
            <MenuItem value="1">1 Ngày trước</MenuItem>
            <MenuItem value="3">3 Ngày trước</MenuItem>
            <MenuItem value="7">1 Tuần trước</MenuItem>
            <MenuItem value="30">1 Tháng trước</MenuItem>
            <MenuItem value="90">3 Tháng trước</MenuItem>
            <MenuItem value="180">6 Tháng trước</MenuItem>
            <MenuItem value="365">1 Năm trước</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className={classes.container}>
        <Box className={classes.root}>
          <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
