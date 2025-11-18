import { useEffect, useState, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";

interface Publicidad {
  id: number;
  nombre: string;
  tipo_publicidad: string;
  url_archivo: string;
  duracion: number;
  estado: string;
}

export const AdvertisingArea = () => {
  const [ads, setAds] = useState<Publicidad[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("publicidad")
        .select("*")
        .eq("estado", "activa")
        .order("id", { ascending: true });

      if (error) setErrorMsg(error.message);
      else setAds(data as Publicidad[]);
    };

    fetchAds();
  }, []);

  // Manejar cambio de anuncio + contador descendente
  useEffect(() => {
    if (ads.length === 0) return;
    const duracionActual = ads[current].duracion ?? 10;
    setCounter(duracionActual);

    // Limpiar intervalo previo
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Cambia el anuncio cuando termina
          setCurrent((prevCurrent) => (prevCurrent + 1) % ads.length);
          return ads[(current + 1) % ads.length].duracion ?? 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [ads, current]);

  if (errorMsg) {
    return (
      <div className="h-full bg-display-ad rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500 mb-4">Error: {errorMsg}</div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="h-full bg-display-ad rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-muted-foreground/20 mb-4">PUBLICIDAD</div>
          <p className="text-muted-foreground">
            Espacio destinado para contenido publicitario o informativo
          </p>
        </div>
      </div>
    );
  }

  const ad = ads[current];

  return (
    <div className="h-full bg-display-ad rounded-lg flex flex-col items-center justify-center">
      <div className="font-semibold text-2xl mb-2">{ad.nombre}</div>
      {ad.tipo_publicidad === "imagen" && (
        <img
          src={ad.url_archivo}
          alt={ad.nombre}
          className="max-h-96 mx-auto rounded shadow mb-2"
        />
      )}
      {ad.tipo_publicidad === "video" && (
        <video
          controls
          autoPlay
          loop
          src={ad.url_archivo}
          className="max-h-96 mx-auto rounded shadow mb-2"
        >
          Tu navegador no soporta video.
        </video>
      )}
      <div className="mt-3 text-center">
        <span className="text-primary font-bold text-3xl">{counter}s</span>
        <div className="text-muted-foreground text-base">
          Próximo anuncio en...
        </div>
      </div>
    </div>
  );
};
