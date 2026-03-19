import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work
import {
  convertISO8086toLTime,
  formatDateTimeToStringDateTimeYear
} from 'src/common/string';
moment.locale('vi');

export const handlePrice = (value: string | number) =>
  Number(value).toLocaleString() + ' đ';

export const handleNumber = (value: string | number) =>
  Number(value).toLocaleString();

export const handleEcoin = (value: string | number) =>
  Number(value).toLocaleString('en');

export const handleTimeShow = (value: string) => {
  if (!value) return;
  let time = new Date(value);
  let currentDate = new Date();
  let timeDiff = Math.abs(currentDate.getTime() - time.getTime());
  let diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let yearTime = time.getFullYear();
  let yearNow = new Date().getFullYear();

  try {
    if (yearTime == yearNow) {
      let timeShow = moment(time).fromNow();

      if (timeShow === 'vài giây tới') {
        return 'Vài giây trước';
      } else {
        var thenum: any = JSON.stringify(timeShow).match(/\d+/);

        if (thenum && +thenum[0] >= 7 && moment(time).calendar().length <= 10) {
          return `${formatDateTimeToStringDateTimeYear(
            time
          )}, lúc ${convertISO8086toLTime(time)}`;
        } else if (
          thenum &&
          +thenum[0] < 7 &&
          moment(time).calendar().length <= 10
        ) {
          return `${formatDateTimeToStringDateTimeYear(
            time
          )}, lúc ${convertISO8086toLTime(time)}`;
        } else {
          return timeShow[0].toUpperCase() + timeShow.slice(1);
        }
      }
    } else {
      if (diffInDays < 7) {
        return `${diffInDays} ngày`;
      } else if (diffInDays >= 7 && diffInDays < 14) {
        return `${diffInDays} tuần`;
      } else if (diffInDays >= 14) {
        return `${Math.floor(diffInDays / 7)} tuần`;
      }
    }
  } catch (error) {
    return 'lỗi ngày';
  }
};

// get time Feb 1, 2021 12:01 AM
export const handleTimeExac = (values: string) => {
  let time = new Date(values);
  try {
    if (time) {
      let timeShow = moment(time).format('lll');
      return timeShow;
    }
  } catch (error) {
    return '';
  }
};

export const getTimeNowUTC = () => {
  let time = moment().toISOString();
  let strTime = time.slice(0, -5);
  let timeFormat = strTime + 'Z';
  return timeFormat;
};

export const formatTimeToUTC = (value: string) => {
  try {
    let time = moment(value).toISOString();
    let strTime = time.slice(0, -5);
    let timeFormat = strTime + 'Z';
    return timeFormat;
  } catch (error) {
    return '';
  }
};

export const upCaseFirstString = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const countTimeFrom = (d1, d2) => {
  let DateDiff = {
    inDays: function (d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    },

    inWeeks: function (d1, d2) {
      var t2 = d2.getTime();
      var t1 = d1.getTime();

      return parseInt(((t2 - t1) / (24 * 3600 * 1000 * 7)) as any);
    },

    inMonths: function (d1, d2) {
      var d1Y = d1.getFullYear();
      var d2Y = d2.getFullYear();
      var d1M = d1.getMonth();
      var d2M = d2.getMonth();

      return d2M + 12 * d2Y - (d1M + 12 * d1Y);
    },

    inYears: function (d1, d2) {
      return d2.getFullYear() - d1.getFullYear();
    }
  };
  if (DateDiff.inDays(d1, d2) <= 31) {
    return DateDiff.inDays(d1, d2) + ' ngày';
  } else if (DateDiff.inWeeks(d1, d2) <= 52) {
    return DateDiff.inWeeks(d1, d2) + ' tuần';
  } else {
    return DateDiff.inYears(d1, d2) + ' năm';
  }
};

export function formatDateTime(dateTimeStr) {
  const dateTime = new Date(dateTimeStr);
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const date = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear().toString();
  return `${hours}:${minutes} ${date}-${month}-${year}`;
}

export const convertMoney = (num: number) => {
  if (num >= 1000000000 && num < 1000000000000) {
    if (num % 1000000000 === 0) return num / 1000000000 + ' tỉ';
    else return (num / 1000000000).toFixed(1) + ' tỉ';
  }
  if (num >= 1000000 && num < 1000000000) {
    if (num % 1000000 === 0) return num / 1000000 + ' triệu';
    else return (num / 1000000).toFixed(1) + ' triệu';
  }
  if (num >= 1000 && num < 1000000) {
    if (num % 1000 === 0) return num / 1000 + ' nghìn';
    return (num / 1000).toFixed(1) + ' nghìn';
  }
  if (num >= 1000000000000) {
    if (num % 1000000000000 === 0) return num / 1000000000000 + ' nghìn tỉ';
    return (num / 1000000000000).toFixed(1) + ' nghìn tỉ';
  }

  return num;
};

export const convertMoneyFormBillion = (num: number) => {
  if (num >= 100_000_000 && num < 1000000000) {
    if (num % 1000000 === 0) return num / 1000000 + ' triệu';
    else return (num / 1000000).toFixed(1) + ' triệu';
  }
  if (num >= 1000000000 && num < 1000000000000) {
    if (num % 1000000000 === 0) return num / 1000000000 + ' tỉ';
    else return (num / 1000000000).toFixed(1) + ' tỉ';
  }
  if (num >= 1000000000000) {
    if (num % 1000000000000 === 0) return num / 1000000000000 + ' nghìn tỉ';
    return (num / 1000000000000).toFixed(1) + ' nghìn tỉ';
  }

  return num;
};

export const convertMoneyToVietnameseDongString = (num: number) => {
  const MILLION = 1000000;
  const BILLION = 1000000000;
  const TRILLION = 1000000000000;
  if (typeof num !== 'number') {
    return;
  }
  if (num >= BILLION && num < TRILLION) {
    const numInBillions = num / BILLION;
    if (num % BILLION === 0) {
      return `${numInBillions.toLocaleString('vi-VN', {
        // style: 'currency'
        // currency: 'VND'
      })} tỉ ₫`;
    } else {
      return `${numInBillions.toFixed(1)} tỉ ₫`;
    }
  } else if (num >= TRILLION) {
    const numInTrillions = num / TRILLION;
    if (num % TRILLION === 0) {
      return `${numInTrillions.toLocaleString('vi-VN', {
        // style: 'currency'
        // currency: 'VND'
      })} nghìn tỉ ₫`;
    } else {
      return `${numInTrillions.toFixed(1)} nghìn tỉ ₫`;
    }
  } else if (num >= MILLION) {
    const numInMillions = num / MILLION;
    if (num % MILLION === 0) {
      return `${numInMillions.toLocaleString('vi-VN', {
        // style: 'currency'
        // currency: 'VND'
      })} triệu ₫`;
    } else {
      return `${numInMillions.toFixed(1)} triệu ₫`;
    }
  } else {
    return num
      .toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
      .replace(/\./g, '.');
  }
};
