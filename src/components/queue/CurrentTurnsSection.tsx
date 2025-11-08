import { TurnCard, TurnStatus } from "./TurnCard";

export interface Turn {
  id: string;
  turnNumber: string;
  area: string;
  status: TurnStatus;
  timestamp?: Date;
}

interface CurrentTurnsSectionProps {
  currentTurns: Turn[];
  nextTurns: Turn[];
  animatingTurnId?: string;
}

export const CurrentTurnsSection = ({
  currentTurns,
  nextTurns,
  animatingTurnId,
}: CurrentTurnsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-bold text-display-panel-foreground mb-3">
            Turnos Actuales
          </h3>
          <div className="space-y-3">
            {currentTurns.map((turn) => (
              <TurnCard
                key={turn.id}
                turnNumber={turn.turnNumber}
                area={turn.area}
                status={turn.status}
                isAnimating={turn.id === animatingTurnId}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-display-panel-foreground mb-3">Próximo</h3>
          <div className="space-y-3">
            {nextTurns.map((turn) => (
              <TurnCard
                key={turn.id}
                turnNumber={turn.turnNumber}
                area={turn.area}
                status="waiting"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
