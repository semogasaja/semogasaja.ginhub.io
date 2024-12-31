import os
from flask import Flask, request, redirect

app = Flask(__name__)

# Ganti ini dengan domain Vercel lo yang kena blokir
TARGET_URL = os.getenv("TARGET_URL", "https://lyananid-4dana10jt-resmi-claim.vercel.app/")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    """Redirect semua permintaan ke target URL."""
    target = f"{TARGET_URL}/{path}"
    return redirect(target, code=302)

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint buat ngecek apakah server jalan."""
    return "Server is running!", 200

if __name__ == '__main__':
    # Jalanin server di port 8080 (ganti kalo perlu)
    app.run(host='0.0.0.0', port=8080)
