const axios = require('axios');

// Generate dynamic endpoint
function generateDynamicEndpoint() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Akses via proxy rotasi
async function aksesViaProxy(url, proxies) {
    for (let proxy of proxies) {
        try {
            console.log(`Mencoba akses dengan proxy: ${proxy}`);
            const response = await axios.get(url, {
                proxy: {
                    host: proxy.host,
                    port: proxy.port
                }
            });
            console.log("Berhasil akses via proxy.");
            return response.data;
        } catch (err) {
            console.log(`Proxy gagal: ${proxy.host}`);
        }
    }
    return "Proxy gagal.";
}

// Obfuscate request
async function obfuscateRequest(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36',
                'Referer': 'https://google.com',
                'X-Custom-Header': 'CustomValue'
            }
        });
        console.log("Berhasil akses dengan obfuscation.");
        return response.data;
    } catch (err) {
        console.log("Gagal akses dengan obfuscation.");
        return "Gagal mengakses link dengan obfuscation.";
    }
}

// Self-repair
function selfRepair(baseUrl) {
    const newEndpoint = generateDynamicEndpoint();
    const repairedUrl = `${baseUrl}/${newEndpoint}`;
    console.log(`Link diperbaiki ke: ${repairedUrl}`);
    return repairedUrl;
}

// Full script
async function fullAutoScript(baseUrl) {
    let dynamicEndpoint = generateDynamicEndpoint();
    let fullUrl = `${baseUrl}/${dynamicEndpoint}`;
    console.log(`Mengakses: ${fullUrl}`);

    // Proxy rotasi
    const proxies = [
        { host: 'proxy1.com', port: 8080 },
        { host: 'proxy2.com', port: 8080 }
    ];

    let response = await aksesViaProxy(fullUrl, proxies);

    // Obfuscation jika proxy gagal
    if (response === "Proxy gagal.") {
        console.log("Proxy gagal, mencoba akses langsung...");
        response = await obfuscateRequest(fullUrl);
    }

    // Self-repair jika semua gagal
    if (response.includes("Gagal")) {
        console.log("Semua metode gagal, mencoba self-repair...");
        const repairedUrl = selfRepair(baseUrl);
        response = await obfuscateRequest(repairedUrl);
    }

    console.log("Hasil akhir:", response);
}

// Eksekusi
fullAutoScript("https://semoga-jaya-claim.vercel.app/");