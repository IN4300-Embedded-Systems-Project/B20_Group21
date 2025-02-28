"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [isGateOpen, setIsGateOpen] = useState(true);
  const [isRedLightOn, setIsRedLightOn] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [status, setStatus] = useState("Idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mockMode, setMockMode] = useState(false);

  const streamUrl = process.env.NEXT_PUBLIC_STREAM_URL;

  // Initialize gate state on mount
  useEffect(() => {
    const initializeGate = async () => {
      const response = await fetch("http://127.0.0.1:8000/open-gate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response", response);
      setIsGateOpen(true);
      setStatus("Gate initialized to open position");
    };

    initializeGate();
  }, []);

  const toggleGate = async () => {
    setStatus("Processing...");
    const newGateState = !isGateOpen;

    // Determine target URL based on new state
    const targetAngle = newGateState ? "close-gate" : "open-gate";
    const targetUrl = `http://127.0.0.1:8000/${targetAngle}`;

    console.log("targetUrl", targetUrl);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);

    setIsGateOpen(newGateState);
    setStatus(`Gate ${newGateState ? "closed" : "opened"} successfully`);
    setErrorMessage("");
  };
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gray-100">
      <div className="max-w-5xl w-full mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            SMART RAILWAY System
          </h1>
          <p className="text-gray-600">Rail Gateway & Surveillance Control</p>
          <div className="mt-2 flex items-center">
            <div
              className={`h-3 w-3 rounded-full mr-2 ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-700">
              {isConnected ? "Connected" : "Disconnected"}
            </span>

            {mockMode && (
              <span className="ml-4 px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-full">
                Development Mode
              </span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Stream Panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
              <h2 className="font-semibold">Live Camera Feed</h2>
              <span className="px-2 py-1 text-xs bg-gray-700 rounded-full">
                ESP32-CAM
              </span>
            </div>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {isConnected ? (
                mockMode ? (
                  <div className="text-white text-center p-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto mb-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium">Mock Camera Feed</p>
                      <p className="text-sm text-gray-400 mt-2">
                        This is a placeholder. Real video stream will appear
                        here when ESP32-CAM is connected.
                      </p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={streamUrl}
                    alt="ESP32-CAM Stream"
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <div className="text-white text-center p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto mb-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Camera disconnected</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Check your ESP32-CAM connection
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Control Panel
            </h2>

            <div className="space-y-6">
              {/* Gate Control */}
              <div className="pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Rail Gateway</h3>
                    <p className="text-sm text-gray-500">
                      Current state: {isGateOpen ? "Open" : "Closed"}
                    </p>
                  </div>
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isGateOpen ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                    onClick={toggleGate}
                    role="switch"
                    aria-checked={isGateOpen}
                    tabIndex={0}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isGateOpen ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={toggleGate}
                  disabled={!isConnected && !mockMode}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                    !isConnected && !mockMode
                      ? "bg-gray-400 cursor-not-allowed"
                      : isGateOpen
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {isGateOpen ? "Close Gate" : "Open Gate"}
                </button>
              </div>
            </div>

            {/* Status Display */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                System Status
              </h3>
              <div className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm text-gray-800">{status}</p>
                {errorMessage && (
                  <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
                )}
              </div>

              {mockMode && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    <strong>Development Mode Active:</strong> Using mock
                    responses instead of connecting to real ESP32-CAM. All
                    actions are simulated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
