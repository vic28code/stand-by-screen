interface AdvertisingAreaProps {
  content?: React.ReactNode;
}

export const AdvertisingArea = ({ content }: AdvertisingAreaProps) => {
  return (
    <div className="h-full bg-display-ad rounded-lg flex items-center justify-center">
      {content || (
        <div className="text-center">
          <div className="text-6xl font-bold text-muted-foreground/20 mb-4">PUBLICIDAD</div>
          <p className="text-muted-foreground">
            Espacio destinado para contenido publicitario o informativo
          </p>
        </div>
      )}
    </div>
  );
};
