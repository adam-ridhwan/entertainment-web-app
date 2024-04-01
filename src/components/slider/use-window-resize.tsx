import { useEffect, useRef } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem, getTilesPerPage } from '@/lib/utils';

const useWindowResize = () => {
  const pages = useSliderStore(state => state.pages);
  const setPagesAfterResize = useSliderStore(state => state.setPagesAfterResize);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const prevTilesPerPage = useRef(tilesPerPage);

  useEffect(() => {
    const handleResize = () => {
      const newTilesPerPage = getTilesPerPage();

      if (newTilesPerPage !== prevTilesPerPage.current) {
        const previousTilesCurrentPage = getMapItem({
          label: 'currentTilesOfPreviousMediaQuery',
          map: pages,
          key: currentPage,
        });

        setPagesAfterResize(previousTilesCurrentPage);
        prevTilesPerPage.current = newTilesPerPage;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, pages, setPagesAfterResize]);
};

export default useWindowResize;