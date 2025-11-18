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
    called: "bg-[#52D017] text-white border border-[#52D017]", // Verde
    waiting: "bg-[#FFD35C] text-gray-900 border border-[#FFD35C]", // Amarillo suave
    absent: "bg-[#FF4242] text-white border border-[#FF4242]",     // Rojo suave
  };

  const standardBox = cn(
    "flex items-center gap-3 px-4 py-3 rounded-lg border font-semibold min-w-[220px] min-h-[56px] shadow transition-all",
    statusStyles[status],
    isAnimating && "animate-pulse-call"
  );

  if (size === "compact") {
    return (
      <div className={cn(
        "px-4 py-2 rounded font-bold text-xs min-w-[64px] min-h-[32px] flex items-center justify-center border transition-all",
        statusStyles[status],
        isAnimating && "animate-pulse-call"
      )}>
        {turnNumber}
      </div>
    );
  }

  return (
    <div className={standardBox}>
      <div className="text-base font-bold">{turnNumber}</div>
      {showArrow && <ArrowRight className="h-4 w-4 mx-2 text-white" />}
      <div className="flex flex-col min-w-[90px]">
        <span className="text-xs opacity-80 font-medium">Diríjase a:</span>
        <span className="font-semibold text-xs">{area}</span>
      </div>
    </div>
  );
};
