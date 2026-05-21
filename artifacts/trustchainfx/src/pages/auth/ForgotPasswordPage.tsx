import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link as LinkIcon, MailCheck, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <LinkIcon className="h-6 w-6" />
            </div>
            <span>TrustChain<span className="text-primary">FX</span></span>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
                <CardDescription className="text-center">Enter your email and we'll send you reset instructions</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="investor@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50 border-white/10 focus-visible:ring-primary/50" 
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Send Reset Link
                  </Button>
                  <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </CardFooter>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 px-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-2">
                <MailCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Check your inbox!</h3>
              <p className="text-muted-foreground text-sm">
                We've sent instructions to reset your password to <span className="text-foreground font-medium">{email}</span>
              </p>
              <div className="pt-6">
                <Link href="/login">
                  <Button variant="outline" className="border-white/10">Return to Login</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
