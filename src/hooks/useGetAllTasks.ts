import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getTasksRequest } from '../api';

const useGetAllTasks = () => {
  const [cookies, setCookie] = useCookies(['access_token']);

  const { isLoading, error, isError, data, refetch } = useQuery(
    'todos-all',
    () => getTasksRequest(cookies.access_token)
  );

  let allTodosIsLoading = isLoading;
  let allTodosError = error;
  let allTodosIsError = isError;
  let allTodosData = data;
  let allTodosRefetch = refetch;

  return {
    allTodosIsLoading,
    allTodosError,
    allTodosIsError,
    allTodosData,
    allTodosRefetch,
  };
};

export default useGetAllTasks;
