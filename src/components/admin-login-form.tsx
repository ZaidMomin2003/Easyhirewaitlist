'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLoginFormSchema } from '@/lib/definitions';
import { useAuth } from '@/firebase';
import { useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';

type LoginFormValues = z.infer<typeof AdminLoginFormSchema>;

export function AdminLoginForm() {
  const auth = useAuth();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(AdminLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (error: any) {
        // If the admin user doesn't exist, create it.
        if (error.code === 'auth/user-not-found' && values.email === 'admin@example.com') {
          try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
          } catch (creationError: any) {
            toast({
              title: 'Admin Creation Failed',
              description: creationError.message,
              variant: 'destructive',
            });
          }
        } else if (error.code === 'auth/invalid-credential') {
            // This can happen if the user doesn't exist. Let's try creating it for the admin.
             if (values.email === 'admin@example.com') {
                try {
                    await createUserWithEmailAndPassword(auth, values.email, values.password);
                } catch (creationError: any) {
                    toast({
                        title: 'Admin Creation Failed',
                        description: creationError.message,
                        variant: 'destructive',
                    });
                }
             } else {
                toast({
                    title: 'Login Failed',
                    description: 'Invalid credentials. Please try again.',
                    variant: 'destructive',
                });
             }
        }
        
        else {
          toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="admin@example.com" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
