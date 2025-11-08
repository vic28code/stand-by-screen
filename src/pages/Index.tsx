import { useState, useEffect } from "react";
import { Header } from "@/components/queue/Header";
import { Footer } from "@/components/queue/Footer";
import { AdvertisingArea } from "@/components/queue/AdvertisingArea";
import { StatusLegend } from "@/components/queue/StatusLegend";
import { CurrentTurnsSection, Turn } from "@/components/queue/CurrentTurnsSection";
import { WaitingSection } from "@/components/queue/WaitingSection";
import { NotificationBanner } from "@/components/queue/NotificationBanner";

// Mock data - Replace with real backend data
const mockCurrentTurns: Turn[] = [
  { id: "1", turnNumber: "M - 045", area: "Área 1", status: "called" },
  { id: "2", turnNumber: "L - 015", area: "Área 2", status: "waiting" },
  { id: "3", turnNumber: "O - 005", area: "Área 3", status: "waiting" },
  { id: "4", turnNumber: "A - 035", area: "Área 4", status: "called" },
];

const mockNextTurns: Turn[] = [
  { id: "5", turnNumber: "M - 046", area: "Área 1", status: "waiting" },
  { id: "6", turnNumber: "L - 016", area: "Área 2", status: "waiting" },
];

const mockWaitingTurns: Turn[] = [
  { id: "7", turnNumber: "L - 047", area: "", status: "waiting" },
  { id: "8", turnNumber: "M - 048", area: "", status: "waiting" },
  { id: "9", turnNumber: "M - 049", area: "", status: "waiting" },
  { id: "10", turnNumber: "M - 050", area: "", status: "waiting" },
  { id: "11", turnNumber: "B - 010", area: "", status: "waiting" },
  { id: "12", turnNumber: "B - 015", area: "", status: "waiting" },
  { id: "13", turnNumber: "A - 056", area: "", status: "waiting" },
  { id: "14", turnNumber: "A - 059", area: "", status: "waiting" },
  { id: "15", turnNumber: "O - 062", area: "", status: "absent" },
  { id: "16", turnNumber: "M - 080", area: "", status: "waiting" },
  { id: "17", turnNumber: "B - 030", area: "", status: "waiting" },
  { id: "18", turnNumber: "B - 051", area: "", status: "absent" },
  { id: "19", turnNumber: "L - 061", area: "", status: "waiting" },
];

const Index = () => {
  const [currentTurns, setCurrentTurns] = useState<Turn[]>(mockCurrentTurns);
  const [nextTurns, setNextTurns] = useState<Turn[]>(mockNextTurns);
  const [waitingTurns, setWaitingTurns] = useState<Turn[]>(mockWaitingTurns);
  const [animatingTurnId, setAnimatingTurnId] = useState<string | undefined>();
  const [notification, setNotification] = useState<string | undefined>();

  // Example: Listen for backend events (customize based on your backend)
  useEffect(() => {
    // This is where you would connect to your backend
    // Example using custom events:
    const handleTurnCalled = (event: CustomEvent) => {
      const { turnId } = event.detail;
      setAnimatingTurnId(turnId);
      
      // Play sound effect here if needed
      // new Audio('/path/to/sound.mp3').play();
      
      setTimeout(() => setAnimatingTurnId(undefined), 3000);
    };

    const handleTurnUpdate = (event: CustomEvent) => {
      const { currentTurns, nextTurns, waitingTurns, notification } = event.detail;
      if (currentTurns) setCurrentTurns(currentTurns);
      if (nextTurns) setNextTurns(nextTurns);
      if (waitingTurns) setWaitingTurns(waitingTurns);
      if (notification) {
        setNotification(notification);
        setTimeout(() => setNotification(undefined), 5000);
      }
    };

    window.addEventListener("turnCalled", handleTurnCalled as EventListener);
    window.addEventListener("turnUpdate", handleTurnUpdate as EventListener);

    return () => {
      window.removeEventListener("turnCalled", handleTurnCalled as EventListener);
      window.removeEventListener("turnUpdate", handleTurnUpdate as EventListener);
    };
  }, []);

  // Example function to trigger turn update (for testing)
  // You can call this from your backend or admin interface
  // window.dispatchEvent(new CustomEvent('turnCalled', { detail: { turnId: '1' } }));
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header companyName="Nombre de la empresa" />
      
      <main className="flex-1 flex gap-4 p-4">
        {/* Advertising Area - Left Side */}
        <div className="flex-1">
          <AdvertisingArea />
        </div>

        {/* Queue Display Panel - Right Side */}
        <div className="w-[480px] bg-display-panel rounded-lg p-6 space-y-6">
          <StatusLegend />
          
          {notification && (
            <NotificationBanner message={notification} type="info" />
          )}
          
          <CurrentTurnsSection
            currentTurns={currentTurns}
            nextTurns={nextTurns}
            animatingTurnId={animatingTurnId}
          />
          
          <WaitingSection waitingTurns={waitingTurns} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
