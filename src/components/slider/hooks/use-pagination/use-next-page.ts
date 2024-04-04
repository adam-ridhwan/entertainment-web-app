/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';

import { usePaginationLogger } from '@/components/slider/hooks/use-pagination/use-pagination';

export const useNextPage = () => {
  const currentPage = useSliderStore(state => state.currentPage);
  const setCurrentPage = useSliderStore(state => state.setCurrentPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);

  const goToNextPage = () => {
    usePaginationLogger.next();

    if (!hasPaginated) markAsPaginated();
    setCurrentPage(currentPage + 1);
  };

  return { goToNextPage };
};
