/* eslint no-restricted-imports: 0 */

import { useSliderStore } from '@/providers/slider-provider';
import { v4 as uuid } from 'uuid';

import { Movie } from '@/lib/zod-types.ts/modelSchema/MovieSchema';
import { MEDIA_QUERY } from '@/components/slider/slider-constants';

export const usePageUtils = () => {
  const TILES = useSliderStore(state => state.TILES);
  const firstPageLength = useSliderStore(state => state.firstPageLength);
  const lastPageLength = useSliderStore(state => state.lastPageLength);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const markAsPaginated = useSliderStore(state => state.markAsPaginated);
  const isMounted = useSliderStore(state => state.isMounted);

  const getTileCountPerPage = () => {
    const windowWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
    if (windowWidth < MEDIA_QUERY.SM) return 2;
    if (windowWidth < MEDIA_QUERY.MD) return 3;
    if (windowWidth < MEDIA_QUERY.LG) return 4;
    if (windowWidth < MEDIA_QUERY.XL) return 5;
    return 6;
  };

  // +1 for left/right placeholders
  const getTileCount = (num: number) => (Math.ceil(num) + 1) * getTileCountPerPage();

  const getStartIndex = (currentIndex: number, leftTilesTotal: number) => {
    // Prevents negative modulo
    return (((currentIndex - leftTilesTotal + TILES.length) % TILES.length) + TILES.length) % TILES.length;
  };

  type UpdateUuidsParams = {
    newTileList: Movie[];
    firstTileIndex: number;
    isFirstPage?: boolean;
    isLastPage?: boolean;
  };

  const updateUuids = ({
    newTileList,
    firstTileIndex,
    isFirstPage = false,
    isLastPage = false,
  }: UpdateUuidsParams) => {
    if (isFirstPage) {
      const updatedFirstElements = newTileList.slice(0, firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...updatedFirstElements, ...newTileList.slice(firstTileIndex)];
    }

    if (isLastPage) {
      const updatedLastElements = newTileList.slice(firstTileIndex).map(tile => ({
        ...tile,
        uuid: uuid(),
      }));
      return [...newTileList.slice(0, firstTileIndex), ...updatedLastElements];
    }

    return newTileList.map(tile => ({ ...tile, uuid: uuid() }));
  };

  return {
    getTileCountPerPage,
    getTileCount,
    getStartIndex,
    updateUuids,
    firstPageLength,
    lastPageLength,
    hasPaginated,
    markAsPaginated,
    isMounted,
  };
};
