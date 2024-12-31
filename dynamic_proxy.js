function generateDynamicPath() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function handleRequest(request) {
    const url = new URL(request.url);

    // Dynamic path generator
    const dynamicPath = generateDynamicPath();

    // Base URL server tujuan
    const targetUrl = 'https://semoga-jaya-claim.vercel.app/' + dynamicPath;

    // Header manipulasi
    const headers = new Headers(request.headers);
    headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36');
    headers.set('Referer', 'https://google.com');

    // Buat request baru
    const response = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow'
    });

    return new Response(response.body, response);
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});