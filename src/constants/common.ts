export const GENERAL_GROUP = 'ce30773d-3ea7-4024-b4de-d6be9fe02cfb';
export const ACTION_TYPE = 'update_emso_profile_picture';

export const PERMISSION = {
  ATTENDANCE_LESSON: 'es_attendance_teacher_teach_lesson',
  UPDATE_LESSON: 'es_lesson_update' || 'es_lesson_update_time',
  DELETE_LESSON: 'es_lesson_delete',
  BIRTHDAY: 'easyspace_birthday_management',
  REGISTER_LESSON: 'es_lesson_register',
  CREATE_LESSON_IN_PAST: 'es_lesson_create_in_past'
};

export const PERIOD_TEACHER = [
  { id: 0, value: 'No repeat' },
  { id: 1, value: 'By week' }
];

export const listReactCount = [
  'likes_count',
  'hahas_count',
  'angrys_count',
  'loves_count',
  'sads_count',
  'wows_count',
  'yays_count'
];

export const listOptionReport = [
  {
    id: 'Spam',
    value: 'Bài viết này là tin rác'
  },
  {
    id: 'Violence',
    value: 'Bài viết có nội dung bạo lực, kích động'
  },
  {
    id: 'Threat',
    value: 'Bài viết có nội dung đe dọa, hăm dọa'
  },
  {
    id: 'Porn',
    value: 'Bài viết có nội dung khiêu dâm, đồi trụy'
  },
  {
    id: 'Doxxing',
    value: 'Bài viết có nội dung đánh cắp thông tin dữ liệu'
  },
  {
    id: 'Other',
    value: 'Lý do khác'
  }
];

export const listOptionRule = [
  {
    id: 1,
    title: 'Hãy tử tế và lịch sự',
    description:
      'Tất cả chúng ta cùng có mặt ở đây để tạo nên một môi trường thân thiện. Hãy tôn trọng tất cả mọi người. Tranh luận lành mạnh là điều hết sức tự nhiên nhưng cũng cần tử tế.'
  },
  {
    id: 2,
    title: 'Không dùng ngôn từ gây thù ghét hoặc bắt nạt',
    description:
      'Hãy đảm bảo mọi người cảm thấy an toàn. Mọi hình thức bắt nạt đều không được cho phép và những bình luận hạ nhục về chủng tộc, tôn giáo, văn hóa, thiên hướng tính dục, giới tính hoặc bản sắc sẽ không được chấp nhận.'
  },
  {
    id: 3,
    title: 'Không quảng cáo hoặc spam',
    description:
      'Trong nhóm, hãy cho đi nhiều hơn nhận lại. Bạn không được tự quảng bá, spam và đăng liên kết không phù hợp.'
  },
  {
    id: 4,
    title: 'Tôn trọng quyền riêng tư của mọi người',
    description:
      'Tham gia nhóm này đòi hỏi phải có sự tin tưởng từ hai phía. Các cuộc thảo luận thực, mang tính biểu đạt giúp nhóm trở nên tuyệt vời nhưng cũng có thể nhạy cảm và riêng tư. Không tiết lộ nội dung được chia sẻ trong nhóm ra bên ngoài.'
  }
];

export const listMenu = [
  {
    id: 1,
    value: 'Ít hoạt động'
  },
  {
    id: 2,
    value: 'Xung đột trong nhóm'
  },
  {
    id: 3,
    value: 'Khó quản lý'
  },
  {
    id: 4,
    value: 'Không quan tâm nữa'
  },
  {
    id: 5,
    value: 'Cần nghỉ ngơi'
  },
  {
    id: 6,
    value: 'Cần thời gian để theo kịp'
  },
  {
    id: 7,
    value: 'Khác'
  }
];

export const listVisibility = [
  {
    key: 'public',
    icon: 'fas fa-globe-asia',
    label: 'Công khai',
    subLabel: 'Tất cả mọi người đều có thể xem'
  },
  {
    key: 'friend',
    icon: 'fas fa-user-friends',
    label: 'Bạn bè',
    subLabel: 'Chỉ bạn bè của bạn mới xem được'
  },
  {
    key: 'private',
    icon: 'fas fa-lock',
    label: 'Riêng tư',
    subLabel: 'Không hiển thị trên bảng tin của người khác'
  }
];

export const listBackgroundAnswer = [
  {
    id: 1,
    color: 'linear-gradient(135deg, rgb(252, 87, 118), rgb(189, 13, 42))'
  },
  {
    id: 2,
    color: 'linear-gradient(135deg, rgb(255, 104, 84), rgb(228, 30, 63))'
  },
  {
    id: 3,
    color: 'linear-gradient(135deg, rgb(0, 110, 95), rgb(24, 71, 35))'
  },
  {
    id: 4,
    color: 'linear-gradient(135deg, rgb(50, 171, 79), rgb(36, 133, 60))'
  },
  {
    id: 5,
    color: 'linear-gradient(135deg, rgb(0, 153, 230), rgb(49, 162, 76))'
  },
  {
    id: 6,
    color: 'linear-gradient(135deg, rgb(45, 136, 255), rgb(23, 99, 207))'
  },
  {
    id: 7,
    color: 'linear-gradient(135deg, rgb(23, 99, 207), rgb(7, 49, 109))'
  },
  {
    id: 8,
    color: 'linear-gradient(135deg, rgb(237, 65, 165), rgb(23, 99, 207))'
  }
];

