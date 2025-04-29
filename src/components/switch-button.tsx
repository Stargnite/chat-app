import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"


interface SwitchButtonProps {
  defaultChecked?: boolean
  onToggle?: (isChecked: boolean) => void
  label?: string
  id?: string
}

export function SwitchButton({ defaultChecked, onToggle, label, id = "switch" }: SwitchButtonProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleToggle = () => {
    const newState = !isChecked
    setIsChecked(newState)
    onToggle?.(newState)
  }

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <button
        role="switch"
        aria-checked={isChecked}
        id={id}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "bg-gray-200",
          "focus-visible:ring-gray-400 focus-visible:ring-offset-white",
        )}
      >
        {/* <span className="sr-only">Toggle switch</span> */}
        <motion.span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-colors",
            isChecked ? "bg-green-500" : "bg-white",
          )}
          animate={{
            x: isChecked ? "100%" : "0%",
           
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  )
}

