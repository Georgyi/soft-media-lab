import React  from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Moment from 'react-moment';

import { progressByKey } from '../../../../../../utils/helpers/progress-by-key';
import { ProgressType } from '../../../../reducer';

export default [
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Отчество',
    dataIndex: 'patronymic',
    key: 'patronymic',
  },
  {
    title: 'День рождения',
    dataIndex: 'birthday',
    key: 'birthday',
    render: (date: Date) => <Moment format="DD/MM/YYYY">{date}</Moment>,
  },
  {
    title: 'Успеваемость',
    dataIndex: 'progress',
    key: 'progress',
    render: (progressKey: ProgressType) => progressByKey[progressKey],
  },
  {
    title: 'Действия',
    dataIndex: 'actions',
    key: 'actions',
    render: (a: any, { id, onShowEditModal, onRemoveStudent }: any) => (
      <span className="student-table-action">
        <Tooltip title="Изменть">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onShowEditModal(id)}
          />
        </Tooltip>
        <Tooltip title="Удалить">
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onRemoveStudent(id)}
          />
        </Tooltip>
      </span>
    ),
  },
];
