import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getUserAvatar } from '../api';

const useGetUserAvatar = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const { isLoading, error, isError, data, refetch } = useQuery('avatar', () =>
    getUserAvatar(cookies.access_token)
  );

  let userAvatarIsLoading = isLoading;
  let userAvatarError = error;
  let userAvatarIsError = isError;
  let userAvatarData = data;
  let userAvatarRefetch = refetch;

  return {
    userAvatarIsLoading,
    userAvatarError,
    userAvatarIsError,
    userAvatarData,
    userAvatarRefetch,
  };
};

export default useGetUserAvatar;
