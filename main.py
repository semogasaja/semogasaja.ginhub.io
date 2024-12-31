import random
import string
import requests

# Generate endpoint dinamis
def generate_dynamic_endpoint():
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(10))

# Akses via proxy rotasi
def akses_via_proxy(url):
    proxies = [
        {"http": "http://proxy1.com:8080", "https": "http://proxy1.com:8080"},
        {"http": "http://proxy2.com:8080", "https": "http://proxy2.com:8080"}
    ]
    for proxy in proxies:
        try:
            print(f"Mencoba akses dengan proxy: {proxy}")
            response = requests.get(url, proxies=proxy, timeout=5)
            return response.text
        except:
            continue
    return "Proxy gagal"

# Obfuscasi request dengan header custom
def obfuscate_request(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0 Safari/537.36",
        "Referer": "https://google.com",
        "X-Custom-Header": "CustomValue"
    }
    try:
        response = requests.get(url, headers=headers, timeout=5)
        return response.text
    except:
        return "Gagal mengakses link dengan obfuscation"

# Sistem self-repair untuk memperbaiki link
def self_repair(base_url):
    new_endpoint = generate_dynamic_endpoint()
    repaired_url = f"{base_url}/{new_endpoint}"
    print(f"Link diperbaiki ke: {repaired_url}")
    return repaired_url

# Sistem lengkap
def full_auto_script(base_url):
    dynamic_endpoint = generate_dynamic_endpoint()
    full_url = f"{base_url}/{dynamic_endpoint}"
    print(f"Mengakses: {full_url}")

    # Coba akses via proxy
    response = akses_via_proxy(full_url)
    if "Proxy gagal" in response:
        print("Proxy gagal, mencoba akses langsung...")
        response = obfuscate_request(full_url)

    # Jika semua gagal, lakukan self-repair
    if "Gagal" in response or not response:
        print("Semua metode gagal, mencoba self-repair...")
        repaired_url = self_repair(base_url)
        response = obfuscate_request(repaired_url)

    print("Hasil akhir:", response)

# Eksekusi script
full_auto_script("https://website-tujuan.com")