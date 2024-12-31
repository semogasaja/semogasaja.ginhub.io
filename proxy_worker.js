async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Base URL server tujuan (target asli)
    const targetUrl = 'https://semoga-jaya-claim.vercel.app/';

    // Path dari request user
    const path = url.pathname;

    // Header manipulasi untuk menyamarkan trafik
    const headers = new Headers(request.headers);
    headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36');
    headers.set('Referer', 'https://google.com');

    // Buat request baru ke server tujuan
    const response = await fetch(targetUrl + path, {
        method: request.method,
        headers: headers,
        body: request.body,
        redirect: 'follow'
    });

    // Kirim balik response ke user
    return new Response(response.body, response);
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});