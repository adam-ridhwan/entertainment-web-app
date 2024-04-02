import { DIRECTION, TIMEOUT_DURATION } from '@/lib/constants';
import { usePagination } from '@/components/slider/hooks/use-pagination';
import { useSlide } from '@/components/slider/hooks/use-slide';
import PaginationButton from '@/components/slider/pagination-button/pagination-button';

const PaginateRightButton = () => {
  const [_, { getMaxPages }] = usePagination();
  const [slide, { calculateSlideAmount, enableAnimation, disableAnimation }] = useSlide();

  const [
    { currentPage },
    { lastPageLength, isFirstPageVisited },
    { goToLastPage, goToFirstPage, goToNextPage },
  ] = usePagination();

  const handlePaginateRight = () => {
    const maxPages = getMaxPages();
    const slideAmount = calculateSlideAmount({
      direction: DIRECTION.RIGHT,
      lastPageLength: lastPageLength,
      isLastPage: currentPage + 1 === maxPages - 2 && isFirstPageVisited,
    });
    enableAnimation();
    slide(slideAmount);

    setTimeout(() => {
      disableAnimation();
      slide(0);
      if (currentPage === maxPages - 3) return goToLastPage();
      if (currentPage === maxPages - 2) return goToFirstPage();
      goToNextPage();
    }, TIMEOUT_DURATION);
  };

  return (
    <PaginationButton
      onClick={() => handlePaginateRight()}
      direction={DIRECTION.RIGHT}
      className=''
    />
  );
};

export default PaginateRightButton;