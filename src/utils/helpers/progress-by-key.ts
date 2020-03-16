import { ProgressType } from '../../components/students/reducer';

type ProgressByKeyType = {
  [key in ProgressType]: string
}

export const progressByKey: ProgressByKeyType = {
  excellent: 'Отличное',
  good: 'Хорошо',
  satisfactorily: 'Удовлетварительно',
  unsatisfactory: 'Неудовлетварительно',
};
