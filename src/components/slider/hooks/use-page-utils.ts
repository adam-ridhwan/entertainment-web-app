/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { MEDIA_QUERY } from '@/lib/constants';
import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';

export const usePageUtils = () => {
  const TILES = useSliderStore(state => state.TILES);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const getTilesPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    if (windowWidth < MEDIA_QUERY.XL) return 5;
    return 6;
  };

  // +1 for left/right placeholders
  const getTotalTiles = (num: number) => (Math.ceil(num) + 1) * getTilesPerPage();

  const getStartIndex = (currentIndex: number, leftTilesTotal: number) => {
    // Prevents negative modulo
    return (((currentIndex - leftTilesTotal + TILES.length) % TILES.length) + TILES.length) % TILES.length;
  };

  type UpdateUuidsParams = {
    currentPageTiles: Movie[];
    firstTileIndex: number;
    isFirstPage?: boolean;
    isLastPage?: boolean;
  };

  const updateUuids = ({
    currentPageTiles,
    firstTileIndex,
    isFirstPage = false,
    isLastPage = false,
  }: UpdateUuidsParams) => {
    if (isFirstPage) {
      const updatedFirstElements = currentPageTiles.slice(0, firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...updatedFirstElements, ...currentPageTiles.slice(firstTileIndex)];
    }

    if (isLastPage) {
      const updatedLastElements = currentPageTiles.slice(firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...currentPageTiles.slice(0, firstTileIndex), ...updatedLastElements];
    }

    return currentPageTiles.map(tile => ({ ...tile, uuid: uuid() }));
  };

  return {
    getTilesPerPage,
    getTotalTiles,
    getStartIndex,
    updateUuids,
    firstPageLength,
    lastPageLength,
    hasPaginated,
    markAsPaginated,
    isMounted,
  };
};
