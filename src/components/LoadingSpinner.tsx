import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
} as const;

function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return <Spinner className={cn(sizeClasses[size], className)} />;
}

export default LoadingSpinner;
