import os
from flask import Flask, request, redirect
import socket

app = Flask(__name__)

# Default URL Vercel lo
TARGET_URL = "https://lyananid-4dana10jt-resmi-claim.vercel.app/"

def get_default_url():
    """Ambil target URL dari variabel lingkungan atau default."""
    return os.getenv("TARGET_URL", TARGET_URL)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    """Redirect semua permintaan ke target URL."""
    target = f"{get_default_url()}/{path}"
    return redirect(target, code=302)

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint buat ngecek server aktif."""
    return "Anti-blokir server is running!", 200

def get_host_ip():
    """Cek otomatis IP server lokal untuk disetting di DNS."""
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)

if __name__ == '__main__':
    # Print IP lokal biar lo tau harus arahkan DNS ke mana
    print(f"Server running. Arahkan domain lo ke IP ini: {get_host_ip()}")
    
    # Jalan otomatis di port 8080 (atau ganti port kalo mau)
    app.run(host='0.0.0.0', port=8080)