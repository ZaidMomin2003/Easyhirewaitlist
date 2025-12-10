"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { collection, serverTimestamp } from 'firebase/firestore';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WaitlistFormSchema } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";

type WaitlistFormValues = z.infer<typeof WaitlistFormSchema>;

export function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

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
      try {
        const waitlistCollection = collection(firestore, 'waitlist_entries');
        await addDocumentNonBlocking(waitlistCollection, {
          ...values,
          submissionTimestamp: serverTimestamp(),
        });
        setIsSuccess(true);
      } catch (error) {
        console.error("Error adding to waitlist: ", error);
        toast({
          title: "An error occurred",
          description: "Could not join the waitlist. Please try again later.",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4">
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
          <Button type="submit" className="h-12 w-full md:w-auto text-base px-8" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Get Notified"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
