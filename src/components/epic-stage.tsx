'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { GenreLabel, GENRES, MediaType, Movie } from '@/lib/types';
import { HeadingLarge } from '@/components/fonts';

type EpicStageProps = {
  content: Movie;
  mediaType: MediaType;
};

type GetObjectKeyParams<K extends string, V> = {
  label: string;
  object: Record<K, V>;
  value: V[];
};

const getObjectKey = <K extends string, V>({ label, object, value }: GetObjectKeyParams<K, V>): K[] => {
  return value.map(v => {
    for (const [key, val] of Object.entries(object) as [K, V][]) {
      if (val === v) return key;
    }
    throw new Error(`${label}: Value not found: ${v}`);
  });
};

const toPascalCase = (inputString: GenreLabel) => {
  return inputString
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/(?:^|\s)\S/g, c => c.toUpperCase());
};

const getFirstSentence = (text: string) => {
  const match = text.match(/^(.*?[.])\s/);
  return match ? match[1] : text;
};

const EpicStage = ({ content, mediaType }: EpicStageProps) => {
  const genres = getObjectKey({
    label: 'genre_ids',
    object: GENRES,
    value: content.genre_ids,
  });

  const router = useRouter();

  return (
    <>
      <Link
        href={`/browse/${mediaType}/${content.id}`}
        scroll={false}
        onMouseEnter={() => router.prefetch(`/browse/${mediaType}/${content.id}`)}
      >
        <div className='relative mb-4 aspect-video overflow-hidden min-[1700px]:rounded-b-2xl'>
          <Image
            src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
            alt={content.original_title}
            priority
            fill
            className='object-cover'
          />

          <div className='absolute bottom-0 left-0 right-0 z-10 h-1/2 bg-gradient-to-t from-black' />

          <div className='absolute bottom-0 left-0 z-50 flex w-1/2 flex-col gap-2 p-10'>
            <HeadingLarge>{content.title}</HeadingLarge>
            <ul className='flex flex-row gap-2'>
              {genres.map(genre => (
                <li key={genre}>
                  <p className='text-genre'>{toPascalCase(genre)}</p>
                </li>
              ))}
            </ul>
            <p className='text-overview'>{getFirstSentence(content.overview)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EpicStage;
