'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLoginFormSchema } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';

type LoginFormValues = z.infer<typeof AdminLoginFormSchema>;

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Zaisha@226194';

export function AdminLoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(AdminLoginFormSchema),
    defaultValues: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(() => {
      if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials.',
          variant: 'destructive',
        });
        form.setError("password", { type: "manual", message: "Invalid credentials." });
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
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
