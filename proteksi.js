// Disable Right Click and Inspect
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
        alert("Access Denied!");
    }
});

// Dynamic Encryption Key
const encryptionKey = [...Array(32)].map(() => Math.random().toString(36)[2]).join('');

// Encrypted HTML Content
const encryptedHTML = `QWZ5YXJlIGhhbWFuLCBlcnJvciBtYXUuIERlZW5jcnlwdGVkIGNvbnRlbnQgcGVybGluZGVuLi4u`;

// Decode and Render HTML at Runtime
function decodeAndRender() {
    const atobDecoded = atob(encryptedHTML); // Base64 Decode
    const htmlContent = atobDecoded.split("").map((char, i) => {
        const charCode = char.charCodeAt(0) ^ encryptionKey.charCodeAt(i % encryptionKey.length);
        return String.fromCharCode(charCode);
    }).join("");

    document.body.innerHTML = htmlContent;
}

// Run Decoder
decodeAndRender();

// Anti Copy-Paste and Screen Capture
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

// Tampering Protection
setInterval(() => {
    if (document.body.innerHTML === "") {
        alert("Tampering detected! Exiting...");
        window.location.href = "about:blank";
    }
}, 500);