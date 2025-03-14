import { useLayoutsContext } from '@/contexts/layouts';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

export type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  const layoutsContext = useLayoutsContext();
  const currentYear = new Date().getFullYear();

  if (layoutsContext.hideFooter) return null;

  return (
    <footer
      className={cn(
        'bottom-0 flex min-h-[63px] w-full flex-col items-center justify-between gap-5 py-5 text-sm text-gray-600',
        'md:flex-row',
        className
      )}
    >
      <div>&copy; {currentYear} Behavioral Essentials</div>
      <div className="flex flex-col items-center gap-2 text-center md:flex-row">
        Need Help?{' '}
        <Link to="/" className="font-medium text-primary hover:underline">
          Contact support@behavioralessentials.com
        </Link>
      </div>
    </footer>
  );
}
