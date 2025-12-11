import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name." }),
  business: z.string().min(1, { message: "Please enter your business name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const ResultsLoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});
