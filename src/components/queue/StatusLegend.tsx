export const StatusLegend = () => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-status-called"></div>
        <span className="text-sm font-medium text-display-panel-foreground">Llamado</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-status-waiting"></div>
        <span className="text-sm font-medium text-display-panel-foreground">En espera</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-status-absent"></div>
        <span className="text-sm font-medium text-display-panel-foreground">Ausente</span>
      </div>
    </div>
  );
};
