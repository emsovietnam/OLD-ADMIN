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

export const bgColor = [
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)',
  'rgba(255, 99, 132, 0.5)',
  'rgba(54, 162, 235, 0.5)',
  'rgba(255, 206, 86, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(153, 102, 255, 0.5)'
];

export const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)'
];

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

export const listMenuPost = [
  {
    key: 'media',
    label: 'Ảnh/Video',
    image: null,
    color: '#45bd62',
    styleImage: { width: '25px', height: '25px' },
    priority: 'space',
    disabled: [
      'life-event',
      'gif',
      'answer-learn',
      'answer',
      'poll',
      'event-group',
      'write-suggest',
      'file'
    ]
  },
  {
    key: 'moment',
    label: 'Khoảnh khắc',
    image: null,
    priority: 'space',
    disabled: [
      'media',
      'life-event',
      'gif',
      'poll',
      'file',
      'write-suggest',
      'answer'
    ]
  },
  {
    key: 'live',
    label: 'Video trực tiếp',
    icon: 'fa-light fa-video',
    color: '#f02849',
    disabled: []
  },
  {
    key: 'emoji-activity',
    label: 'Cảm xúc/Hoạt động',
    icon: 'fal fa-laugh',
    color: '#F5C33B',
    priority: 'space',
    disabled: []
  },
  {
    key: 'tag-people',
    label: 'Gắn thẻ người khác',
    icon: 'fas fa-user-tag',
    color: '#1877F2',
    disabled: []
  },
  {
    key: 'checkin',
    label: 'Check in',
    icon: 'fas fa-map-marker-alt',
    color: '#FA383E',
    disabled: []
  },
  {
    key: 'life-event',
    label: 'Sự kiện trong đời',
    icon: 'fas fa-flag',
    color: ' #39afd5',
    disabled: ['media', 'gif', 'answer', 'answer-learn']
  },
  {
    key: 'gif',
    label: 'File GIF',
    icon: 'fas fa-sparkles',
    color: '#2abba7',
    disabled: [
      'media',
      'life-event',
      'answer',
      'poll',
      'write-suggest',
      'file',
      'answer-learn'
    ]
  },

  {
    key: 'answer',
    label: 'Tổ chức buổi H&Đ',
    icon: 'fas fa-microphone',
    color: '#f02849',
    disabled: [
      'media',
      'life-event',
      'gif',
      'poll',
      'file',
      'write-suggest',
      'answer-learn'
    ]
  },
  {
    key: 'poll',
    label: 'Thăm dò ý kiến',
    icon: 'fas fa-poll',
    color: '#f7923b',
    display: 'group',
    disabled: [
      'media',
      'life-event',
      'gif',
      'file',
      'write-suggest',
      'event-group',
      'answer-learn',
      'answer'
    ]
  },
  {
    key: 'event-group',
    label: 'Tạo sự kiện',
    icon: 'fal fa-calendar-alt',
    color: '#F35369',
    display: 'group'
  },
  {
    key: 'tag-event-group',
    label: 'Gắn thẻ sự kiện',
    icon: 'fas fa-calendar-day',
    color: '#F35369',
    display: 'group',
    disabled: []
  },
  {
    key: 'write-suggest',
    label: 'Viết gợi ý',
    icon: 'fas fa-notes-medical',
    color: '#9360f7',
    display: 'group',
    disabled: [
      'media',
      'life-event',
      'gif',
      'file',
      'event-group',
      'answer-learn',
      'answer'
    ]
  },
  {
    key: 'file',
    label: 'Thêm file',
    icon: 'fas fa-file',
    color: '#3578E5',
    display: 'group',
    disabled: [
      'media',
      'life-event',
      'gif',
      'poll',
      'write-suggest',
      'event-group',
      'answer-learn',
      'answer'
    ]
  },
  {
    key: 'gifts',
    label: 'Quà tặng',
    icon: 'fas fa-gifts',
    color: '#db1a8b',
    disabled: []
  },
  {
    key: 'call',
    label: 'Nhận cuộc gọi',
    icon: 'fas fa-phone',
    color: '#1877f2',
    disabled: []
  },
  {
    key: 'message',
    label: 'Thu hút tin nhắn',
    icon: 'fas fa-comment-smile',
    color: '#0099ff',
    disabled: []
  },
  {
    key: 'target',
    label: 'Công bố mục tiêu',
    icon: 'fas fa-bullseye-pointer',
    color: '#FA383E',
    disabled: [
      'media',
      'life-event',
      'gif',
      'poll',
      'file',
      'write-suggest',
      'answer-learn'
    ]
  },
  {
    key: 'background',
    display: 'none',
    disabled: [
      'media',
      'gif',
      'answer-learn',
      'answer',
      'poll',
      'event-group',
      'write-suggest',
      'file'
    ]
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
    name: 'Trẻ em & Người lớn'
  },
  {
    id: 'kid',
    name: 'Trẻ em'
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

export const productCategories = [
  {
    id: '1',
    text: 'Thời Trang và phụ kiện',
    subcategories: [
      {
        id: '43',
        text: 'Vớ/ Tất',
        subcategories: []
      },
      {
        id: '42',
        text: 'Vải',
        subcategories: []
      },
      {
        id: '41',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '40',
        text: 'Đồ hóa trang',
        subcategories: []
      },
      {
        id: '39',
        text: 'Đồ truyền thống',
        subcategories: []
      },
      {
        id: '38',
        text: 'Đồ Bầu',
        subcategories: []
      },
      {
        id: '37',
        text: 'Đồ ngủ',
        subcategories: []
      },
      {
        id: '36',
        text: 'Đồ lót',
        subcategories: []
      },
      {
        id: '35',
        text: 'Bộ',
        subcategories: []
      },
      {
        id: '34',
        text: 'Hoodie và Áo nỉ',
        subcategories: []
      },
      {
        id: '33',
        text: 'Áo len',
        subcategories: []
      },
      {
        id: '32',
        text: 'Áo khoác',
        subcategories: []
      },
      {
        id: '31',
        text: 'Đồ liền thân',
        subcategories: []
      },
      {
        id: '30',
        text: 'Đồ cưới',
        subcategories: []
      },
      {
        id: '29',
        text: 'Đầm',
        subcategories: []
      },
      {
        id: '28',
        text: 'Quần jeans',
        subcategories: []
      },
      {
        id: '27',
        text: 'Váy',
        subcategories: []
      },
      {
        id: '26',
        text: 'Quần đùi',
        subcategories: []
      },
      {
        id: '25',
        text: 'Quần',
        subcategories: []
      },
      {
        id: '24',
        text: 'Áo',
        subcategories: []
      }
    ]
  },
  {
    id: '2',
    text: 'Du lịch & Hành lý',
    subcategories: [
      {
        id: '47',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '46',
        text: 'Phụ kiện du lịch',
        subcategories: []
      },
      {
        id: '45',
        text: 'Túi du lịch',
        subcategories: []
      },
      {
        id: '44',
        text: 'Vali',
        subcategories: []
      }
    ]
  },
  {
    id: '3',
    text: 'Sắc Đẹp',
    subcategories: [
      {
        id: '57',
        text: 'Tắm & chăm sóc cơ thể',
        subcategories: []
      },
      {
        id: '56',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '55',
        text: 'Bộ sản phẩm làm đẹp',
        subcategories: []
      },
      {
        id: '54',
        text: 'Chăm sóc da mặt',
        subcategories: []
      },
      {
        id: '53',
        text: 'Dụng cụ làm đẹp',
        subcategories: []
      },
      {
        id: '52',
        text: 'Trang điểm',
        subcategories: []
      },
      {
        id: '51',
        text: 'Nước hoa',
        subcategories: []
      },
      {
        id: '50',
        text: 'Chăm sóc nam giới',
        subcategories: []
      },
      {
        id: '49',
        text: 'Chăm sóc tóc',
        subcategories: []
      },
      {
        id: '48',
        text: 'Chăm sóc tay, chân & móng',
        subcategories: []
      }
    ]
  },
  {
    id: '4',
    text: 'Sức Khỏe',
    subcategories: [
      {
        id: '62',
        text: 'Hỗ trợ tình dục',
        subcategories: []
      },
      {
        id: '61',
        text: 'Chăm sóc cá nhân',
        subcategories: []
      },
      {
        id: '60',
        text: 'Vật tư y tế',
        subcategories: []
      },
      {
        id: '59',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '58',
        text: 'Thực phẩm chức năng',
        subcategories: []
      }
    ]
  },
  {
    id: '5',
    text: 'Thiết Bị Điện Gia Dụng',
    subcategories: [
      {
        id: '71',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '70',
        text: 'Thiết bị điều khiển từ xa',
        subcategories: []
      },
      {
        id: '69',
        text: 'Pin',
        subcategories: []
      },
      {
        id: '68',
        text: 'Mạch điện & Phụ tùng',
        subcategories: []
      },
      {
        id: '67',
        text: 'Đồ gia dụng nhà bếp',
        subcategories: []
      },
      {
        id: '66',
        text: 'Tivi & Phụ kiện',
        subcategories: []
      },
      {
        id: '65',
        text: 'Thiết bị điện gia dụng lớn',
        subcategories: []
      },
      {
        id: '64',
        text: 'Thiết bị điện gia dụng nhỏ',
        subcategories: []
      },
      {
        id: '63',
        text: 'Máy chiếu & Phụ kiện',
        subcategories: []
      }
    ]
  },
  {
    id: '6',
    text: 'Giày Dép',
    subcategories: [
      {
        id: '81',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '80',
        text: 'Phụ kiện giày dép',
        subcategories: []
      },
      {
        id: '79',
        text: 'Xăng-đan & Dép',
        subcategories: []
      },
      {
        id: '78',
        text: 'Giày Oxfords & Giày buộc dây',
        subcategories: []
      },
      {
        id: '77',
        text: 'Giày đế xuồng',
        subcategories: []
      },
      {
        id: '76',
        text: 'Giày cao gót',
        subcategories: []
      },
      {
        id: '75',
        text: 'Giày tây lười',
        subcategories: []
      },
      {
        id: '74',
        text: 'Giày sục',
        subcategories: []
      },
      {
        id: '73',
        text: 'Giày thể thao/ Sneakers',
        subcategories: []
      },
      {
        id: '72',
        text: 'Bốt',
        subcategories: []
      }
    ]
  },
  {
    id: '7',
    text: 'Điện Thoại & Phụ Kiện',
    subcategories: [
      {
        id: '88',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '87',
        text: 'Bộ đàm',
        subcategories: []
      },
      {
        id: '86',
        text: 'Phụ kiện',
        subcategories: []
      },
      {
        id: '85',
        text: 'Thiết bị đeo thông minh',
        subcategories: []
      },
      {
        id: '84',
        text: 'Điện thoại',
        subcategories: []
      },
      {
        id: '83',
        text: 'Máy tính bảng',
        subcategories: []
      },
      {
        id: '82',
        text: 'Thẻ sim',
        subcategories: []
      }
    ]
  },
  {
    id: '8',
    text: 'Túi Ví',
    subcategories: [
      {
        id: '99',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '98',
        text: 'Phụ kiện túi',
        subcategories: []
      },
      {
        id: '97',
        text: 'Ví',
        subcategories: []
      },
      {
        id: '96',
        text: 'Túi đeo chéo & Túi đeo vai',
        subcategories: []
      },
      {
        id: '95',
        text: 'Cặp xách công sở',
        subcategories: []
      },
      {
        id: '94',
        text: 'Túi quai xách',
        subcategories: []
      },
      {
        id: '93',
        text: 'Túi tote',
        subcategories: []
      },
      {
        id: '92',
        text: 'Túi đeo hông & Túi đeo ngực',
        subcategories: []
      },
      {
        id: '91',
        text: 'Ví dự tiệc & Ví cầm tay',
        subcategories: []
      },
      {
        id: '90',
        text: 'Cặp laptop',
        subcategories: []
      },
      {
        id: '89',
        text: 'Ba lô',
        subcategories: []
      }
    ]
  },
  {
    id: '9',
    text: 'Đồng Hồ',
    subcategories: [
      {
        id: '104',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '103',
        text: 'Phụ kiện đồng hồ',
        subcategories: []
      },
      {
        id: '102',
        text: 'Bộ đồng hồ & Đồng hồ cặp',
        subcategories: []
      },
      {
        id: '101',
        text: 'Đồng hồ nam',
        subcategories: []
      },
      {
        id: '100',
        text: 'Đồng hồ nữ',
        subcategories: []
      }
    ]
  },
  {
    id: '10',
    text: 'Thiết Bị Âm Thanh',
    subcategories: [
      {
        id: '111',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '110',
        text: 'Cáp âm thanh/ video & Đầu chuyển',
        subcategories: []
      },
      {
        id: '109',
        text: 'Dàn âm thanh',
        subcategories: []
      },
      {
        id: '108',
        text: 'Amply và đầu chỉnh âm',
        subcategories: []
      },
      {
        id: '107',
        text: 'Micro thu âm',
        subcategories: []
      },
      {
        id: '106',
        text: 'Máy nghe nhạc',
        subcategories: []
      },
      {
        id: '105',
        text: 'Tai nghe nhét tai & chụp tai',
        subcategories: []
      }
    ]
  },
  {
    id: '11',
    text: 'Thực phẩm và đồ uống',
    subcategories: [
      {
        id: '124',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '123',
        text: 'Bộ quà tặng',
        subcategories: []
      },
      {
        id: '122',
        text: 'Đồ uống có cồn',
        subcategories: []
      },
      {
        id: '121',
        text: 'Các loại bánh',
        subcategories: []
      },
      {
        id: '120',
        text: 'Thực phẩm tươi sống & đông lạnh',
        subcategories: []
      },
      {
        id: '119',
        text: 'Sữa - trứng',
        subcategories: []
      },
      {
        id: '118',
        text: 'Đồ uống',
        subcategories: []
      },
      {
        id: '117',
        text: 'Ngũ cốc & mứt',
        subcategories: []
      },
      {
        id: '116',
        text: 'Đồ làm bánh',
        subcategories: []
      },
      {
        id: '115',
        text: 'Nguyên liệu nấu ăn',
        subcategories: []
      },
      {
        id: '114',
        text: 'Nhu yếu phẩm',
        subcategories: []
      },
      {
        id: '113',
        text: 'Đồ ăn vặt',
        subcategories: []
      },
      {
        id: '112',
        text: 'Đồ chế biến sẵn',
        subcategories: []
      }
    ]
  },
  {
    id: '12',
    text: 'Chăm Sóc Thú Cưng',
    subcategories: [
      {
        id: '131',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '130',
        text: 'Chăm sóc sức khỏe',
        subcategories: []
      },
      {
        id: '129',
        text: 'Quần áo & phụ kiện',
        subcategories: []
      },
      {
        id: '128',
        text: 'Làm đẹp cho thú cưng',
        subcategories: []
      },
      {
        id: '127',
        text: 'Vệ sinh cho thú cưng',
        subcategories: []
      },
      {
        id: '126',
        text: 'Phụ kiện cho thú cưng',
        subcategories: []
      },
      {
        id: '125',
        text: 'Thức ăn cho thú cưng',
        subcategories: []
      }
    ]
  },
  {
    id: '13',
    text: 'Mẹ & Bé',
    subcategories: [
      {
        id: '144',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '143',
        text: 'Bộ & Gói quà tặng',
        subcategories: []
      },
      {
        id: '142',
        text: 'Đồ chơi',
        subcategories: []
      },
      {
        id: '141',
        text: 'Tã & bô em bé',
        subcategories: []
      },
      {
        id: '140',
        text: 'Chăm sóc sức khỏe bé',
        subcategories: []
      },
      {
        id: '139',
        text: 'Sữa công thức & Thực phẩm cho bé',
        subcategories: []
      },
      {
        id: '138',
        text: 'An toàn cho bé',
        subcategories: []
      },
      {
        id: '137',
        text: 'Đồ dùng phòng ngủ cho bé',
        subcategories: []
      },
      {
        id: '136',
        text: 'Đồ dùng phòng tắm & Chăm sóc cơ thể bé',
        subcategories: []
      },
      {
        id: '135',
        text: 'Chăm sóc sức khỏe mẹ',
        subcategories: []
      },
      {
        id: '134',
        text: 'Phụ kiện cho mẹ',
        subcategories: []
      },
      {
        id: '133',
        text: 'Đồ dùng ăn dặm cho bé',
        subcategories: []
      },
      {
        id: '132',
        text: 'Đồ dùng du lịch cho bé',
        subcategories: []
      }
    ]
  },
  {
    id: '14',
    text: 'Thời trang trẻ em & trẻ sơ sinh',
    subcategories: [
      {
        id: '152',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '151',
        text: 'Giày bé gái',
        subcategories: []
      },
      {
        id: '150',
        text: 'Giày bé trai',
        subcategories: []
      },
      {
        id: '149',
        text: 'Quần áo bé gái',
        subcategories: []
      },
      {
        id: '148',
        text: 'Quần áo bé trai',
        subcategories: []
      },
      {
        id: '147',
        text: 'Phụ kiện trẻ em & trẻ sơ sinh',
        subcategories: []
      },
      {
        id: '146',
        text: 'Bao tay trẻ em & Tất',
        subcategories: []
      },
      {
        id: '145',
        text: 'Quần áo trẻ em',
        subcategories: []
      }
    ]
  },
  {
    id: '15',
    text: 'Cameras & Flycam',
    subcategories: [
      {
        id: '161',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '160',
        text: 'Phụ kiện Flycam',
        subcategories: []
      },
      {
        id: '159',
        text: 'Flycam',
        subcategories: []
      },
      {
        id: '158',
        text: 'Phụ kiện chăm sóc máy ảnh',
        subcategories: []
      },
      {
        id: '157',
        text: 'Phụ kiện máy ảnh',
        subcategories: []
      },
      {
        id: '156',
        text: 'Phụ kiện ống kính',
        subcategories: []
      },
      {
        id: '155',
        text: 'Ống kính',
        subcategories: []
      },
      {
        id: '154',
        text: 'Camera giám sát',
        subcategories: []
      },
      {
        id: '153',
        text: 'Máy ảnh',
        subcategories: []
      }
    ]
  },
  {
    id: '16',
    text: 'Nhà cửa & Đời sống',
    subcategories: [
      {
        id: '178',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '177',
        text: 'Đồ thờ cúng, đồ phong thủy',
        subcategories: []
      },
      {
        id: '176',
        text: 'Trang trí tiệc tùng',
        subcategories: []
      },
      {
        id: '175',
        text: 'Sắp xếp nhà cửa',
        subcategories: []
      },
      {
        id: '174',
        text: 'Bảo hộ gia đình',
        subcategories: []
      },
      {
        id: '173',
        text: 'Đèn',
        subcategories: []
      },
      {
        id: '172',
        text: 'Bộ đồ bàn ăn',
        subcategories: []
      },
      {
        id: '171',
        text: 'Dụng cụ nhà bếp',
        subcategories: []
      },
      {
        id: '170',
        text: 'Dụng cụ chăm sóc nhà cửa',
        subcategories: []
      },
      {
        id: '169',
        text: 'Dụng cụ & Thiết bị tiện ích',
        subcategories: []
      },
      {
        id: '168',
        text: 'Làm vườn',
        subcategories: []
      },
      {
        id: '167',
        text: 'Nội thất',
        subcategories: []
      },
      {
        id: '166',
        text: 'Túi làm ấm',
        subcategories: []
      },
      {
        id: '165',
        text: 'Trang trí nhà cửa',
        subcategories: []
      },
      {
        id: '164',
        text: 'Chăn ga gối nệm',
        subcategories: []
      },
      {
        id: '163',
        text: 'Đồ dùng phòng tắm',
        subcategories: []
      },
      {
        id: '162',
        text: 'Chất khử mùi, làm thơm nhà',
        subcategories: []
      }
    ]
  },
  {
    id: '17',
    text: 'Thể Thao & Dã Ngoại',
    subcategories: [
      {
        id: '183',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '182',
        text: 'Phụ Kiện Thể Thao & Dã Ngoại',
        subcategories: []
      },
      {
        id: '181',
        text: 'Thời Trang Thể Thao & Dã Ngoại',
        subcategories: []
      },
      {
        id: '180',
        text: 'Giày Thể Thao',
        subcategories: []
      },
      {
        id: '179',
        text: 'Dụng Cụ Thể Thao & Dã Ngoại',
        subcategories: []
      }
    ]
  },
  {
    id: '18',
    text: 'Văn Phòng Phẩm',
    subcategories: [
      {
        id: '190',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '189',
        text: 'Thư Tín',
        subcategories: []
      },
      {
        id: '188',
        text: 'Sổ & Giấy Các Loại',
        subcategories: []
      },
      {
        id: '187',
        text: 'Họa cụ',
        subcategories: []
      },
      {
        id: '186',
        text: 'Thiết Bị Trường Học',
        subcategories: []
      },
      {
        id: '185',
        text: 'Bút Các Loại',
        subcategories: []
      },
      {
        id: '184',
        text: 'Quà Tặng - Giấy Gói',
        subcategories: []
      }
    ]
  },
  {
    id: '19',
    text: 'Sở thích & Sưu tầm',
    subcategories: [
      {
        id: '199',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '198',
        text: 'Dụng Cụ May Vá',
        subcategories: []
      },
      {
        id: '197',
        text: 'Album Ảnh',
        subcategories: []
      },
      {
        id: '196',
        text: 'Đĩa Than',
        subcategories: []
      },
      {
        id: '195',
        text: 'Nhạc Cụ & Phụ Kiện',
        subcategories: []
      },
      {
        id: '194',
        text: 'Băng - Đĩa',
        subcategories: []
      },
      {
        id: '193',
        text: 'Đồ chơi - Giải trí',
        subcategories: []
      },
      {
        id: '192',
        text: 'Quà Lưu Niệm',
        subcategories: []
      },
      {
        id: '191',
        text: 'Đồ Sưu Tầm',
        subcategories: []
      }
    ]
  },
  {
    id: '20',
    text: 'Sách & Tạp Chí',
    subcategories: [
      {
        id: '203',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '202',
        text: 'E-Books',
        subcategories: []
      },
      {
        id: '201',
        text: 'Sách',
        subcategories: []
      },
      {
        id: '200',
        text: 'Tạp Chí & Báo Giấy',
        subcategories: []
      }
    ]
  },
  {
    id: '21',
    text: 'Máy tính & Laptop',
    subcategories: [
      {
        id: '215',
        text: 'Phụ Kiện Máy Tính Khác',
        subcategories: []
      },
      {
        id: '214',
        text: 'Laptop',
        subcategories: []
      },
      {
        id: '213',
        text: 'Chuột & Bàn Phím',
        subcategories: []
      },
      {
        id: '212',
        text: 'Phụ Kiện Máy Tính',
        subcategories: []
      },
      {
        id: '211',
        text: 'Máy In & Máy Scan',
        subcategories: []
      },
      {
        id: '210',
        text: 'Thiết Bị Văn Phòng',
        subcategories: []
      },
      {
        id: '209',
        text: 'Phần Mềm',
        subcategories: []
      },
      {
        id: '208',
        text: 'Thiết Bị Mạng',
        subcategories: []
      },
      {
        id: '207',
        text: 'Thiết Bị Lưu Trữ',
        subcategories: []
      },
      {
        id: '206',
        text: 'Linh Kiện Máy Tính',
        subcategories: []
      },
      {
        id: '205',
        text: 'Màn Hình',
        subcategories: []
      },
      {
        id: '204',
        text: 'Máy Tính Bàn',
        subcategories: []
      }
    ]
  },
  {
    id: '22',
    text: 'Mô tô, xe máy',
    subcategories: [
      {
        id: '220',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '219',
        text: 'Mũ bảo hiểm & Phụ kiện',
        subcategories: []
      },
      {
        id: '218',
        text: 'Phụ tùng xe máy',
        subcategories: []
      },
      {
        id: '217',
        text: 'Phụ kiện xe máy',
        subcategories: []
      },
      {
        id: '216',
        text: 'Mô tô, xe máy',
        subcategories: []
      }
    ]
  },
  {
    id: '23',
    text: 'Ô tô',
    subcategories: [
      {
        id: '228',
        text: 'Khác',
        subcategories: []
      },
      {
        id: '227',
        text: 'Móc chìa khóa và Bọc chìa ô tô',
        subcategories: []
      },
      {
        id: '226',
        text: 'Dầu nhớt và phụ gia ô tô',
        subcategories: []
      },
      {
        id: '225',
        text: 'Chăm sóc ô tô',
        subcategories: []
      },
      {
        id: '224',
        text: 'Dụng cụ sửa chữa ô tô',
        subcategories: []
      },
      {
        id: '223',
        text: 'Phụ tùng ô tô',
        subcategories: []
      },
      {
        id: '222',
        text: 'Phụ kiện ngoại thất ô tô',
        subcategories: []
      },
      {
        id: '221',
        text: 'Phụ kiện nội thất ô tô',
        subcategories: []
      }
    ]
  }
];

export const videoUrlApi = 'https://pt3.emso.vn';

export const clientId =
  '325919165645-iuk5p0f7uado7p4vo8lv583l50irj36t.apps.googleusercontent.com';

export const urlRegexHttp =
  ' /(\bhttps?://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi';
export const urlRegexHastag =
  /(#[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

export const urlRegexMetion = /([d+])/gm;
