import { WaitlistForm } from "@/components/waitlist-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/countdown-timer";

const faqs = [
  {
    question: "How does the AI interview work?",
    answer: "Our AI conducts a real-time, human-like conversation with candidates to assess their skills, experience, and cultural fit. It's designed to be engaging and provide deep insights beyond a traditional screening."
  },
  {
    question: "Can we customize the tests for each campaign?",
    answer: "Absolutely. You have full control to create custom resume tests, coding challenges, or written assessments tailored to the specific role you're hiring for. This ensures you're testing for the skills that matter most."
  },
  {
    question: "Is Easyhire suitable for non-technical roles?",
    answer: "Yes! While we have powerful coding tests, our platform is flexible. You can create campaigns with written tests and in-depth AI interviews perfect for sales, marketing, and other non-technical positions."
  },
  {
    question: "How do we get the results?",
    answer: "After the campaign, you'll receive a comprehensive report for each candidate, including test scores, interview transcripts, and AI-driven analysis. All the data is organized to help you make informed hiring decisions quickly."
  },
  {
    question: "What makes Easyhire different from other hiring tools?",
    answer: "Easyhire automates the entire top-of-funnel hiring process, from resume screening to in-depth interviews, with a powerful and intelligent AI. This saves you hundreds of hours while ensuring you never miss a great candidate."
  }
];

export default function Home() {

  return (
    <div className="bg-background text-foreground font-body">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.5) 0%, transparent 50%)`}} />
      <main className="relative z-10 container mx-auto flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <header className="flex items-center gap-2 mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Bot className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Easyhire</span>
        </header>
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline tracking-tight">The Smartest Way to Hire. Finally.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Easyhire is an AI platform for B2B businesses to create intelligent hiring campaigns. From resume tests to human-like AI interviews, we find you the perfect candidate.
          </p>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground mb-4">Launching in...</h2>
        <CountdownTimer />

        <div className="my-8">
          <WaitlistForm />
        </div>

        <div className="my-12 w-full max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex-grow border-t border-muted-foreground/20"></div>
            <span className="text-muted-foreground text-sm tracking-widest">FROM THE DEVELOPERS OF</span>
            <div className="flex-grow border-t border-muted-foreground/20"></div>
          </div>
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-6">
            <Button variant="link" asChild className="text-2xl font-semibold italic text-muted-foreground">
              <a href="https://wisdomis.fun" target="_blank" rel="noopener noreferrer">wisdomis.fun</a>
            </Button>
            <Button variant="link" asChild className="text-2xl font-semibold italic text-muted-foreground">
              <a href="https://talxify.space" target="_blank" rel="noopener noreferrer">Talxify.space</a>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 font-serif italic">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full text-center md:text-left">
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i+1}`} key={i} className="border-b border-white/10">
                <AccordionTrigger className="text-lg py-6 hover:no-underline text-center md:text-left justify-center md:justify-between">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 text-center md:text-left">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
