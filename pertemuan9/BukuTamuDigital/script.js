// Ambil elemen daftar dari HTML
const daftar = document.getElementById("daftar");

// Jalankan fungsi saat tombol Simpan diklik
document.getElementById("simpan").addEventListener("click", function () {

    // Ambil nilai dari input nama dan instansi
    const nama = document.getElementById("nama").value;
    const instansi = document.getElementById("instansi").value;

    // Periksa apakah nama sudah diisi
    if (nama === "") {
        alert("Nama wajib diisi");
        return;
    }

    // Buat item daftar baru lalu tambahkan ke halaman
    const item = document.createElement("li");
    item.textContent = nama + " - " + instansi;
    daftar.appendChild(item);

    // Kosongkan isian setelah disimpan
    document.getElementById("nama").value = "";
    document.getElementById("instansi").value = "";
});