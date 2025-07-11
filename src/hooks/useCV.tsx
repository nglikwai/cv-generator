import { useQuery, useQueryClient } from '@tanstack/react-query';

import services from '../services';

import { QUERY_KEYS } from '@/constants/index';
import { useStore } from '@/providers/StoreProvider';

export const useCV = () => {
  const queryClient = useQueryClient();

  const { user } = useStore();

  const {
    data: CvData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.CV],

    queryFn: () => {
      return services.getCV(user as string);
    },
    enabled: !!user,
  });

  const { data: CvDefaultData } = useQuery({
    queryKey: [QUERY_KEYS.CV_DEFAULT],

    queryFn: () => {
      return services.getCV(('default-' + user) as string);
    },
    enabled: !!user,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CV] });
  };

  return { CvData, isError, invalidateQuery, isLoading, CvDefaultData };
};
