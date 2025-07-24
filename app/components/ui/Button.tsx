import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-bold text-base transition focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = "Button"
export default Button 