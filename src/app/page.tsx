
import { WaitlistForm } from "@/components/waitlist-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Bot, BrainCircuit, FileText, BarChart3, Users, Zap, ScanText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "Human-like AI Interviews",
    description: "Engage candidates with conversational AI that goes beyond resumes to assess skills and cultural fit."
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Customizable Skill Tests",
    description: "Tailor assessments for any role, from coding challenges to written tests, to find the perfect match."
  },
  {
    icon: <ScanText className="w-8 h-8 text-primary" />,
    title: "Holistic Candidate Evaluation",
    description: "Go beyond the resume. Our AI analyzes LinkedIn profiles, portfolios, and other materials for a truly comprehensive view."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "For All Roles",
    description: "Flexible enough for technical positions, yet perfect for sales, marketing, and other non-technical roles."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "In-Depth Analytics",
    description: "Receive comprehensive reports with scores, transcripts, and AI analysis to make data-driven decisions."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Automated Hiring Funnel",
    description: "Automate the entire top-of-funnel process to save time and ensure you never miss a great candidate."
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
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold italic">Easyhire</span>
            <span className="text-sm text-muted-foreground font-serif italic">waitlist</span>
          </div>
        </header>
        
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline tracking-tight">The Smartest Way to Hire. Finally.</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Easyhire is an AI platform for B2B businesses to create intelligent hiring campaigns. From resume tests to human-like AI interviews, we find you the perfect candidate—10x faster and 100x more cost-effective.
          </p>
        </div>

        <p className="mb-4 text-sm font-semibold tracking-widest text-primary uppercase animate-pulse">
          Launching on 21, December 2025
        </p>
        <div className="my-8">
          <WaitlistForm />
        </div>

        <section className="w-full max-w-5xl my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="bg-secondary/30 backdrop-blur-sm border-white/10 text-left">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div>{feature.icon}</div>
                  <CardTitle className="text-xl font-bold leading-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


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
