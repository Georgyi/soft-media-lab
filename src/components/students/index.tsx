import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import StudentsControlPanel from './components/control-panel';
import StudentModalForm from './components/student-modal-form';
import StudentList from './components/student-list';
import { AppStateType } from '../../store/rootReducer';
import { fetchStudentsThunk } from './thunk';

type Props = {
  isLoadingStudents: boolean
  fetchStudentsThunk: () => void
}

const Students: React.FC<Props> = ({ fetchStudentsThunk }) => {
  useEffect(() => {
    fetchStudentsThunk();
  }, [fetchStudentsThunk]);

  return (
    <div className="students-page">
      <StudentsControlPanel />
      <StudentList />
      <StudentModalForm />
    </div>
  );
};

const mapStateToProps = ({ studentsReducer: { isLoadingStudents } }: AppStateType) => ({ isLoadingStudents });
const mapDispatchToProps = ({ fetchStudentsThunk });

export default connect(mapStateToProps, mapDispatchToProps)(Students);
