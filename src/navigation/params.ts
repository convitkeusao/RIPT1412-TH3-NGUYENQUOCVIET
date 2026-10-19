import { Assignment, Course, Result, Session } from '../shared/types';

export type StackParams = {
  Main: undefined;
  CourseDetail: { course: Course };
  SessionDetail: { session: Session };
  AssignmentDetail: { assignment: Assignment };
  ResultDetail: { result: Result };
};

export type TabParams = {
  Overview: undefined;
  Courses: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Profile: undefined;
};
