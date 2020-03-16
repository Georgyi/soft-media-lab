import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import moment from 'moment';

import { progressByKey } from '../../../../utils/helpers/progress-by-key';
import { addStudent, closeStudentModal, updateStudent } from '../../actions';
import { AppStateType } from '../../../../store/rootReducer';
import { ProgressType, StudentType } from '../../reducer';
import isEmptyValuesByObject from '../../../../utils/helpers/is-empty-values-by-object';

import './index.scss';

type Props = {
  isVisibleStudentModalForm: boolean
  closeStudentModal: () => void
  addStudent: (student: StudentType) => void
  updateStudent: (student: StudentType) => void
  initialStudentData: null | StudentType
}

const initialStudentFormValues: StudentType = {
  id: uniqid(),
  firstName: null,
  lastName: null,
  patronymic: null,
  birthday: null,
  progress: null,
};

const dateFormatList: string[] = ['DD/MM/YYYY', 'DD/MM/YY'];

const StudentModalForm: React.FC<Props> = (props) => {
  const { isVisibleStudentModalForm, closeStudentModal, addStudent, updateStudent, initialStudentData } = props;
  const [formValues, setFormValues] = useState<StudentType>(initialStudentFormValues);

  useEffect(() => {
    if (initialStudentData) {
      setFormValues({...initialStudentData})
    } else {
      setFormValues({ ...initialStudentFormValues });
    }
  }, [initialStudentData]);

  const changeInputValue = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setFormValues((formValues) => ({ ...formValues, [name]: value }));
  };

  const renderSelectOptions = () => {
    const keys: Array<string> = Object.keys(progressByKey);
    const { Option } = Select;

    return (
      <Select
        className="full-width-form-element"
        placeholder="Выберите успеваемость"
        onChange={(progress: ProgressType) => setFormValues((formValues: StudentType): StudentType => {
          return { ...formValues, progress };
        })}
        value={formValues.progress || undefined}
      >
        {keys.map((key ) => {
          const correctType: ProgressType = key as ProgressType;
          return (<Option key={correctType} value={correctType}>{progressByKey[correctType]}</Option>)
        })}
      </Select>
    );
  };

  const title: string = initialStudentData ? 'Редактировать данные студента': 'Добавить студента';

  const submitForm = () => {
    if (isEmptyValuesByObject(formValues)) return null;
    initialStudentData ? updateStudent(formValues) : addStudent(formValues);

  };

  const pressedEnter = ({ key }: React.KeyboardEvent) => {
    if (key === 'Enter') submitForm();
  };

  return (
    <div>
      <Modal
        className="student-form-modal"
        title={title}
        visible={isVisibleStudentModalForm}
        onOk={submitForm}
        okButtonProps={{
          disabled: isEmptyValuesByObject(formValues)
        }}
        cancelText="Отмена"
        okText={initialStudentData ? 'Изменить' : 'Создать'}
        onCancel={closeStudentModal}
      >
        <Input
          name="firstName"
          className="mb-1"
          value={formValues.firstName || undefined}
          onChange={changeInputValue}
          placeholder="Имя"
          onKeyPress={pressedEnter}
        />
        <Input
          name="lastName"
          className="mb-1"
          value={formValues.lastName || undefined}
          onChange={changeInputValue}
          placeholder="Фамилия"
          onKeyPress={pressedEnter}
        />
        <Input
          name="patronymic"
          className="mb-1"
          value={formValues.patronymic || undefined}
          onChange={changeInputValue}
          placeholder="Отчество"
          onKeyPress={pressedEnter}
        />
        <DatePicker
          className="full-width-form-element mb-1"
          placeholder="Укажите ваш день рождения"
          format={dateFormatList}
          value={formValues.birthday ? moment(formValues.birthday) : null}
          onChange={(momentData) => {
            setFormValues((formValues): StudentType => {
              return { ...formValues, birthday: momentData ? momentData.toDate() : null };
            });
          }}
        />
        {renderSelectOptions()}
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ studentsReducer: { isVisibleStudentModalForm, initialStudentData } }: AppStateType) => ({
  isVisibleStudentModalForm, initialStudentData,
});
const mapDispatchToProps = { closeStudentModal, updateStudent, addStudent };

export default connect(mapStateToProps, mapDispatchToProps)(StudentModalForm);
