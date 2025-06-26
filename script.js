document.addEventListener('DOMContentLoaded', function () {
    // Typing effect (only on the homepage)
    if (document.querySelector('.typing')) {
        var typed = new Typed('.typing', {
            strings: ["Web Developer", "Design Grapic", "Freelancer", "Roleplayer", "Modder", "Mapper", "Student"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    // Mendapatkan elemen modal dan tombol close
    const paymentModal = document.getElementById('paymentModal');
    const closeButton = document.querySelector('.close-button');

    // Menutup modal ketika mengklik di luar area konten modal
    window.onclick = function(event) {
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
    };
});

// Variabel global untuk menyimpan detail produk yang dipilih
let selectedProductName = '';
let selectedProductPrice = ''; // Akan menyimpan string seperti "Rp 350.000"

// Fungsi untuk membuka modal pembayaran
function openPaymentModal(nameId, priceId) {
    selectedProductName = document.getElementById(nameId).innerText;
    selectedProductPrice = document.getElementById(priceId).innerText;

    document.getElementById('modalProductName').innerText = selectedProductName;
    document.getElementById('modalProductPrice').innerText = selectedProductPrice;

    document.getElementById('paymentModal').style.display = 'flex'; // Use flex to center
}

// Fungsi untuk menutup modal pembayaran
function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Fungsi untuk mengirim pesan WhatsApp dengan metode pembayaran
function sendWhatsAppMessage(paymentMethod) {
    const phoneNumber = '6282142961010'; // Nomor WhatsApp tujuan
    let finalProductPrice = selectedProductPrice;

    // Jika metode pembayaran adalah QRIS, tambahkan pajak
    if (paymentMethod.includes('Qris')) {
        // Hapus "Rp " dan titik pemisah ribuan, lalu konversi ke angka
        let numericPrice = parseFloat(selectedProductPrice.replace('Rp ', '').replace(/\./g, ''));
        let priceWithTax = numericPrice + 2000;
        // Format kembali ke Rupiah
        finalProductPrice = 'Rp ' + priceWithTax.toLocaleString('id-ID');
    }

    const message = `Halo! saya ingin memesan ${selectedProductName} dengan harga ${finalProductPrice}. Metode pembayaran yang saya pilih adalah ${paymentMethod}.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
    closePaymentModal(); // Tutup modal setelah mengirim pesan
}
