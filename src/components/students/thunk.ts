import { Dispatch } from 'redux';

import { StudentType } from './reducer';
import { fetchStudentsErrorAction, fetchStudentsLoadingAction, fetchStudentsSuccessAction } from './actions';
import { LS_KEYS } from './constants';

export const fetchStudentsThunk = () => async (dispatch: Dispatch) => {
  dispatch(fetchStudentsLoadingAction());

  try {
    const getStudentsPromise = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Задержка на 1.5 секунды');

          const LSStudents = localStorage.getItem(LS_KEYS.students);
          const students: Array<StudentType> = [];

          try {
            students.push(...JSON.parse(LSStudents!));
          } catch (e) {
            localStorage.removeItem(LS_KEYS.students);
          } finally {
            resolve(students);
          }
        }, 1500);
      })
    };

    const students: any = await getStudentsPromise();

    dispatch(fetchStudentsSuccessAction(students));
  } catch (error) {
    dispatch(fetchStudentsErrorAction());
  }
};
