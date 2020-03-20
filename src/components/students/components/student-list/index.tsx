import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';

import { StudentType } from '../../reducer';
import StudentTableColumns from './data/table-columns';
import { AppStateType } from '../../../../store/rootReducer';
import { removeStudent, showStudentModal } from '../../actions';

import './index.scss';

type Props = {
  students: Array<StudentType>
  showStudentModal: (id?: string) => void
  removeStudent: (id: string) => void
  isLoadingStudents: boolean
}

const StudentList: React.FC<Props> = ({ students, showStudentModal, removeStudent, isLoadingStudents }) => {
  const getStudentsDataSource = (students: Array<StudentType> = []) =>
    students.map((student) => ({
      ...student,
      key: student.id,
      onShowEditModal: (id: string) => {
        showStudentModal(id);
      },
      onRemoveStudent: (id: string) => {
        removeStudent(id);
      },
    }));

  return (
    <div className="student-list">
      <Table
        loading={isLoadingStudents}
        columns={StudentTableColumns}
        dataSource={getStudentsDataSource(students)}
        pagination={false}
      />
    </div>
  );
};

const mapStateToProps = ({ studentsReducer: { students, isLoadingStudents }}: AppStateType) => ({ students, isLoadingStudents });
const mapDispatchToProps = ({ showStudentModal, removeStudent });

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
