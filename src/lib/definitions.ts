import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  business: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});
