import React from 'react';
import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { AppStateType } from '../../../../store/rootReducer';
import { showStudentModal } from '../../actions';

import './index.scss';

type Props = {
  showStudentModal: () => void
  isLoadingStudents: boolean
}

const StudentsControlPanel: React.FC<Props> = ({ showStudentModal, isLoadingStudents }) => {
  return (
    <div className="students-control-panel">
      <Button
        type="primary"
        icon={<UserAddOutlined />}
        onClick={showStudentModal}
        disabled={isLoadingStudents}
      >Добавить студента</Button>
    </div>
  );
};

const mapStateToProps = (({ studentsReducer: { isLoadingStudents }}: AppStateType) => ({ isLoadingStudents }));
const mapDispatchToProps = { showStudentModal };

export default connect(mapStateToProps, mapDispatchToProps)(StudentsControlPanel);
