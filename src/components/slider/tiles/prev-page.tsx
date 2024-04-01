import { Fragment } from 'react';
import { useSliderStore } from '@/providers/slider-provider';

import { getMapItem } from '@/lib/utils';
import TileItem from '@/components/slider/tiles/tile-item';

const PrevPage = () => {
  const pages = useSliderStore(state => state.pages);
  const currentPage = useSliderStore(state => state.currentPage);
  const tilesPerPage = useSliderStore(state => state.tilesPerPage);
  const hasPaginated = useSliderStore(state => state.hasPaginated);

  if (!hasPaginated) return null;

  const prevPageTiles = getMapItem({
    label: 'prevPageTiles',
    map: pages,
    key: currentPage - 1,
  });

  return prevPageTiles.map((tile, i) => (
    <Fragment key={`PrevPage-${tile.id}`}>
      <TileItem
        tile={tile}
        displayNumber={i === tilesPerPage - 1 ? 0 : ''}
        isVisibleOnScreen={true}
      />
    </Fragment>
  ));
};

export default PrevPage;