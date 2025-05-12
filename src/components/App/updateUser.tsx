import useUpdateUserStore from '@/stores/updateUserHandler';
import { Modal } from 'antd';

export default () => {
  const isOpen = useUpdateUserStore((state) => state.isOpen);
  const setOpen = useUpdateUserStore((state) => state.setOpen);
  const handlerOk = () => {
    console.log("确定")
  }

  return (
    <Modal
      title="修改用户信息"
      open={isOpen}
      onCancel={() => setOpen(false)}
      onOk={handlerOk}
    >
      <p>修改用户信息</p>
    </Modal>
  );
};
