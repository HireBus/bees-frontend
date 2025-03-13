import { useLayoutsContext } from '@/contexts/layouts';
import { cn } from '@/lib/utils';

export type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps) {
  const layoutsContext = useLayoutsContext();

  if (layoutsContext.hideNavbar) return null;

  return (
    <div className={cn('flex min-h-24 items-center px-5 md:px-10', className)}>
      <h1 className="text-2xl font-bold">Blind Spotting</h1>
    </div>
  );
}
