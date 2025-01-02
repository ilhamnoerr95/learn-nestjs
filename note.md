# SHARED MODULE

kita bisa melakukan import antar module secara muda ketika membuat module,sifat module adalah singleton objek dimana module hanya dibuat hanya sekali.


# EXCEPTION FILTER
1. proses error yg tidak ditangani oleh aplikasi
2. ketika aplikasi tidak menangani error, maka exepction filter akan secara otomatis menangani error dengan mengiri response yg lebih user-friendly ke pengguna applikasi
3. secara default, nest menyediakan global exeption filter, yg mengubah error tidak tertangani oleh aplikasi menjadi error berbentu JSON 
4. cara membuat exepction filter custom dengan membuat clas turunan ExepctionFilter, kita bisa menggunakan decorator @Catch(Errortype)