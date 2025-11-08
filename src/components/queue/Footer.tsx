interface FooterProps {
  schedule?: string;
}

export const Footer = ({
  schedule = "Horarios de atención de Lunes a Viernes de 10 a 18 hs y Sábados de 13 a 16 hs",
}: FooterProps) => {
  return (
    <footer className="bg-display-footer text-display-footer-foreground px-6 py-4 text-center">
      <p className="font-semibold text-lg">{schedule}</p>
    </footer>
  );
};
