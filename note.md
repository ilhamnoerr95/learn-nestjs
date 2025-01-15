# SHARED MODULE

kita bisa melakukan import antar module secara muda ketika membuat module,sifat module adalah singleton objek dimana module hanya dibuat hanya sekali.

# EXCEPTION FILTER

1. proses error yg tidak ditangani oleh aplikasi
2. ketika aplikasi tidak menangani error, maka exepction filter akan secara otomatis menangani error dengan mengiri response yg lebih user-friendly ke pengguna applikasi
3. secara default, nest menyediakan global exeption filter, yg mengubah error tidak tertangani oleh aplikasi menjadi error berbentu JSON
4. cara membuat exepction filter custom dengan membuat clas turunan ExepctionFilter, kita bisa menggunakan decorator @Catch(Errortype)

# PIPE

method yagn digunakan untuk menyesuaikan format yagn dikirimkan dari klien sesuai dengan yang kita tentukan,
kita juga bisa membuat pipe sendiri dengan menggunanak turunan dari class pipieTransform atau gunakan perintah : nest generate pipe nama_path,

[!note]

> jika ingin menambahkan pipe yang bisa digunakan di semua parameter controller method, bisa gunakan @usePipe() di controller method
> jika ingin menggunakan di class controller dapat menempatkan @UsePipe() di controller.
> atau ketika ingin menggunakan secara global bisa menggunakan useGlobalPipes(), tp sangat jarang digunakan penggunakan global pipiesnya
> perlu diperhatikan bahwa saat menggunakan usePipe secara global kita harus lebih berhati2 saat melakukan pengecekkan karena perbedaan tipe data dapat menyebakan error.

# INTERCEPTORS

Interceptor sama seperti middleware tapi yang membedakan adalah interceptor bisa mengubah hasil request dan response sebelum request / response tersebut sampai ke client.

kalau middleware memiliki fungsi dalam mengelola request yang dimana akan diteruskan kepada middleware yang lain atau lanjut lempar ke controller.

untuk membuat interceptor kita butuh turunan class interface nestinterceptor, dan caranya menggunakan @UseInterceptor() di controller method atau di controller. 

interceptor juga bisa digunakan secara global dengan menggunakan @useGlobalinterceptors()

[!note]
> nestjs menggunakan rxjs (reactive extension librayr javasript), penggunaanya mirip dengan tipe data array.

# adfasdfa