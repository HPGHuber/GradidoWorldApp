"use client";
import React, { useEffect, useState } from "react";
import { MiniKit, VerificationLevel } from "@worldcoin/minikit-js";

/**
 * KONFIGURATION
 * Ersetze 'app_your_id' durch die ID aus deinem World Developer Portal
 */
const WORLD_APP_ID = "app_gradido_test_123"; 

export default function GradidoWorldApp() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(1000.0); // Beispielwert

  useEffect(() => {
    // Initialisiert das World App System
    if (typeof window !== "undefined") {
      MiniKit.install(WORLD_APP_ID);
    }
  }, []);

  const handleWorldLogin = async () => {
    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: "login-gradido",
        verification_level: VerificationLevel.Orb,
        signal: "gradido-user-auth",
      });

      if (finalPayload.status === "success") {
        // Hier wird der Nutzer verifiziert!
        setIsLogged(true);
        // Wir nehmen einen Teil der ID als Anzeigenamen
        setUserName("Mensch-" + finalPayload.nullifier_hash.slice(0, 6));
      }
    } catch (error) {
      console.error("Login fehlgeschlagen", error);
      // Für Testzwecke erlauben wir den Login auch ohne echte App
      alert("Demo-Modus: In der echten World App würdest du jetzt eingeloggt sein.");
      setIsLogged(true);
      setUserName("Test-Pionier");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-md p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-inner">
            <span className="text-white font-bold">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Gradido</span>
        </div>
        {isLogged && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Verifiziert
          </span>
        )}
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md flex-1 px-6 flex flex-col justify-center items-center text-center">
        {!isLogged ? (
          <>
            <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Natürliche Ökonomie für alle.
            </h1>
            <p className="text-gray-500 mb-10 text-lg">
              Verbinde deine World ID, um dein Gradido-Konto sicher zu aktivieren.
            </p>
            <button
              onClick={handleWorldLogin}
              className="w-full bg-black text-white py-5 rounded-2xl text-xl font-bold shadow-2xl active:scale-95 transition-transform"
            >
              Mit World ID anmelden
            </button>
            <p className="mt-6 text-sm text-gray-400">
              Ein Projekt für das dreifache Wohl: <br/> Individuum, Gemeinschaft, Umwelt.
            </p>
          </>
        ) : (
          <div className="w-full space-y-6">
            {/* Wallet Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-[2rem] text-white shadow-xl text-left relative overflow-hidden">
              <div className="relative z-10">
                <p className="opacity-80 text-sm font-medium">Dein Guthaben</p>
                <h2 className="text-5xl font-black mt-1">{balance.toLocaleString()} GDD</h2>
                <p className="mt-4 text-xs opacity-70">Besitzer: {userName}</p>
              </div>
              {/* Dekorativer Kreis im Hintergrund */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-gray-100 p-6 rounded-2xl font-bold flex flex-col items-center gap-2 active:bg-gray-200">
                <span>➕</span> Schöpfen
              </button>
              <button className="bg-gray-100 p-6 rounded-2xl font-bold flex flex-col items-center gap-2 active:bg-gray-200">
                <span>↗️</span> Senden
              </button>
            </div>

            <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
              <p className="text-green-800 text-sm italic">
                "Dankbarkeit ist die Währung der Zukunft."
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md p-8 text-center text-xs text-gray-400">
        Powered by Gradido Protocol & World ID SDK
      </footer>
    </div>
  );
}
