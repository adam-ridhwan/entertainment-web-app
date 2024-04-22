import * as React from 'react';
import { Suspense } from 'react';
import Backdrop from '@/browse/components/backdrop';
import { Label } from '@/browse/components/label';
import { Actors, Genres, Keywords } from '@/browse/components/metadata';
import Modal from '@/browse/components/modal';
import MoreLikeThis from '@/browse/components/more-like-this';
import { BackdropSkeleton, MetadataSkeleton, OverviewSkeleton } from '@/browse/components/skeleton';

import { ContentRouteParams } from '@/lib/types';
import TileLoadingSkeleton from '@/components/tile-loading-skeleton';

export default function ContentModal({ params: { contentType, id } }: { params: ContentRouteParams }) {
  return (
    <>
      {/* Need this so that when we navigate directly to url, the overlay appears immediately */}
      <div
        className='fixed inset-0 z-50 bg-black/80
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
      />

      <Modal>
        <Suspense fallback={<BackdropSkeleton />}>
          <Backdrop {...{ contentType, id }} />
        </Suspense>

        <div className='flex flex-col gap-12 px-leftRightCustom pt-4 lg:flex-row'>
          <div className='flex w-full flex-col gap-4 lg:w-3/5'>
            <Suspense fallback={<OverviewSkeleton />}>
              <Label {...{ contentType, id }} />
            </Suspense>
          </div>

          <div className='flex w-full flex-col justify-center gap-4 lg:w-2/5'>
            <Suspense fallback={<MetadataSkeleton />}>
              <Actors {...{ contentType, id }} />
              <Genres {...{ contentType, id }} />
              <Keywords {...{ contentType, id }} />
            </Suspense>
          </div>
        </div>

        <div className='mx-leftRightCustom border border-b-muted-foreground/20 pt-4' />

        <Suspense fallback={<TileLoadingSkeleton count={1} />}>
          <MoreLikeThis {...{ contentType, id }} />
        </Suspense>

        <div className='mx-leftRightCustom border border-b-muted-foreground/20' />
      </Modal>
    </>
  );
}
