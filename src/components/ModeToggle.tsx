"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="
            relative
            border-2 border-indigo-200 dark:border-indigo-800
            bg-white dark:bg-black
            text-indigo-900 dark:text-indigo-200
            hover:bg-indigo-50 dark:hover:bg-indigo-900/30
            hover:border-indigo-300 dark:hover:border-indigo-700
            focus-visible:ring-2 focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-600
            transition-all duration-200
            shadow-sm hover:shadow-md
          "
        >
          <Sun className="
            h-[1.2rem] w-[1.2rem] 
            scale-100 rotate-0 
            transition-all duration-300
            dark:scale-0 dark:-rotate-90
            text-indigo-600
          " />
          <Moon className="
            absolute h-[1.2rem] w-[1.2rem] 
            scale-0 rotate-90 
            transition-all duration-300
            dark:scale-100 dark:rotate-0
            text-white
          " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="
          border-2 border-indigo-200 dark:border-indigo-800
          bg-white dark:bg-gray-800
          shadow-lg
          min-w-[140px]
        "
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="
            text-indigo-900 dark:text-indigo-200
            hover:bg-indigo-50 dark:hover:bg-indigo-900/30
            focus:bg-indigo-100 dark:focus:bg-indigo-900/40
            focus:text-indigo-900 dark:focus:text-white
            cursor-pointer
            transition-colors duration-150
          "
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="
            text-indigo-900 dark:text-indigo-200
            hover:bg-indigo-50 dark:hover:bg-indigo-900/30
            focus:bg-indigo-100 dark:focus:bg-indigo-900/40
            focus:text-indigo-900 dark:focus:text-white
            cursor-pointer
            transition-colors duration-150
          "
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="
            text-indigo-900 dark:text-indigo-200
            hover:bg-indigo-50 dark:hover:bg-indigo-900/30
            focus:bg-indigo-100 dark:focus:bg-indigo-900/40
            focus:text-indigo-900 dark:focus:text-white
            cursor-pointer
            transition-colors duration-150
          "
        >
          <svg 
            className="mr-2 h-4 w-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}