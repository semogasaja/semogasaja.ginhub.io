import os

def ganti_dns():
    print("Mengganti DNS ke Google (8.8.8.8)")
    os.system("nmcli dev show | grep DNS")
    os.system("nmcli con mod 'Wired connection 1' ipv4.dns '8.8.8.8,8.8.4.4'")
    os.system("nmcli con up 'Wired connection 1'")
    print("DNS berhasil diganti ke Google DNS!")

ganti_dns()