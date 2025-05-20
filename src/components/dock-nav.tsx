"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { House, Ampersand, Signature, Sun, Moon, Images } from 'lucide-react';
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function DockNav({ className }: { className?: string }) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const activeRoute = (path: string) =>
        pathname === path ? "text-primary" : "text-muted-foreground";

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm py-4">
            <Dock className="flex items-center justify-center space-x-4 mx-auto">

                {/* Home */}
                <DockIcon>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/" className={activeRoute("/")}>
                                    <House className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DockIcon>

                {/* About */}
                <DockIcon>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/about" className={activeRoute("/about")}>
                                    <Ampersand className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>About</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DockIcon>

                {/* Blogs */}
                <DockIcon>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/blogs" className={activeRoute("/blogs")}>
                                    <Signature className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Blogs</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DockIcon>

                  <DockIcon>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link href="/gallery" className={activeRoute("/gallery")}>
                                    < Images className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Gallery</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                  
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
                                <p>{mounted ? (theme === "dark" ? "Dark mode" : "Light mode") : "Toggle theme"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </DockIcon>

              
            </Dock>
        </div>
    );
}