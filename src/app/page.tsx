import { WaitlistForm } from "@/components/waitlist-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Asterisk } from "lucide-react";

const faqs = [
  {
    question: "I like it but I think it will be too difficult to customize",
    answer: "Our template is designed for easy customization. You can change colors, fonts, and layouts with just a few clicks. We also provide extensive documentation to guide you."
  },
  {
    question: "What platform is the template made for?",
    answer: "The template is built for Next.js and React, using Tailwind CSS for styling. It's a modern and powerful stack for building web applications."
  },
  {
    question: "Is it optimized for speed and performance?",
    answer: "Yes, performance is a top priority. We use modern web development practices to ensure your site is fast, responsive, and optimized for search engines."
  },
  {
    question: "If I get stuck when customizing can I get help from you?",
    answer: "Absolutely! We offer dedicated support to all our customers. If you have any questions or run into any issues, just reach out and we'll be happy to help."
  },
  {
    question: "Where will my site be hosted?",
    answer: "You can host your site on any platform that supports Next.js applications, such as Vercel, Netlify, or Firebase Hosting for a seamless deployment experience."
  }
];

export default function Home() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--primary) / 0.5) 0%, transparent 50%)`}} />
      <main className="relative z-10 container mx-auto flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <header className="flex items-center gap-2 mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <Asterisk className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">Pilot</span>
        </header>
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline tracking-tight">Join The Pilot Template Waitlist Today.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Use the Pilot template to pre-sell or gather email subscribers for your product or service, for free.
          </p>
        </div>

        <WaitlistForm />

        <div className="my-12 w-full max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex-grow border-t border-muted-foreground/20"></div>
            <span className="text-muted-foreground text-sm tracking-widest">TRUSTED BY COMPANIES LIKE</span>
            <div className="flex-grow border-t border-muted-foreground/20"></div>
          </div>
          <div className="flex justify-center items-center gap-8 md:gap-16 mt-6 text-muted-foreground">
              <p className="text-2xl font-semibold italic">LOQO</p>
              <p className="text-2xl font-semibold italic">IPSUM</p>
              <p className="text-2xl font-semibold italic">LOREM</p>
          </div>
        </div>

        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-3xl font-bold mb-8 font-serif italic">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full text-left">
            {faqs.map((faq, i) => (
              <AccordionItem value={`item-${i+1}`} key={i} className="border-b border-white/10">
                <AccordionTrigger className="text-lg py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <footer className="relative z-10 container mx-auto text-muted-foreground py-6 flex justify-between text-sm w-full max-w-6xl">
        <p>Use this template for free</p>
        <p>Designed by Wize</p>
      </footer>
    </div>
  );
}
