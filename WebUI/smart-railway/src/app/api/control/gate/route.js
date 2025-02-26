export async function POST(request) {
  try {
    const data = await request.json();
    const { open } = data;
    
    // Since we don't have the ESP32 yet, we'll mock the response
    // In a real scenario, this would be:
    // const response = await fetch(`http://your-esp32-cam-ip-address/control?gate=${open ? 'open' : 'close'}`);
    
    // Simulate a successful response
    console.log(`Mock request: Gate ${open ? 'opened' : 'closed'}`);
    
    // Return a successful response
    return new Response(JSON.stringify({ success: true, isOpen: open }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gate control error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Failed to control gate', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}