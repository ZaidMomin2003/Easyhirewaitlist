import { z } from 'zod';

export const WaitlistFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter your name." }),
  business: z.string().min(1, { message: "Please enter your business name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const AdminLoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine(data => {
  if (data.email.toLowerCase() === 'admin@example.com') {
    return data.password === 'Zaisha@226194';
  }
  return true;
}, {
  message: "Invalid credentials.",
  path: ["password"],
});
