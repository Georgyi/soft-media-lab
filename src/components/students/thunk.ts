import { Dispatch } from 'redux';

import { StudentType } from './reducer';
import { fetchStudentsErrorAction, fetchStudentsLoadingAction, fetchStudentsSuccessAction } from './actions';

export const fetchStudentsThunk = () => async (dispatch: Dispatch) => {
  dispatch(fetchStudentsLoadingAction());

  try {
    const getStudentsPromise = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Задержка на 1.5 секунды');
          const LSStudents = localStorage.getItem('students');
          const students: Array<StudentType> = LSStudents ? JSON.parse(LSStudents!) : [];
          resolve(students);
        }, 1500);
      })
    };

    const students: any = await getStudentsPromise();

    dispatch(fetchStudentsSuccessAction(students));
  } catch (error) {
    dispatch(fetchStudentsErrorAction());
  }
};