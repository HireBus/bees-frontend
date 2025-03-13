import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/take')({
  component: TakePage,
});

function TakePage() {
  return <div>Hello &quot;/_public/take&quot;!</div>;
}
