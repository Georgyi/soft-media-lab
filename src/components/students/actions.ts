import { Dispatch } from 'redux';

import * as types from './types';
import { StudentType } from './reducer';
import { AppStateType } from '../../store/rootReducer';

export type StudentActions = AddStudentActionType | UpdateStudentActionType | RemoveStudentActionType
  | ShowStudentModalActionType | CloseStudentModalActionType | FetchStudentsErrorActionType
  | FetchStudentsSuccessActionType | FetchStudentsLoadingActionType;

type AddStudentActionType = {
  type: typeof types.addStudent
  payload: Array<StudentType>
}

const addStudentAction = (students: StudentType[]): AddStudentActionType => {
  return { type: types.addStudent, payload: students };
};

export const addStudent = (student: StudentType) => (dispatch: Dispatch, getState: () => AppStateType) => {
  const students: Array<StudentType> = [...getState().studentsReducer.students, student];

  localStorage.setItem('students', JSON.stringify(students));

  dispatch(addStudentAction(students));
};

type UpdateStudentActionType = {
  type: typeof types.updateStudent
  payload: Array<StudentType>
}

const updateStudentAction = (students: StudentType[]): UpdateStudentActionType => {
  return { type: types.updateStudent, payload: students };
};

export const updateStudent = (updateStudent: StudentType) => (dispatch: Dispatch, getState: () => AppStateType) => {
  const updatedStudents: Array<StudentType> = [...getState().studentsReducer.students]
    .map((student: StudentType) => student.id === updateStudent.id ? updateStudent : student);

  localStorage.setItem('students', JSON.stringify(updatedStudents));

  dispatch(updateStudentAction(updatedStudents));
};

type RemoveStudentActionType = {
  type: typeof types.removeStudent
  payload: Array<StudentType>
}

const removeStudentAction = (students: StudentType[]): RemoveStudentActionType => {
  return { type: types.removeStudent, payload: students };
};

export const removeStudent = (id: string) => (dispatch: Dispatch, getState: () => AppStateType) => {
  const students: Array<StudentType> = [...getState().studentsReducer.students]
    .filter((student: StudentType) => student.id !== id);

  localStorage.setItem('students', JSON.stringify(students));

  dispatch(removeStudentAction(students));
};

type ShowStudentModalActionType = {
  type: typeof types.showStudentModal
  payload: null | StudentType
}

const showStudentModalAction = (student: null | StudentType): ShowStudentModalActionType => {
  return { type: types.showStudentModal, payload: student };
};

export const showStudentModal = (id?: string) => (dispatch: Dispatch, getState: () => AppStateType) => {
  const student = id ? getState().studentsReducer.students.find((student: StudentType) => student.id === id) : null;
  dispatch(showStudentModalAction(student));
};

type CloseStudentModalActionType = {
  type: typeof types.closeStudentModal
  payload?: any
}

const closeStudentModalAction = (): CloseStudentModalActionType => ({ type: types.closeStudentModal });

export const closeStudentModal = () => (dispatch: Dispatch) => {
  dispatch(closeStudentModalAction());
};

type FetchStudentsErrorActionType = {
  type: typeof types.fetchStudentsError
  payload?: null
}

export const fetchStudentsErrorAction = (): FetchStudentsErrorActionType => ({ type: types.fetchStudentsError });

type FetchStudentsLoadingActionType = {
  type: typeof types.fetchStudentsLoading
  payload?: null
}

export const fetchStudentsLoadingAction = (): FetchStudentsLoadingActionType => ({ type: types.fetchStudentsLoading });

type FetchStudentsSuccessActionType = {
  type: typeof types.fetchStudentsSuccess
  payload: Array<StudentType>
}

export const fetchStudentsSuccessAction = (students: Array<StudentType>): FetchStudentsSuccessActionType => {
  return { type: types.fetchStudentsSuccess, payload: students };
};