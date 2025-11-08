import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type TurnStatus = "called" | "waiting" | "absent";

interface TurnCardProps {
  turnNumber: string;
  area: string;
  status: TurnStatus;
  isAnimating?: boolean;
  size?: "normal" | "compact";
  showArrow?: boolean;
}

export const TurnCard = ({
  turnNumber,
  area,
  status,
  isAnimating = false,
  size = "normal",
  showArrow = true,
}: TurnCardProps) => {
  const statusStyles = {
    called: "bg-status-called text-status-called-foreground",
    waiting: "bg-status-waiting text-status-waiting-foreground",
    absent: "bg-status-absent text-status-absent-foreground",
  };

  if (size === "compact") {
    return (
      <div
        className={cn(
          "px-4 py-2 rounded font-bold text-sm transition-all",
          statusStyles[status],
          isAnimating && "animate-pulse-call"
        )}
      >
        {turnNumber}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg transition-all",
        statusStyles[status],
        isAnimating && "animate-pulse-call"
      )}
    >
      <div className="text-2xl font-bold">{turnNumber}</div>
      {showArrow && <ArrowRight className="h-5 w-5" />}
      <div className="flex flex-col">
        <span className="text-xs opacity-80">Diríjase a:</span>
        <span className="font-semibold">{area}</span>
      </div>
    </div>
  );
};
