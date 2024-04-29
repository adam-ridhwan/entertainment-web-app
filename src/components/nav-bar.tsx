'use client';

import { usePathname } from 'next/navigation';
import { BrowseRoute } from '@/routes';

import { cn } from '@/lib/utils';
import { useSearch } from '@/hooks/use-search';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';
import SearchInput from '@/components/search-input/search-input';

const NavBar = () => {
  const pathname = usePathname();
  const { handleLinkNavigation } = useSearch();

  return (
    <div className='flex h-16 items-center bg-black'>
      <div className='container flex flex-row items-center justify-between px-leftRightCustom'>
        <div className='relative flex w-full flex-row items-center gap-8'>
          <LogoIcon />

          <nav>
            <BrowseRoute.Link onClick={() => handleLinkNavigation()}>
              <BodySmall
                className={cn('transition-colors hover:text-primary/50', {
                  'text-primary': pathname === BrowseRoute(),
                  'text-primary/70': pathname !== BrowseRoute(),
                })}
              >
                Browse
              </BodySmall>
            </BrowseRoute.Link>
          </nav>

          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
