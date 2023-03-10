# MiniSosmed
1. Gunakan git clone dan letakkan file pada folder laragon atau xampp (pastikan menggunakan php minimal versi 8 karena saya menggunakan laravel 9);
2. Setelah menggunakan git clone kemudian buka vs code pada file yang di clone tadi.
3. gunakan 2 terminal yaitu untuk folder frontend dan backend.
4. setelah itu pada terminal backend ketikkan "composer install" pada terminal.
5. setelah install selesai kemudian buat file baru dengan nama ".env" di dalam folder backend.
6. setelah itu salin semua code pada file ".env_example" kemudian paste pada file ".env".
7. setelah itu ketikan "php artisan key:generate" pada terminal backend.
8. setelah itu ketikan juga "php artisan jwt:secret" untuk membuat key jwt nya.
9. jangan lupa untuk start localhost terlebih dahulu (lebih baik menggunakan laragon).
10. buat database mysql baru dengan nama minisosmed (karena saya menamai database saya di file ".env" dengan nama "minisosmed", bisa diganti nama yang lain dengan mengganti nama database pada file ".env")
11. setelah itu pada terminal backend ketikan "php artisan migrate"
12. setelah proses selesai ketikan juga "php artisan db:seed" untuk mengisi data dalam database.
13. setelah selesai pada terminal frontend ketikan "npm install"
14. setelah proses install selesai ketikan "npm start" untuk start localhost frontend
15. pada terminal backend ketikan "php artisan serve" untuk memulai localhost pada backend
16. setelah itu buka chrome dan ketikan pada url "localhost:3000"
17. setelah itu login menggunakan salah satu email atau nomor telepon di database pada tabel user
18. gunakan password "user123" untuk login
