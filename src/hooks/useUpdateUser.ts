import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { patchUserRequest } from '../api';

const useUpdateUser = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const updateTask = useMutation((user: any) =>
    patchUserRequest({
      access_token: cookies.access_token,
      body: {
        userName: user.userName,
        imageUrl: user.imageUrl,
      },
    })
  );

  return updateTask;
};

export default useUpdateUser;
