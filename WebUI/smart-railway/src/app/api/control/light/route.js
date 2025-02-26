// export async function POST(request) {
//   try {
//     const data = await request.json();
//     const { on } = data;
    
//     // Since we don't have the ESP32 yet, we'll mock the response
//     // In a real scenario, this would be:
//     // const response = await fetch(`http://your-esp32-cam-ip-address/control?redlight=${on ? 'on' : 'off'}`);
    
//     // Simulate a successful response
//     console.log(`Mock request: Red light turned ${on ? 'on' : 'off'}`);
    
//     // Return a successful response
//     return new Response(JSON.stringify({ success: true, isOn: on }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Light control error:', error);
//     return new Response(JSON.stringify({ success: false, message: 'Failed to control red light', error: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }