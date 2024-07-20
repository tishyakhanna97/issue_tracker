export async function POST(request) {
    const data = await request.json();

    // Process the form data here
    console.log('Form response received:', data);

    // Respond to the webhook sender
}
