'use client';

import { useDomContext } from '@/providers/dom-provider';
import { useSliderStore } from '@/providers/slider-provider';
import { PagesMap } from '@/providers/slider-store';

import { DEVELOPMENT_MODE, DIRECTION } from '@/lib/constants';
import { useEffectOnce } from '@/lib/hooks/use-effect-once';
import { useTranslatePercentage } from '@/lib/hooks/use-translate-percentage';
import { Card } from '@/lib/types';
import { cn } from '@/lib/utils';
import PaginationButton from '@/components/slider/pagination-button';
import TileList from '@/components/slider/tile-list';

const Slider = () => {
  const CARDS = useSliderStore(state => state.CARDS);
  const cardsPerPage = useSliderStore(state => state.cardsPerPage);
  const setInitialPages = useSliderStore(state => state.setInitialPages);
  const currentPage = useSliderStore(state => state.currentPage);
  const maxPage = useSliderStore(state => state.maxPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);
  const handleLeftScroll = useSliderStore(state => state.handleLeftScroll);
  const handleRightScroll = useSliderStore(state => state.handleRightScroll);
  const getTranslatePercentage = useTranslatePercentage();
  const { sliderRef } = useDomContext();

  useEffectOnce(() => {
    const pages: PagesMap = new Map<number, Card[]>();

    for (let pageIndex = 0; pageIndex < maxPage; pageIndex++) {
      const startIndex = pageIndex * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      pages.set(pageIndex + 1, CARDS.slice(startIndex, endIndex));
    }

    const lastPage = pages.get(maxPage);
    if (lastPage && lastPage.length < cardsPerPage && pages.size > 1) {
      const cardsNeeded = cardsPerPage - lastPage.length;
      pages.set(maxPage, [...lastPage, ...CARDS.slice(0, cardsNeeded)]);
    }

    const lastPageLength = lastPage ? lastPage.length : 0;
    setInitialPages(pages, lastPageLength);
  });

  return (
    <>
      <div
        ref={sliderRef}
        className={cn('group/slider relative flex w-full', {
          'bg-yellow-600': DEVELOPMENT_MODE,
        })}
      >
        {DEVELOPMENT_MODE && (
          <div className='absolute -top-16 left-1/2 z-50 -translate-x-1/2 text-[60px] font-bold'>
            {currentPage}
          </div>
        )}

        {hasPaginated && (
          <PaginationButton
            onClick={() => handleLeftScroll(getTranslatePercentage)}
            direction={DIRECTION.LEFT}
          />
        )}
        <TileList />
        <PaginationButton
          onClick={() => handleRightScroll(getTranslatePercentage)}
          direction={DIRECTION.RIGHT}
        />
      </div>
    </>
  );
};

export default Slider;
