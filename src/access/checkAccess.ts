import { accessEnum } from '@/access/accessEnum';

export const checkAccess = (
  loginUser: any,
  needAccess = accessEnum.NO_LOGIN,
) => {
  const userAccess = loginUser?.userRole ?? accessEnum.NO_LOGIN;
  console.log('sss', userAccess === accessEnum.ADMIN);
  if (needAccess === accessEnum.USER) return userAccess !== accessEnum.NO_LOGIN;
  if (needAccess === accessEnum.ADMIN) return userAccess === accessEnum.ADMIN;
  return true;
};
