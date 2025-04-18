import { cn } from "@/lib/utils"; // Assuming you have a utility for classNames

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent",
        className
      )}
    />
  );
};

export default Spinner;