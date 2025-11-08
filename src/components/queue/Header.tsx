import { useEffect, useState } from "react";

interface HeaderProps {
  companyName?: string;
  logoUrl?: string;
}

export const Header = ({ companyName = "Nombre de la empresa", logoUrl }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="bg-display-header text-display-header-foreground px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
        ) : (
          <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
            LOGO
          </div>
        )}
        <h1 className="text-xl font-semibold">{companyName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-display-header-foreground/10 px-4 py-2 rounded">
          <span className="font-medium">{formatDate(currentTime)}</span>
        </div>
        <div className="bg-display-header-foreground/10 px-4 py-2 rounded">
          <span className="font-medium">{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};
