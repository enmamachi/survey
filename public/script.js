document.getElementById('survey-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Kirim data survei ke server
    fetch('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Tampilkan pesan sukses
        this.reset(); // Reset formulir setelah pengiriman
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Fungsi untuk mengunduh hasil survei
document.getElementById('download-btn')?.addEventListener('click', function() {
    window.location.href = '/download';
});
