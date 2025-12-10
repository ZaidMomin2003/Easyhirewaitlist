import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  name: z.string().optional(),
  business: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
});
