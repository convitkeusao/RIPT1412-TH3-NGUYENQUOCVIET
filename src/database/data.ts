import { db } from './db';
import { Data } from '../shared/types';

function bool(value: unknown) {
  return Number(value) === 1;
}

export async function getData(): Promise<Data> {
  const [cRows, sRows, aRows, pRows, rRows] =
    await Promise.all([
      db.execute('SELECT * FROM courses ORDER BY code'),
      db.execute('SELECT * FROM sessions ORDER BY day_order, start_time'),
      db.execute('SELECT * FROM assignments ORDER BY due_date'),
      db.execute('SELECT * FROM student WHERE id = ?', ['student-1']),
      db.execute('SELECT * FROM results ORDER BY semester DESC, course_id'),
    ]);

  const person = pRows.rows[0];
  if (!person) {
    throw new Error('Không tìm thấy thông tin sinh viên.');
  }

  return {
    courses: cRows.rows.map(row => ({
      id: String(row.id),
      code: String(row.code),
      name: String(row.name),
      credits: Number(row.credits),
      instructor: String(row.instructor),
      description: String(row.description),
    })),
    sessions: sRows.rows.map(row => ({
      id: String(row.id),
      courseId: String(row.course_id),
      day: String(row.day),
      start: String(row.start_time),
      end: String(row.end_time),
      room: String(row.room),
    })),
    assignments: aRows.rows.map(row => ({
      id: String(row.id),
      courseId: String(row.course_id),
      title: String(row.title),
      dueDate: String(row.due_date),
      done: bool(row.done),
      description: String(row.description),
    })),
    student: {
      id: String(person.id),
      name: String(person.name),
      studentCode: String(person.student_code),
      className: String(person.class_name),
      major: String(person.major),
      email: String(person.email),
      phone: String(person.phone),
    },
    results: rRows.rows.map(row => ({
      id: String(row.id),
      courseId: String(row.course_id),
      semester: String(row.semester),
      score: Number(row.score),
      note: String(row.note),
    })),
  };
}

export async function saveStudent(student: Data['student']) {
  await db.execute(
    'UPDATE student SET name = ?, email = ?, phone = ? WHERE id = ?',
    [student.name.trim(), student.email.trim(), student.phone.trim(), student.id],
  );
}

export async function saveAssignment(id: string, done: boolean) {
  await db.execute('UPDATE assignments SET done = ? WHERE id = ?', [done ? 1 : 0, id]);
}
