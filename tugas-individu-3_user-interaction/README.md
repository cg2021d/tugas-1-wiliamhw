# Tugas Individu ThreeJS
Buat obyek baru yang muncul diposisi dan warna secara random yang semakin lama semakin cepat, Berhenti tambah obyek baru jika jumlah obyek sudah mencapai batas tertentu. Pilih 2 obyek pasangan yang memiliki warna yang sama. Jika 2 obyek pasangan sudah terpilih, hapus obyek-obyek tersebut dan tambah skor

## Cara Instalasi
1. Jadikan folder `tugas-individu-3_user-interaction` sebagai root folder.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka `http://localhost:3000/`.

## Fitur
* Geometri berupa kubus akan digenerate sebanyak 50 dengan warna dan position 
  yang random pada saat dibuka.
* Kubus akan digenerate sebanyak 4 dengan warna yang random secara otomatis 
  setiap 10 detik.
* Interval di atas akan berkurang sebanyak 0.25 detik setiap kubus digenerate 
  secara otomatis dengan nilai interval terkecil yaitu 2 detik.
* Obyek akan dibatasi sebanyak 200. Jika objek telah berjumlah lebih dari 196, 
  maka obyek tidak akan digenerate.
* Skor akan bertambah sebanyak 50 jika berhasil memilih kubus dengan warna yang sama.
* Skor akan berkurang sebanyak 25 jika memilih warna yang berbeda.
* Jika skor bernilai minus, maka skor akan direset menjadi 0.

## Hasil
![hasil](./src/assets/hasil.gif)
