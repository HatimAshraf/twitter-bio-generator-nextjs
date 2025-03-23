'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from '@/components/ui/form';

const formSchema = z.object({
  model: z.string().min(1, {
    message: 'Model is required',
  }),
  temperature: z
    .number()
    .min(0, {
      message: 'Temperature must be atleast 0',
    })
    .max(2, {
      message: 'Temperature must be at most 2',
    }),
  content: z
    .string()
    .min(50, {
      message: 'Content must be atleast 50 characters',
    })
    .max(500, {
      message: 'Content must not exceed 500 characters limit',
    }),
  type: z.enum(['Personal', 'Brand'], {
    errorMap: () => ({ message: 'Type is required' }),
  }),
  tone: z.enum(
    [
      'Professional',
      'Casual',
      'Sarcastic',
      'Funny',
      'Passionate',
      'Thoughtful',
    ],
    {
      errorMap: () => ({ message: 'Tone is required' }),
    }
  ),
  emojis: z.boolean(),
});

function UserInput() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      content: '',
      type: 'Personal',
      tone: 'Professional',
      emojis: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='relative flex flex-col items-start gap-8'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid w-full items-start gap-6'
        >
          <fieldset className='grid gap-6 rounded-[8px] p-4 bg-background/10 border backdrop-blur-sm'>
            <legend className='text-sm font-medium'>Settings</legend>

            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='model'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Submit</Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}

export default UserInput;
