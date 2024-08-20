import React from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function SubmitButton({
  isLoading,
  className,
  children,
}: ButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex flex-row justify-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
