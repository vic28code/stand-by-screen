import { Info } from "lucide-react";

interface NotificationBannerProps {
  message?: string;
  type?: "info" | "warning";
}

export const NotificationBanner = ({ message, type = "info" }: NotificationBannerProps) => {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
        type === "warning"
          ? "bg-status-waiting/20 text-display-panel-foreground"
          : "bg-primary/10 text-display-panel-foreground"
      }`}
    >
      <Info className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};
