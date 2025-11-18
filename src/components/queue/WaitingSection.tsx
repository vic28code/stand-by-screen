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

export const WaitingSection = () => {
  const [waitingTurns, setWaitingTurns] = useState<Turn[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaitingTurns = async () => {
      const { data, error } = await supabase
        .from("turnos")
        .select(`
          id, numero, estado, fecha_llamado, fecha_atencion, fecha_finalizacion,
          categoria_id, categorias(id, nombre)
        `)
        .order("fecha_llamado", { ascending: false });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      function statusMapper(estado: string): TurnStatus {
        if (estado === "en_atencion" || estado === "llamado") return "called";
        if (estado === "ausente") return "absent";
        return "waiting";
      }

      const waitingFull = (data as any[])
        .filter(
          (row) =>
            statusMapper(row.estado) === "waiting" &&
            !row.fecha_finalizacion
        )
        .map((row) => ({
          id: String(row.id),
          turnNumber: row.numero,
          categoria: row.categorias?.nombre ?? "Sin área",
          status: "waiting" as TurnStatus,
          timestamp: row.fecha_llamado ? new Date(row.fecha_llamado) : undefined,
        }));

      setWaitingTurns(waitingFull.slice(3));
    };

    fetchWaitingTurns();
  }, []);

  if (errorMsg) {
    return <div className="text-red-600 text-center py-4">{errorMsg}</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-display-panel-foreground mb-3">
        En espera
      </h3>
      {waitingTurns.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground text-base font-semibold">
          No hay turnos en este proceso
        </div>
      ) : (
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
      )}
    </div>
  );
};
