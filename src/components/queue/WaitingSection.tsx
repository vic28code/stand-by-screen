import { TurnCard } from "./TurnCard";
import { Turn } from "./CurrentTurnsSection";

interface WaitingSectionProps {
  waitingTurns: Turn[];
}

export const WaitingSection = ({ waitingTurns }: WaitingSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-display-panel-foreground mb-3">En espera</h3>
      <div className="grid grid-cols-4 gap-3">
        {waitingTurns.map((turn) => (
          <TurnCard
            key={turn.id}
            turnNumber={turn.turnNumber}
            area=""
            status={turn.status}
            size="compact"
            showArrow={false}
          />
        ))}
      </div>
    </div>
  );
};
