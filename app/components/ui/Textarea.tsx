import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`block w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
export default Textarea;
