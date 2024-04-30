'use client';

import { usePathname } from 'next/navigation';
import { useSearchStore } from '@/providers/search/search-provider';
import { BrowseRoute } from '@/routes';

import { cn } from '@/lib/utils';
import { BodySmall } from '@/components/fonts';
import { LogoIcon } from '@/components/icons';
import SearchInput from '@/components/search/search-input';

const NavBar = () => {
  const pathname = usePathname();
  const { actions: { handleNavigate } } = useSearchStore(); // prettier-ignore

  return (
    <div className='fixed top-0 z-50 flex h-16 w-full items-center bg-black'>
      <div className='container flex flex-row items-center justify-between px-leftRightCustom'>
        <div className='relative flex w-full flex-row items-center gap-8'>
          <LogoIcon />

          <nav>
            <BrowseRoute.Link
              onClick={handleNavigate}
              className={cn({ 'pointer-events-none select-none': pathname === BrowseRoute() })}
            >
              <BodySmall
                className={cn('transition-colors hover:text-primary/50', {
                  'text-primary': pathname === BrowseRoute(),
                  'text-primary/70': pathname !== BrowseRoute(),
                })}
              >
                Home
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
