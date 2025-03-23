import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import UserInput from '@/components/Main/Input';
import Output from '@/components/Main/Output';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='relative grid grid-cols-2 gap-12 p-24'>
      <div className='col-span-full flex justify-center items-center flex-col'>
        <div
          className={cn(
            'rounded-full w-60 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
          )}
        >
          <Link href='https://github.com' target='_blank'>
            <AnimatedShinyText className='flex items-center justify-center px-6 py-2 transition ease-out hover:text-neutral-800 hover:duration-300 hover:dark:text-neutral-400'>
              ✨ <hr className='mx-2 h-4 w-[1px] bg-neutral-600 ' /> Star on
              Github
              <ArrowRightIcon className='ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
            </AnimatedShinyText>
          </Link>
        </div>
        <h1 className='uppercase my-6 font-extrabold text-7xl text-center w-full lg:w-[90%] mx-auto'>
          Write a standout Twitter bio — uniquely yours, instantly.
        </h1>
        <p className='text-xl text-gray-500 font-medium text-center w-full lg:w-[90%] mx-auto'>
          Simply answer a few questions, and we’ll craft a bio that perfectly
          captures your essence.
        </p>
      </div>
      <UserInput />
      <Output />
    </main>
  );
}
