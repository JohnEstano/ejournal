import Image from "next/image";
import { CalendarIcon, HomeIcon, MailIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { House, Ampersand, Signature, Sun, Settings, Search } from 'lucide-react';
import { Dock, DockIcon } from "@/components/magicui/dock";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { TextAnimate } from "@/components/magicui/text-animate";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">


        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          )}
          width={50}
          height={50}
          squares={[80, 80]}
          squaresClassName="hover:fill-green-500"
        />
        <div className="z-100">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to my E-journal.
          </h1>
        </div>
        <TextAnimate animation="blurIn" as="h1" className="text-xl text-bold">
          LOBOT
        </TextAnimate>

        <div className="relative">


          <Dock direction="middle">
          
            <DockIcon>
              <House className="size-6" />
            </DockIcon>

            <DockIcon>
              <Ampersand className="size-6" />
            </DockIcon>


            <DockIcon>
              <Signature className="size-6" />
            </DockIcon>
            <Separator orientation="vertical" />
            <DockIcon>
              <Sun className="size-6" />
            </DockIcon>
          </Dock>

        </div>



      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
