import { db } from './db';
import { assignments, courses, results, sessions, student } from '../data/sample';

const DB_VERSION = 2;

export async function runMigrations(): Promise<void> {
    const res = await db.execute('PRAGMA user_version;');
    const currentVersion = Number(res.rows[0]?.user_version ?? 0);

    if (currentVersion > DB_VERSION) {
        throw new Error(
            `Database version ${currentVersion} is newer than supported version ${DB_VERSION}`,
        );
    }

    if (currentVersion < 2) {
        await db.transaction(async tx => {
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS courses (
                    id TEXT PRIMARY KEY,
                    code TEXT NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    credits INTEGER NOT NULL,
                    instructor TEXT NOT NULL,
                    description TEXT NOT NULL
                );
            `);
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS sessions (
                    id TEXT PRIMARY KEY,
                    course_id TEXT NOT NULL REFERENCES courses(id),
                    day TEXT NOT NULL,
                    day_order INTEGER NOT NULL,
                    start_time TEXT NOT NULL,
                    end_time TEXT NOT NULL,
                    room TEXT NOT NULL
                );
            `);
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS assignments (
                    id TEXT PRIMARY KEY,
                    course_id TEXT NOT NULL REFERENCES courses(id),
                    title TEXT NOT NULL,
                    due_date TEXT NOT NULL,
                    done INTEGER NOT NULL DEFAULT 0,
                    description TEXT NOT NULL
                );
            `);
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS student (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    student_code TEXT NOT NULL,
                    class_name TEXT NOT NULL,
                    major TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL
                );
            `);
            await tx.execute(`
                CREATE TABLE IF NOT EXISTS results (
                    id TEXT PRIMARY KEY,
                    course_id TEXT NOT NULL REFERENCES courses(id),
                    semester TEXT NOT NULL,
                    score REAL NOT NULL,
                    note TEXT NOT NULL
                );
            `);

            const existing = await tx.execute('SELECT COUNT(*) AS count FROM courses');
            if (Number(existing.rows[0]?.count ?? 0) === 0) {
                for (const course of courses) {
                    await tx.execute(
                        `INSERT INTO courses (id, code, name, credits, instructor, description)
                         VALUES (?, ?, ?, ?, ?, ?)`,
                        [course.id, course.code, course.name, course.credits, course.instructor, course.description],
                    );
                }
                for (const [index, session] of sessions.entries()) {
                    await tx.execute(
                        `INSERT INTO sessions (id, course_id, day, day_order, start_time, end_time, room)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [session.id, session.courseId, session.day, index, session.start, session.end, session.room],
                    );
                }
                for (const assignment of assignments) {
                    await tx.execute(
                        `INSERT INTO assignments (id, course_id, title, due_date, done, description)
                         VALUES (?, ?, ?, ?, ?, ?)`,
                        [assignment.id, assignment.courseId, assignment.title, assignment.dueDate, assignment.done ? 1 : 0, assignment.description],
                    );
                }
                for (const result of results) {
                    await tx.execute(
                        `INSERT INTO results (id, course_id, semester, score, note)
                         VALUES (?, ?, ?, ?, ?)`,
                        [result.id, result.courseId, result.semester, result.score, result.note],
                    );
                }
            }

            await tx.execute(
                `INSERT OR IGNORE INTO student (id, name, student_code, class_name, major, email, phone)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [student.id, student.name, student.studentCode, student.className, student.major, student.email, student.phone],
            );
            await tx.execute('CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON assignments(due_date)');
            await tx.execute('CREATE INDEX IF NOT EXISTS idx_sessions_day_order ON sessions(day_order, start_time)');
        });
        await db.execute('PRAGMA user_version = 2;');
    }
}