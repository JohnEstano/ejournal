"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { House, Ampersand, Signature, Images, Sun, Moon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive: boolean;
}

function NavItem({ href, label, icon: Icon, isActive }: NavItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(isActive ? "text-primary" : "text-muted-foreground")}
          >
            <Link href={href}>
              <Icon className="h-6 w-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DockNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm py-4",
        className
      )}
    >
      <Dock className="flex items-center justify-center space-x-4 mx-auto">
        <DockIcon>
          <NavItem
            href="/"
            label="Home"
            icon={House}
            isActive={pathname === "/"}
          />
        </DockIcon>
        <DockIcon>
          <NavItem
            href="/about"
            label="About"
            icon={Ampersand}
            isActive={pathname === "/about"}
          />
        </DockIcon>
        <DockIcon>
          <NavItem
            href="/blogs"
            label="Blogs"
            icon={Signature}
            isActive={pathname === "/blogs"}
          />
        </DockIcon>
        <DockIcon>
          <NavItem
            href="/gallery"
            label="Gallery"
            icon={Images}
            isActive={pathname === "/gallery"}
          />
        </DockIcon>

        <Separator orientation="vertical" className="h-8 mx-2" />

        <DockIcon>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative h-9 w-9"
                >
                  {mounted && (
                    <motion.div
                      key={theme}
                      initial={{ rotate: 40, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      {theme === "dark" ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                      ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                      )}
                    </motion.div>
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {mounted
                    ? theme === "dark"
                      ? "Dark mode"
                      : "Light mode"
                    : "Toggle theme"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DockIcon>
      </Dock>
    </div>
  );
}
