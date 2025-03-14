import reviewAnimation from '@/assets/review-animation.json';
import { Progress } from '@/components/ui/progress';
import Lottie from 'lottie-react';

export function Reviewing() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 pb-20 pt-40 text-center">
      {/* Newton's cradle animation */}
      <div className="mb-6 mt-4">
        <div className="mx-auto flex w-full max-w-[227px] items-center justify-center">
          <Lottie
            animationData={reviewAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Title and description */}
      <h1 className="mb-2 text-[28px] font-bold">Reviewing Your Answers</h1>
      <p className="mb-8 font-light text-[#52525B] md:max-w-[544px]">
        Hang tight! We&apos;re looking over your responses to share your workplace behavior results
      </p>

      {/* Progress bar using shadcn Progress component */}
      <div className="w-full max-w-[340px]">
        <Progress value={30} className="h-2 bg-[#F4F4F5]" />
      </div>
    </div>
  );
}
