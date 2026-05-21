import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Globe, Menu, X, Link as LinkIcon, LogOut, Code2, PackageOpen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { user, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  const links = [
    { href: "/dashboard", label: "nav.dashboard" },
    { href: "/markets", label: "nav.markets" },
    { href: "/packages", label: "Packages" },
    { href: "/portfolio", label: "nav.portfolio" },
    { href: "/calculator", label: "nav.calculator" },
    { href: "/support", label: "nav.support" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/30 transition-colors">
            <LinkIcon className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">TrustChain<span className="text-primary">FX</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}>
              {t(link.label)}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                <span>{currentLang.flag}</span>
                <span className="text-xs uppercase font-medium">{currentLang.code}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover/90 backdrop-blur-md">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)} className="flex items-center justify-between cursor-pointer">
                  <span>{l.name}</span>
                  <span>{l.flag}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-popover/90 backdrop-blur-md">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <Link href="/packages">
                  <DropdownMenuItem className="cursor-pointer" data-testid="menu-packages">
                    <PackageOpen className="mr-2 h-4 w-4 text-yellow-400" />
                    <span>Investment Packages</span>
                    <Badge className="ml-auto bg-yellow-400/10 text-yellow-400 border-yellow-400/20 text-[10px] px-1.5">New</Badge>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="px-2 py-1.5">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">Developer</p>
                  <Link href="/developer">
                    <DropdownMenuItem className="cursor-pointer rounded-lg" data-testid="menu-developer">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-7 h-7 rounded-md bg-accent/20 flex items-center justify-center text-accent shrink-0">
                          <Code2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Andrea Donato</div>
                          <div className="text-[10px] text-muted-foreground">Platform Developer</div>
                        </div>
                        <Globe className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    </DropdownMenuItem>
                  </Link>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-400 cursor-pointer" data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`text-sm font-medium transition-colors p-2 rounded-md ${location === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5"}`}>
                  {t(link.label)}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="grid grid-cols-4 gap-2">
                {LANGUAGES.map((l) => (
                  <Button key={l.code} variant="ghost" size="sm" onClick={() => { setLang(l.code); setMobileOpen(false); }} className={`flex flex-col items-center gap-1 h-auto py-2 ${lang === l.code ? 'bg-primary/20 text-primary' : ''}`}>
                    <span className="text-xl">{l.flag}</span>
                    <span className="text-[10px] uppercase">{l.code}</span>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
