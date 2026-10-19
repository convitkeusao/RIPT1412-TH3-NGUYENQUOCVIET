import { Assignment, Course, Result, Student, Session } from '../shared/types';

export const courses: Course[] = [
  {
    id: 'course-1',
    code: 'IT301',
    name: 'Lập trình di động',
    credits: 3,
    instructor: 'Nguyễn Minh Anh',
    description: 'Phát triển ứng dụng di động đa nền tảng với React Native.',
  },
  {
    id: 'course-2',
    code: 'IT205',
    name: 'Cơ sở dữ liệu',
    credits: 3,
    instructor: 'Trần Quốc Bảo',
    description: 'Mô hình dữ liệu, SQL và thiết kế cơ sở dữ liệu quan hệ.',
  },
  {
    id: 'course-3',
    code: 'MA202',
    name: 'Xác suất thống kê',
    credits: 3,
    instructor: 'Lê Thu Hà',
    description: 'Các phương pháp xác suất và thống kê ứng dụng.',
  },
  {
    id: 'course-4',
    code: 'EN101',
    name: 'Tiếng Anh chuyên ngành',
    credits: 2,
    instructor: 'Phạm Hoàng Yến',
    description: 'Kỹ năng tiếng Anh trong môi trường công nghệ thông tin.',
  },
];

export const sessions: Session[] = [
  { id: 'session-1', courseId: 'course-1', day: 'Thứ Hai', start: '07:30', end: '10:00', room: 'A203' },
  { id: 'session-2', courseId: 'course-2', day: 'Thứ Ba', start: '13:00', end: '15:30', room: 'B105' },
  { id: 'session-3', courseId: 'course-3', day: 'Thứ Tư', start: '09:00', end: '11:30', room: 'C301' },
  { id: 'session-4', courseId: 'course-4', day: 'Thứ Năm', start: '07:30', end: '09:00', room: 'A107' },
  { id: 'session-5', courseId: 'course-1', day: 'Thứ Sáu', start: '13:00', end: '15:30', room: 'Lab 02' },
];

function dueIn(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export const assignments: Assignment[] = [
  {
    id: 'assignment-1',
    courseId: 'course-1',
    title: 'Bài tập giao diện ứng dụng',
    dueDate: dueIn(2),
    done: false,
    description: 'Xây dựng màn hình danh sách và chi tiết bằng React Native.',
  },
  {
    id: 'assignment-2',
    courseId: 'course-2',
    title: 'Thiết kế cơ sở dữ liệu',
    dueDate: dueIn(4),
    done: false,
    description: 'Vẽ sơ đồ ERD và chuyển đổi sang mô hình quan hệ.',
  },
  {
    id: 'assignment-3',
    courseId: 'course-3',
    title: 'Bài tập xác suất chương 2',
    dueDate: dueIn(7),
    done: true,
    description: 'Hoàn thành các bài tập về biến ngẫu nhiên.',
  },
  {
    id: 'assignment-4',
    courseId: 'course-4',
    title: 'Thuyết trình thuật ngữ công nghệ',
    dueDate: dueIn(10),
    done: false,
    description: 'Chuẩn bị phần trình bày nhóm bằng tiếng Anh.',
  },
];

export const student: Student = {
  id: 'student-1',
  name: 'Nguyễn Minh Khoa',
  studentCode: 'SV20240018',
  className: 'CNTT K24A',
  major: 'Công nghệ thông tin',
  email: 'khoa.nguyen@example.edu.vn',
  phone: '090 123 4567',
};

export const results: Result[] = [
  { id: 'result-1', courseId: 'course-1', semester: 'HK1 2025-2026', score: 8.6, note: 'Kết quả tốt, hoàn thành đầy đủ bài tập.' },
  { id: 'result-2', courseId: 'course-2', semester: 'HK1 2025-2026', score: 8.1, note: 'Nắm vững kiến thức nền tảng.' },
  { id: 'result-3', courseId: 'course-3', semester: 'HK1 2025-2026', score: 7.8, note: 'Cần luyện tập thêm phần thống kê.' },
];
