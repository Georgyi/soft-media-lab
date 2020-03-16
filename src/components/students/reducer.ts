import * as types from './types';
import { StudentActions } from './actions';

export type ProgressType = 'unsatisfactory' | 'satisfactorily' | 'good' | 'excellent';

export type StudentType = {
  id: string | null
  firstName: string | null
  lastName: string | null
  patronymic: string | null
  birthday: Date | null
  progress: ProgressType | null
}

type InitialStateType = {
  students: Array<StudentType>
  isVisibleStudentModalForm: boolean
  initialStudentData: null | StudentType
  isLoadingStudents: boolean
}

const initialState: InitialStateType = {
  students: [] as Array<StudentType>,
  isVisibleStudentModalForm: false,
  initialStudentData: null,
  isLoadingStudents: false,
};

export default (state = initialState, { type, payload }: StudentActions) => {
  switch (type) {
    case types.addStudent:
      return { ...state, students: payload, initialStudentData: null, isVisibleStudentModalForm: false };
    case types.updateStudent:
      return { ...state, students: payload, initialStudentData: null, isVisibleStudentModalForm: false };
    case types.removeStudent:
      return { ...state, students: payload };
    case types.showStudentModal:
      return { ...state, isVisibleStudentModalForm: true, initialStudentData: payload };
    case types.closeStudentModal:
      return { ...state, isVisibleStudentModalForm: false, initialStudentData: null };
    case types.fetchStudentsLoading:
      return { ...state, isLoadingStudents: true };
    case types.fetchStudentsError:
      return { ...state, isLoadingStudents: false, students: [] };
    case types.fetchStudentsSuccess:
      return { ...state, isLoadingStudents: false, students: payload };
    default:
      return state;
  }
};
