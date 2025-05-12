import { ProTable, ProColumns } from '@ant-design/pro-components';
import { list } from '@/api/user/user';

const UserCRUD = () => {
  const columns: ProColumns<API.UserInfo>[] = [
    {
      title: '用户ID',
      dataIndex: 'user_id',
      key: 'user_id',
      valueType: 'digit',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      search: {
        transform: (value: string) => ({ username: value }),
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      valueType: 'text',
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>用户管理</h2>
      <ProTable<API.UserInfo>
        columns={columns}
        request={async (params) => {
          const { current, pageSize } = params;
          const response = await list({
            page: current ? BigInt(current) : 1n,
            page_size: pageSize ? BigInt(pageSize) : 10n,
            username: params.username // 添加用户名搜索参数
          });
          
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
        search={{
          filterType: 'light',
        }}
      />
    </div>
  );
};

export default UserCRUD;
