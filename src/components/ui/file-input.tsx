import * as React from "react";
import { cn } from "@/lib/utils";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileSelect: (file: File) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, className, onFileSelect, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        onFileSelect(e.target.files[0]);
      }
    };

    return (
      <div className={cn("flex flex-col space-y-2", className)}>
        <label className="font-semibold">{label}</label>
        <div
          onClick={handleClick}
          className={cn(
            "cursor-pointer border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none hover:bg-muted/10 focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          )}
        >
          Selecionar arquivo
        </div>
        <input
          {...props}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
