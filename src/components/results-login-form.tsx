'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useTransition } from 'react';

import { ResultsLoginFormSchema } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type LoginFormValues = z.infer<typeof ResultsLoginFormSchema>;

interface ResultsLoginFormProps {
  onLoginSuccess: () => void;
}

export function ResultsLoginForm({ onLoginSuccess }: ResultsLoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(ResultsLoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(() => {
      // Hardcoded check
      if (
        values.email === 'arshadbashamomin@gmail.com' &&
        values.password === 'Zaisha@22619'
      ) {
        onLoginSuccess();
      } else {
        toast({
          title: 'Invalid Credentials',
          description: 'The email or password you entered is incorrect.',
          variant: 'destructive',
        });
        form.reset();
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Results Access</CardTitle>
          <CardDescription>Enter the password to view the waitlist results.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} disabled={isPending} />
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
                      <Input type="password" placeholder="••••••••" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'View Results'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
