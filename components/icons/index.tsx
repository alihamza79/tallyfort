import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <img
    width={300}  // Increase the width
    height={120} // Increase the height
    src={"/images/logo.svg"}
    alt="logo"
    className={cn("", className)}
  />
  );
};
