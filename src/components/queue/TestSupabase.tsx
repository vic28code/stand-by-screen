// src/components/queue/TestSupabase.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Ajusta el path si te ubicas diferente

type PantallaPublicidad = {
  id: number;
  // Agrega aquí otros campos reales que tenga tu tabla
};

export function TestSupabase() {
  const [rows, setRows] = useState<PantallaPublicidad[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchRows = async () => {
      const { data, error } = await supabase
        .from('pantalla_publicidad')
        .select('*');

      if (error) {
        setErrorMsg(error.message);
      } else {
        setRows(data as PantallaPublicidad[]);
      }
    };

    fetchRows();
  }, []);

  if (errorMsg) {
    return <p>Error: {errorMsg}</p>;
  }

  return (
    <div>
      <h2>Filas de pantalla_publicidad</h2>
      <ul>
        {rows.map(r => (
          <li key={r.id}>{JSON.stringify(r)}</li>
        ))}
      </ul>
    </div>
  );
}
