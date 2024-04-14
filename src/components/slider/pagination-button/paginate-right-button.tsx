import { useDomContext } from '@/providers/dom-provider';

import { useAnimation } from '@/components/slider/hooks/use-animation';
import { usePageUtils } from '@/components/slider/hooks/use-page-utils';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';
import { SLIDE_DIRECTION, TIMEOUT_DURATION } from '@/components/slider/slider-constants';

const PaginateRightButton = () => {
  const {
    status: { isLastPage, isSecondToLastPage },
    actions: { goToFirstPage, goToLastPage, goToNextPage },
  } = usePagination();
  const {
    state: { hasPaginated },
    actions: { markAsPaginated, wait },
  } = usePageUtils();
  const { slide, getSlideAmount } = useSlide();
  const { enableAnimation, disableAnimation } = useAnimation();
  const { paginationButtonRef } = useDomContext();

  const handlePaginateRight = async () => {
    enableAnimation();
    const slideAmount = getSlideAmount({
      direction: SLIDE_DIRECTION.RIGHT,
      isSecondToLastPage,
    });
    slide(slideAmount);

    await wait(TIMEOUT_DURATION);

    if (!hasPaginated) markAsPaginated();
    disableAnimation();
    slide(0);
    if (isSecondToLastPage) return goToLastPage();
    if (isLastPage) return goToFirstPage();
    goToNextPage();
  };

  return (
    <PaginationButton
      ref={paginationButtonRef}
      onClick={handlePaginateRight}
      direction={SLIDE_DIRECTION.RIGHT}
    />
  );
};

export default PaginateRightButton;
