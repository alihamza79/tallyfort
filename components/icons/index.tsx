import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
    src={"/images/logo.svg"}
    alt="logo"
    className={cn("max-w-full h-auto", className)}
  />
  );
};
