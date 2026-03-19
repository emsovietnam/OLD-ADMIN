import moment from 'moment';
let dayOfWeekArray: any = [
  { eng: 'Mon', vi: 'Thứ hai' },
  { eng: 'Tue', vi: 'Thứ ba' },
  { eng: 'Wed', vi: 'Thứ tư' },
  { eng: 'Thu', vi: 'Thứ năm' },
  { eng: 'Fri', vi: 'Thứ sáu' },
  { eng: 'Sat', vi: 'Thứ bảy' },
  { eng: 'Sun', vi: 'Chủ nhật' }
];
let monOfYear: any = [
  { eng: 'Jan', num: 1 },
  { eng: 'Feb', num: 2 },
  { eng: 'Mar', num: 3 },
  { eng: 'Apr', num: 4 },
  { eng: 'May', num: 5 },
  { eng: 'Jun', num: 6 },
  { eng: 'Jul', num: 7 },
  { eng: 'Aug', num: 8 },
  { eng: 'Sep', num: 9 },
  { eng: 'Oct', num: 10 },
  { eng: 'Nov', num: 11 },
  { eng: 'Dec', num: 12 }
];

export const handlePrice = (value: string | number) =>
  Number(value).toLocaleString('en') + ' đ';

export const upCaseFirstString = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
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

export const collapseString = (text: string, value: number) => {
  let strCollapse = text;
  if (text?.length > value) {
    strCollapse = text.slice(0, value) + '...';
  }
  return strCollapse;
};

export const formatDateTimeToDatePicker = (values: any) => {
  var d = new Date(values),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
export const formatDateTimeToDate = (values: any) => {
  if (values) {
    var d = new Date(values),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day} Tháng ${month}, ${year}`;
  } else {
    return '';
  }
};
export const formatDateTimeToStringDateTime = (values: any, addTime: any) => {
  if (values) {
    var d = new Date(values),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    var time: any = values.toString().slice(11, 16);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${
      addTime === true ? time + ', ' : ''
    }${day} tháng ${month}, ${year}`;
  }
};

export const formatDateTimeToStringDateTimeYear = (values: any) => {
  var d = new Date(values),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day} tháng ${month}`;
};

export function convertISO8086toLDate(dateISO8086) {
  return moment(dateISO8086).format('YYYY-MM-DD');
}

export function convertISO8086toLTime(dateISO8086) {
  return moment(dateISO8086).format('HH:mm');
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function convertISO8601toStringDay(ISOTime: any) {
  let dayWeek: any = dayOfWeekArray.find(
    (el: any) => el.eng === ISOTime?.toString()?.slice(0, 3)
  ).vi;

  var d = new Date(ISOTime),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  return `${dayWeek}, ${day} tháng ${month}, ${year}`;
}

//Fri Sep 30 2022 06:30:00 GMT+0700 (Giờ Đông Dương) to Thứ 5, 14 tháng 5, 2022
export function convertISO8601RegionToStringDay(date: any) {
  let dayWeek: any = dayOfWeekArray.find(
    (el: any) => el.eng === date.slice(0, 3)
  )?.vi;
  let day: any = date.slice(8, 10);
  let month: any = monOfYear.find(
    (el: any) => el.eng === date.slice(4, 7)
  )?.num;
  let year: any = date.slice(11, 15);
  return `${dayWeek}, ${day}/${month}/${year}`;
}
//2022-09-30T06:30:00.000+07:00 to 30/09/2022
export function convertISO8601StandardToStringDay(date: any) {
  let dayWeek: any = dayOfWeekArray.find(
    (el: any) => el.eng === date.slice(0, 3)
  )?.vi;
  let day: any = date.slice(8, 10);
  let month: any = monOfYear.find(
    (el: any) => el.eng === date.slice(4, 7)
  )?.num;
  let year: any = date.slice(11, 15);
  return `${dayWeek}, ${day}/${month}/${year}`;
}

export default function moneyFormat(
  number: number,
  codeCountry: string = 'it-IT',
  currency: string = ''
) {
  let result = number as any;
  let style =
    currency && codeCountry
      ? {
          style: 'currency',
          currency
        }
      : {};
  result = result.toLocaleString('en-US', style);

  return result + ' VNĐ';
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
