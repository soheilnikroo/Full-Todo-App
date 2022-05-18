import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getRequestUser } from '../api';

const useGetUser = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const { isLoading, error, isError, data, refetch } = useQuery('user', () =>
    getRequestUser(cookies.access_token)
  );

  let userIsLoading = isLoading;
  let userError = error;
  let userIsError = isError;
  let userData = data;
  let userRefetch = refetch;

  return { userIsLoading, userError, userIsError, userData, userRefetch };
};

export default useGetUser;
