import React from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 ${className}`}
      {...props}
    />
  )
)
Input.displayName = "Input"
export default Input 