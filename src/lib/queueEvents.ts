import { Turn } from "@/components/queue/CurrentTurnsSection";

/**
 * Queue Management Event System
 * Use these functions to integrate with your backend
 */

export interface TurnUpdateEvent {
  currentTurns?: Turn[];
  nextTurns?: Turn[];
  waitingTurns?: Turn[];
  notification?: string;
}

/**
 * Trigger when a turn is called
 * This will animate the turn card and can play a sound
 */
export const callTurn = (turnId: string) => {
  window.dispatchEvent(
    new CustomEvent("turnCalled", {
      detail: { turnId },
    })
  );
};

/**
 * Update all turn lists and optionally show a notification
 */
export const updateTurns = (data: TurnUpdateEvent) => {
  window.dispatchEvent(
    new CustomEvent("turnUpdate", {
      detail: data,
    })
  );
};

/**
 * Example integration with WebSocket or polling
 * Uncomment and customize based on your backend
 */
/*
export const connectToBackend = () => {
  // WebSocket example
  const ws = new WebSocket('ws://your-backend-url');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'TURN_CALLED') {
      callTurn(data.turnId);
    } else if (data.type === 'TURN_UPDATE') {
      updateTurns(data);
    }
  };

  return ws;
};

// REST API polling example
export const pollTurnUpdates = async () => {
  const response = await fetch('/api/turns');
  const data = await response.json();
  updateTurns(data);
};
*/
