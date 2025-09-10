"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "../ui/button";
import { isValidElement, useEffect, useState } from "react";
import { cn } from "@/utils";

interface CopyButtonProps {
  clipboard: React.ReactNode;
}

export const CopyButton = ({ clipboard }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    let textToCopy = "";

    if (isValidElement(clipboard)) {
      textToCopy = (clipboard.props as { children: string }).children;
    } else if (typeof clipboard === "string") {
      textToCopy = clipboard;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCopied) {
      timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <Button
      onClick={handleCopy}
      variant={"ghost"}
      className={cn(
        "text-foreground absolute top-4 right-4 h-auto !p-0",
        !isCopied ? "cursor-copy" : "cursor-pointer",
      )}
      disabled={isCopied}
    >
      {isCopied ? <Check /> : <Copy />}
    </Button>
  );
};