export const optionMonth = Array.from(Array(12).keys())?.map(
  (el: any, index) => ({
    id: index + 1,
    label: `Tháng ${index + 1}`
  })
);

export const optionDate = Array.from(Array(31).keys())?.map(
  (el: any, index) => ({
    id: index + 1,
    label: index + 1
  })
);

export const optionYear = Array.from(Array(new Date().getFullYear()).keys())
  ?.reverse()
  ?.filter(el => +el + 1 >= 1904)
  ?.map((el: any) => ({
    id: el + 1,
    label: el + 1
  }));

export const genderOptions = [
  {
    id: 'female',
    label: 'Nữ',
    key: ''
  },
  {
    id: 'male',
    label: 'Nam',
    key: ''
  },
  {
    id: 'other',
    label: 'Khác',
    key: ''
  }
];

export const privacyOptions = [
  {
    id: 'public',
    name: 'Công khai',
    icon: 'fa-solid fa-earth-asia',
    description: 'Tất cả mọi người'
  },
  {
    id: 'private',
    name: 'Riêng tư',
    icon: 'fa-solid fa-lock',
    description: 'Chỉ những người được mời'
  },
  {
    id: 'friend',
    name: 'Bạn bè',
    icon: 'fa-solid fa-user-group',
    description: 'Bạn bè của bạn'
  }
];
export const workingForm = [
  {
    id: 'fulltime',
    name: 'Toàn thời gian'
  },
  {
    id: 'parttime',
    name: 'Bán thời gian'
  },
  {
    id: 'internship',
    name: 'Thực tập'
  },
  {
    id: 'remote',
    name: 'Làm từ xa'
  }
];

export const workExperience = [
  {
    id: '1',
    name: 'Dưới 1 năm kinh nghiệm'
  },
  {
    id: '2',
    name: '1 năm kinh nghiệm'
  },
  {
    id: '3',
    name: '2 năm kinh nghiệm'
  },
  {
    id: '4',
    name: '3 năm kinh nghiệm'
  },
  {
    id: '5',
    name: '4 năm kinh nghiệm'
  },
  {
    id: '6',
    name: '5 năm kinh nghiệm'
  },
  {
    id: '7',
    name: 'Trên 5 năm kinh nghiệm'
  }
];
export const level = [
  {
    id: 'staff',
    name: 'Nhân viên'
  },
  {
    id: 'leader',
    name: 'Trưởng phòng'
  },
  {
    id: 'internship',
    name: 'Thực tập sinh'
  },
  {
    id: 'manager',
    name: 'Quản lý'
  }
];
export const gender = [
  {
    id: 'all',
    name: 'Tất cả'
  },
  {
    id: 'men',
    name: 'Nam'
  },
  {
    id: 'women',
    name: 'Nữ'
  }
];
export const genderSubject = [
  {
    id: 'all',
    name: 'Trẻ con & Người lớn'
  },
  {
    id: 'kid',
    name: 'Trẻ con'
  },
  {
    id: 'adult',
    name: 'Người lớn'
  }
];

export const chipDataLine1 = [
  { key: 0, amount: '50', price: '50000' },
  { key: 1, amount: '100', price: '100000' },
  { key: 2, amount: '200', price: '200000' }
];
export const chipDataLine2 = [
  { key: 3, amount: '500', price: '500000' },
  { key: 4, amount: '1000', price: '1000000' },
  { key: 5, amount: '2000', price: '2000000' }
];

export const discountData = [{ key: 0, amount: '20', price: '15000' }];

export const exchangeData = [
  { key: 1, amount: '10', price: '10000' },
  { key: 2, amount: '20', price: '20000' },
  { key: 3, amount: '50', price: '50000' },
  { key: 4, amount: '100', price: '100000' },
  { key: 5, amount: '200', price: '200000' },
  { key: 6, amount: '500', price: '500000' },
  { key: 7, amount: '1000', price: '1000000' },
  { key: 8, amount: '2000', price: '2000000' },
  { key: 9, amount: '5000', price: '5000000' }
];

export const pipeLineData = [
  {
    id: 'all',
    text: 'Tất cả',
    color: 'blue'
  },
  {
    id: 'approved',
    text: 'Đã phê duyệt',
    color: 'green'
  },
  {
    id: 'pending',
    text: 'Đang chờ',
    color: 'orange'
  },
  {
    id: 'rejected',
    text: 'Từ chối',
    color: 'red'
  }
];

export const clientId =
  '325919165645-iuk5p0f7uado7p4vo8lv583l50irj36t.apps.googleusercontent.com';

export const urlRegexHttp =
  ' /(\bhttps?://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi';
export const urlRegexHastag =
  /(#[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

export const urlRegexMetion = /([d+])/gm;
