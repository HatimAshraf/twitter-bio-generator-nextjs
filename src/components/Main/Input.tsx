'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import MetaIcon from '../icons/MetaIcon';
import MistralIcon from '../icons/Mistral';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Info } from 'lucide-react';
import { Switch } from '../ui/switch';

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
      model: 'llama-3.1-8b-instant',
      temperature: 1,
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue
                              placeholder='Select a model'
                              defaultValue={field.value}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='llama-3.1-8b-instant'>
                            <div className='flex items-start gap-3 text-muted-foreground'>
                              <MetaIcon className='size-5' />
                              <div>
                                <p>
                                  <span className='text-foreground font-medium mr-2'>
                                    LLaMA 3
                                  </span>
                                  8b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value='mixtral-8x7b-32768'>
                            <div className='flex items-start gap-3 text-muted-foreground'>
                              <MistralIcon className='size-5' />
                              <div>
                                <p>
                                  <span className='text-foreground font-medium mr-2'>
                                    Mixtral
                                  </span>
                                  8x7b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value='llama-3.3-70b-versatile'>
                            <div className='flex items-start gap-3 text-muted-foreground'>
                              <MetaIcon className='size-5' />
                              <div>
                                <p>
                                  <span className='text-foreground font-medium mr-2'>
                                    LLaMA3
                                  </span>
                                  70b
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='temperature'
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel className='flex items-center justify-between pb-2'>
                      <span className='flex items-center justify-center'>
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className='ml-1 w-4 h-4 cursor-pointer' />
                          </TooltipTrigger>
                          <TooltipContent
                            side='right'
                            sideOffset={15}
                            className='max-w-xs z-10 bg-popover text-popover-foreground rounded-md shadow-md border p-2 leading-6'
                          >
                            <p>
                              A higher setting generates more imaginative and
                              unexpected bios, while a lower setting leans
                              toward familiar and traditional tones.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span>{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => {
                          onChange(val);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className='grid gap-2 rounded-[8px] p-4 bg-background/10 border backdrop-blur-sm'>
            <legend className='text-sm font-medium -ml-1 px-1'>
              User Input
            </legend>
            <div className='grid gap-3'>
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center justify-between pb-2'>
                      About Yourself
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder='Write a short bio about yourself...'
                        {...field}
                        className='w-full h-32 p-2 rounded-md border border-input bg-transparent resize-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 py-3 gap-3'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center justify-between pb-2'>
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a type' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Personal'>Personal</SelectItem>
                        <SelectItem value='Brand'>Brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center justify-between pb-2'>
                      Tone
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select a tone' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Professional'>
                          Professional
                        </SelectItem>
                        <SelectItem value='Casual'>Casual</SelectItem>
                        <SelectItem value='Sarcastic'>Sarcastic</SelectItem>
                        <SelectItem value='Funny'>Funny</SelectItem>
                        <SelectItem value='Passionate'>Passionate</SelectItem>
                        <SelectItem value='Thoughtful'>Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='emojis'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center my-2 mx-2'>
                      Add Emojis
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <Button type='submit' className='rounded h-12'>
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UserInput;
