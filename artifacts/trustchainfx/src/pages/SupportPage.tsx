import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FAQS = [
  {
    q: "How secure is TrustChainFX?",
    a: "We employ institutional-grade security including multi-signature cold storage wallets, AES-256 encryption for all data, and continuous third-party security audits. 98% of all digital assets are held offline."
  },
  {
    q: "How are the fixed returns generated?",
    a: "Returns are generated through our proprietary algorithmic trading engine which exploits micro-inefficiencies, arbitrage opportunities, and delta-neutral yield farming strategies across global exchanges."
  },
  {
    q: "What is the minimum investment amount?",
    a: "The minimum investment amount to access our automated trading pools is $100 USD (or equivalent in crypto). Higher tiers with reduced fees start at $10,000."
  },
  {
    q: "Are there any fees or withdrawal limits?",
    a: "We charge zero performance fees. There is a standard network fee for withdrawals. You can withdraw your principal and profits at any time with no lock-up periods."
  },
  {
    q: "Do I need to undergo KYC verification?",
    a: "Yes. As a regulated financial entity, we require all users to complete a brief KYC (Know Your Customer) verification process before depositing funds or trading."
  }
];

export default function SupportPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent", description: "Our support team will get back to you within 24 hours." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
      className="container mx-auto px-4 py-12 space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-muted-foreground text-lg">Our dedicated team of financial experts and technical support staff are available 24/7.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-white/10 text-center p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Live Chat</h3>
          <p className="text-muted-foreground text-sm mb-4">Instant support via the widget in the bottom right corner.</p>
          <p className="font-medium text-primary mt-auto">24/7 Available</p>
        </Card>
        <Card className="bg-card border-white/10 text-center p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">Email Support</h3>
          <p className="text-muted-foreground text-sm mb-4">Detailed technical or account assistance.</p>
          <p className="font-medium text-foreground mt-auto">support@trustchainfx.com</p>
        </Card>
        <Card className="bg-card border-white/10 text-center p-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg mb-2">VIP Concierge</h3>
          <p className="text-muted-foreground text-sm mb-4">Direct phone line for premium tier clients.</p>
          <p className="font-medium text-muted-foreground mt-auto">Available for Tier 2+</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 pt-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <Card className="bg-card border-white/10">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll reply to your email.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required className="bg-background/50 border-white/10" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="bg-background/50 border-white/10" placeholder="investor@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required className="bg-background/50 border-white/10 min-h-[120px]" placeholder="How can we assist you?" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}