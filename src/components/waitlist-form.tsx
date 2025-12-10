"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WaitlistFormSchema } from "@/lib/definitions";
import { addToWaitlist } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;

export function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(WaitlistFormSchema),
    defaultValues: {
      name: "",
      business: "",
      email: "",
    },
  });

  const onSubmit = (values: WaitlistFormValues) => {
    startTransition(async () => {
      const result = await addToWaitlist(values);
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast({
          title: "An error occurred",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center p-8 animate-in fade-in-0 zoom-in-95 duration-500 w-full max-w-md">
        <CheckCircle className="w-24 h-24 text-accent mb-6" />
        <h2 className="text-3xl font-bold mb-2 font-headline">You're on the list!</h2>
        <p className="text-muted-foreground">
          Thank you for joining the Charon waitlist. We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/70 backdrop-blur-sm border-primary/20 animate-in fade-in-0 zoom-in-95 duration-500">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl font-bold font-headline">Join the Waitlist</CardTitle>
        <CardDescription className="text-muted-foreground pt-2">
          Be the first to experience the future. Sign up now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={isPending} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} disabled={isPending} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} disabled={isPending} className="bg-background/80" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button type="submit" className="w-full text-lg py-6" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Get Early Access"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
