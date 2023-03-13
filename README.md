# MetroMed
Metromed adalah website mini sosmed dimana nantinya user dapat melihat status status dari user lain serta membuat mengedit serta menghapus status sendiri. user juga dapat memberikan like pada status serta memberikan commentar dan like commentar user lain. user juga dapat memberikan reply atau membalas kommentar dari user lain. untuk dapat masuk ke website maka user harus login terlebih dahulu dengan nomor telepon ataupun email yang terdaftar. jika belum memiliki akun user dapat register dahulu.
## instalasi projek
gunakan gitclone terlebih dahulu untuk menginstall source code nya.
### integrasi backend

- buka foldernya menggunakan vscode dan ketikan `cd backend` di terminal.
- install composer dengan mengetikkan `composer install` pada terminal.
- buat file baru dengan nama `.env` di dalam folder backend.
- copy semua code di dalam file `.env.example` kemudian paste di file `.env`.
- setelah itu ketikan `php artisan key:generate` pada terminal untuk menciptakan key pada env.
- buat key jwt di env dengan mengetikkan `php artisan jwt:secret` pada terminal.
- jangan lupa untuk start localhost menggunakan laragon.
- buat database mysql baru dengan nama `metromed`.
- buat tabel pada database dengan mengetikkan `php artisan migrate` pada terminal.
- seeding data dengan mengetikkan `php artisan db:seed` pada terminal

### integrasi frontend
- buka folder frontend dengan mengetikkan `cd frontend` pada terminal
- install package frontend dengan mengetikkan `npm install` pada terminal

### Start Website
- gunakan 2 terminal. untuk terminal pertama ketikkan `cd backend` kemudian ketikkan `php artisan serve`.
- untuk terminal kedua ketikkan `cd frontend` ketikkan `npm start`.
- pada browser ketikkan `localhost:3000` pada inputan url.
- kemudian login menggunakan email atau nomor telepon yang ada pada database minisosmed di tabel user
- login dengan password `user123`

note: jika ada update, ketikan `git pull origin main` pada terminal folder metromed untuk mendapatkan update terbarunya
