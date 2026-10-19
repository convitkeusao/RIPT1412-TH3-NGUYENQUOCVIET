export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  description: string;
};

export type Session = {
  id: string;
  courseId: string;
  day: string;
  start: string;
  end: string;
  room: string;
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  done: boolean;
  description: string;
};

export type Student = {
  id: string;
  name: string;
  studentCode: string;
  className: string;
  major: string;
  email: string;
  phone: string;
};

export type Result = {
  id: string;
  courseId: string;
  semester: string;
  score: number;
  note: string;
};

export type Data = {
  courses: Course[];
  sessions: Session[];
  assignments: Assignment[];
  student: Student;
  results: Result[];
};
