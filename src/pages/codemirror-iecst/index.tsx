import React from 'react';
import CodemirrorIECSTEditor from '../../example/codemirror-iecst-editor';
import { StarOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

const CodemirrorIECSTPage: React.FC = () => {
  return (
    <Space direction='vertical' style={{ width: '100%'}}>
      <a href="https://github.com/Juexro/codemirror-iecst" target='_blank' rel='noreferrer'>
        <Button size='small'><StarOutlined /> Star</Button>
      </a>
      <CodemirrorIECSTEditor />
    </Space>
  );
};

export default CodemirrorIECSTPage;