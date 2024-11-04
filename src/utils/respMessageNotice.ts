import message from '@arco-design/web-vue/es/message';

export const respSuccess = (msg: string) => {
  message.success({
    content: msg,
  });
};

export const respFalse = (msg: string, desc: string) => {
  const errorMsg = msg + !desc ? desc : '';
  message.error({
    content: errorMsg,
  });
};
