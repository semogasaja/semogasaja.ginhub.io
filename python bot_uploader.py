import os
import requests
from flask import Flask, request

# Simpan token bot dan ID chat ke variabel lingkungan, biar aman
BOT_TOKEN = os.getenv("8084138952:AAGWV7CHrYDY6eHjHw7a_xTzOMz912JDoxM", "masukkan_token_bot_lo_disini")
CHAT_ID = os.getenv("8153914635", "masukkan_id_chat_lo_disini")

# Nama file buat disimpan data, biar gampang
LOG_FILE = "log_upload.txt"

app = Flask(__name__)

def send_message(text):
    """Fungsi buat kirim pesan ke chat Telegram lo"""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {"chat_id": CHAT_ID, "text": text}
    response = requests.post(url, json=payload)
    if response.status_code != 200:
        print(f"Error ngirim pesan: {response.text}")

@app.route('/upload', methods=['POST'])
def upload_file():
    """Endpoint buat upload file otomatis"""
    if 'file' not in request.files:
        return "File not found", 400
    
    file = request.files['file']
    file.save(file.filename)  # Simpan file lokal sementara
    send_message(f"File {file.filename} diterima dan diupload!")

    # Log aktivitas
    with open(LOG_FILE, "a") as log:
        log.write(f"File {file.filename} diupload.\n")
    
    # Otomatis upload file ke server Telegram
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendDocument"
    with open(file.filename, "rb") as doc:
        payload = {"chat_id": CHAT_ID}
        files = {"document": doc}
        response = requests.post(url, data=payload, files=files)
    
    if response.status_code == 200:
        os.remove(file.filename)  # Hapus file lokal setelah upload
        send_message("File berhasil diupload ke Telegram!")
        return "Upload successful", 200
    else:
        send_message("Gagal upload file ke Telegram!")
        return f"Error: {response.text}", 500

if __name__ == '__main__':
    # Gampang pake Flask, jalanin server di port 5000
    app.run(host="0.0.0.0", port=5000)