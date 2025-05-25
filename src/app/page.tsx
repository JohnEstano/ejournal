"use client";

import Image from "next/image";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { DraggableCardContainer, DraggableCardBody } from '@/components/ui/DragCards';
import React from "react";
import { Inter, Playfair_Display } from 'next/font/google';
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import { Separator } from "@/components/ui/separator";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import { House, Ampersand, Signature, Sun } from 'lucide-react';
import { Dock, DockIcon } from "@/components/magicui/dock";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { TextAnimate } from "@/components/magicui/text-animate";
import { DockNav } from "@/components/dock-nav";
import { AuroraBackground } from "@/components/ui/aurora-background";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HTMLFlipBook from 'react-pageflip';
import { ConfettiButton } from "@/components/magicui/confetti";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'], variable: '--font-playfair', display: 'swap' });

export default function Home() {
  return (

    <div
      className={cn(
        "relative min-h-screen overflow-hidden px-4 sm:px-6 md:px-20 pb-[88px]",
        inter.variable,
        playfair.variable,
        "font-sans"
      )}
    >

      <main className="mx-auto  font-serif max-w-3xl flex flex-col items-center mt-30 gap-8">


        <div className="text-center">


          <ConfettiButton />

          <h1
            className={cn(
              "scroll-m-20 font-serif  tracking-tight",
              "text-2xl sm:text-4xl lg:text-5xl mt-4"
            )}
          >
            Hey, I am <span className="text-slate-700 dark:text-emerald-600">John Estaño.</span>
            <br></br>Welcome to my <span className="text-slate-700 dark:text-emerald-600">E-journal.</span>
          </h1>
          <TextAnimate
            animation="blurIn"
            as="h5"
            className="mt-10 text-base sm:text-base">
            "The best way to predict the future is to invent it." - Alan Kay
          </TextAnimate>


          <div className="mt-4 text-justify leading-relaxed pt-4">
            <p className="text-slate-700 dark:text-zinc-100">This page is part of the partial fulfillment of the requirements for the course <span className="text-zinc-950 italic dark:text-zinc-100"> Seminars, Workshops, & Tours. </span>
              The course offers students hands on learning through seminars, interactive workshops, and educational tours, providing us students with real-world experiences and industry exposure.
              Here, I gathered all my insights and reflections I gained from attending each activity.
            </p>


          </div>




          <Separator className="mt-5 max-w-[500px] mx-auto " />

          <div>



          </div>



        


          <div className="mt-4 text-justify leading-relaxed pt-4">
            <Link href="/gallery" className="mt-4 block text-center hover:underline">
              See more
            </Link>
            <p className="text-slate-700 dark:text-zinc-100">This page is part of the partial fulfillment of the requirements for the course Seminars, Workshops, & Tours.
              The course offers students hands on learning through seminars, interactive workshops, and educational tours, providing us students with real-world insights and industry exposure.
              Here, I gathered all my insights and reflections I gained from attending each activity.
            </p>
          </div>
        </div>



      </main>


      <div className="fixed bottom-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm py-4">
        <DockNav />
      </div>
    </div>

  );
}
