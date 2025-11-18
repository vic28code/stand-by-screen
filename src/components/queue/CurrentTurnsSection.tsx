import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { TurnCard, TurnStatus } from "./TurnCard";

export interface Turn {
  id: string;
  turnNumber: string;
  categoria: string;
  status: TurnStatus;
  timestamp?: Date;
}

interface CurrentTurnsSectionProps {
  animatingTurnId?: string;
}

export const CurrentTurnsSection = ({ animatingTurnId }: CurrentTurnsSectionProps) => {
  const [currentTurns, setCurrentTurns] = useState<Turn[]>([]);
  const [nextTurns, setNextTurns] = useState<Turn[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchTurns = async () => {
      const { data, error } = await supabase
        .from("turnos")
        .select(`
          id,
          numero,
          estado,
          fecha_llamado,
          fecha_atencion,
          fecha_finalizacion,
          categoria_id,
          categorias(id, nombre)
        `)
        .order("fecha_llamado", { ascending: false });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      /*
        Estados:
        - en_atencion: activo/actual
        - pendiente/esperando: próximo
        - atendido: NO mostrar
        - ausente: mostrar solo si lo necesitas en "absent"
        Si fecha_finalizacion NO es null, el turno YA fue finalizado.
      */

      // Turnos actuales (solo los que están en atención SIN fecha_finalizacion)
      const current = (data as any[])
        .filter(
          (row) =>
            (row.estado === "en_atencion" || row.estado === "llamado") &&
            !row.fecha_finalizacion
        )
        .map((row) => ({
          id: String(row.id),
          turnNumber: row.numero,
          categoria: row.categorias?.nombre ?? "Sin área",
          status: "called" as TurnStatus,
          timestamp: row.fecha_llamado ? new Date(row.fecha_llamado) : undefined,
        }));

      // Turnos próximos (solo los pendientes SIN fecha_finalizacion, todavía no llamados)
      const next = (data as any[])
        .filter(
          (row) =>
            (row.estado === "pendiente" || row.estado === "esperando") &&
            !row.fecha_finalizacion
        )
        .map((row) => ({
          id: String(row.id),
          turnNumber: row.numero,
          categoria: row.categorias?.nombre ?? "Sin área",
          status: "waiting" as TurnStatus,
          timestamp: row.fecha_llamado ? new Date(row.fecha_llamado) : undefined,
        }))
        .slice(0, 3);

      setCurrentTurns(current);
      setNextTurns(next);
    };

    fetchTurns();
  }, []);

  if (errorMsg) {
    return <div className="text-red-600 text-center py-4">{errorMsg}</div>;
  }

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
                area={turn.categoria}
                status={turn.status}
                isAnimating={turn.id === animatingTurnId}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-display-panel-foreground mb-3">
            Próximo
          </h3>
          <div className="space-y-3">
            {nextTurns.map((turn) => (
              <TurnCard
                key={turn.id}
                turnNumber={turn.turnNumber}
                area={turn.categoria}
                status="waiting"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
