import { useQuery, useQueryClient } from '@tanstack/react-query';

import services from '../services';

import { QUERY_KEYS } from '@/constants/index';
import { useStore } from '@/providers/StoreProvider';

export const useCL = () => {
  const queryClient = useQueryClient();

  const { user } = useStore();

  const {
    data: ClData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.CL],

    queryFn: () => {
      return services.getCL(user as string);
    },
    enabled: !!user,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CL] });
  };

  return { ClData, isError, invalidateQuery, isLoading };
};
