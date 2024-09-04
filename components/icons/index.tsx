import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      width={251}
      height={103}
      src={"/images/logo.svg"}
      alt="logo"
      className={cn("", className)}
    />
  );
};
