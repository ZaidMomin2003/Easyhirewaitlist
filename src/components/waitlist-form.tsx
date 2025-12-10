"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
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
      email: "",
      business: "",
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
      <div className="flex flex-col items-center text-center p-8 animate-in fade-in-0 zoom-in-95 duration-500 w-full max-w-lg">
        <CheckCircle className="w-24 h-24 text-primary mb-6" />
        <h2 className="text-3xl font-bold mb-2 font-headline">You're on the list!</h2>
        <p className="text-muted-foreground">
          Thank you for joining the Pilot waitlist. We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-lg space-y-4">
        <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Your Name" 
                      {...field} 
                      disabled={isPending} 
                      className="bg-secondary/50 border-white/20 h-12 text-base"
                    />
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
                  <FormControl>
                    <Input 
                      placeholder="Business Name" 
                      {...field} 
                      disabled={isPending} 
                      className="bg-secondary/50 border-white/20 h-12 text-base"
                    />
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
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      {...field} 
                      disabled={isPending} 
                      className="bg-secondary/50 border-white/20 h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" className="h-14 w-full text-lg px-8" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Get Notified"}
        </Button>
      </form>
    </Form>
  );
}
