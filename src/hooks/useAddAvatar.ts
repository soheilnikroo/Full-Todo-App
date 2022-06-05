import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { postUserAvatar } from '../api';

interface NewAvatarType {
  imageUrl: any;
}

const useAddAvatar = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const addTask = useMutation((newAvatar: NewAvatarType) =>
    postUserAvatar({
      access_token: cookies.access_token,
      body: {
        imageUrl: newAvatar.imageUrl,
      },
    })
  );

  return addTask;
};

export default useAddAvatar;
