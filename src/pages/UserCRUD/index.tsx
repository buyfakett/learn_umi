import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { List, Delete } from '@/api/user/user';
import { message, Popconfirm, Button, Input, Space, Row, Col } from 'antd';
import { useRef, useState } from 'react';
import { UserInfo } from '@/api/user/types';
import { SearchOutlined } from '@ant-design/icons';

const UserCRUD = () => {
  const actionRef = useRef<ActionType>();
  const [username, setUsername] = useState<string>('');

  const columns: ProColumns<UserInfo>[] = [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
      valueType: 'digit',
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      valueType: 'text',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        record.user_id === 1 ? (
          <Button key="delete" type="primary" disabled title="该用户不可删除">
            删除
          </Button>
        ) : (
          <Popconfirm
            key="delete"
            title="确定要删除该用户吗?"
            onConfirm={async () => {
              try {
                await Delete({ user_id: record.user_id });
                message.success('删除成功');
                action?.reload();
              } catch (error) {
                message.error('删除失败');
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popconfirm>
        ),
      ],
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>用户管理</h2>
      
      <Row gutter={24} style={{ marginBottom: 16 }}>
        <Col>
          <Space>
            <Input
              placeholder="请输入用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              allowClear
              onPressEnter={() => actionRef.current?.reload()}
            />
            <Button 
              type="primary" 
              icon={<SearchOutlined />}
              onClick={() => actionRef.current?.reload()}
            >
              查询
            </Button>
          </Space>
        </Col>
      </Row>
      
      <ProTable<UserInfo>
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          const { current, pageSize } = params;
          const queryParams: Record<string, any> = {
            page: current ? current : 1,
            page_size: pageSize ? pageSize : 10,
          };

          // 只有当username有值时才添加到查询参数
          if (username) {
            queryParams.username = username;
          }

          const response = await List(queryParams);
          
          return {
            data: (response?.data || []).map(item => ({
              ...item,
              user_id: Number(item.user_id),
            })),
            success: !!response,
            total: Number(response?.total || 0),
          };
        }}
        rowKey="user_id"
        pagination={{
          pageSize: 10,
        }}
        search={false}
      />
    </div>
  );
};

export default UserCRUD;
