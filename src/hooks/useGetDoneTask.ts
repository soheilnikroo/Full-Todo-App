import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getTasksRequest } from '../api';

const useGetDoneTask = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const { isLoading, error, isError, data, refetch } = useQuery(
    'done-todos',
    () => getTasksRequest(cookies.access_token, true)
  );

  let doneTodosodosIsLoading = isLoading;
  let doneTodosodosError = error;
  let doneTodosodosIsError = isError;
  let doneTodosodosData = data;
  let doneTodosodosRefetch = refetch;

  return {
    doneTodosodosIsLoading,
    doneTodosodosError,
    doneTodosodosIsError,
    doneTodosodosData,
    doneTodosodosRefetch,
  };
};

export default useGetDoneTask;
