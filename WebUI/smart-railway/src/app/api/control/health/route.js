export async function GET() {
  try {
    // Since we don't have the ESP32 yet, we'll mock the response
    // In a real scenario, this would be:
    // const response = await fetch('http://your-esp32-cam-ip-address/health');
    
    // For testing/development, randomly simulate online/offline status
    const isOnline = Math.random() > 0.3; // 70% chance of being online
    
    if (!isOnline) {
      console.log('Mock health check: ESP32 is offline');
      return new Response(JSON.stringify({ status: 'offline' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Mock health check: ESP32 is online');
    return new Response(JSON.stringify({ status: 'online' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Health check error:', error);
    return new Response(JSON.stringify({ status: 'offline', message: error.message }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}