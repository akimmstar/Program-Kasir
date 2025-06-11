const hargaBarang = {
  "Makanan": 10000,
  "Minuman": 8000,
  "Alat Tulis": 5000
};

let keranjang = [];

function tambahBarang() {
  const jenis = document.getElementById("jenis").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);

  if (!jenis || isNaN(jumlah) || jumlah <= 0) {
    alert("Silakan pilih jenis barang dan jumlah yang valid.");
    return;
  }

  const harga = hargaBarang[jenis];
  keranjang.push({ barang: jenis, harga, jumlah });

  renderKeranjang();
  document.getElementById("jenis").value = "";
  document.getElementById("jumlah").value = "";
}

function renderKeranjang() {
  const tbody = document.getElementById("keranjang");
  tbody.innerHTML = "";

  let total = 0;

  keranjang.forEach((item, index) => {
    const subtotal = item.harga * item.jumlah;
    total += subtotal;

    const row = `
      <tr>
        <td>${item.barang}</td>
        <td>Rp ${item.harga}</td>
        <td>${item.jumlah}</td>
        <td>Rp ${subtotal}</td>
        <td><button onclick="hapusBarang(${index})">❌</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("total").textContent = total;
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  renderKeranjang();
}

function cetakNota() {
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let nota = "=== Nota Belanja ===\n";
  keranjang.forEach(item => {
    nota += `${item.barang} (${item.jumlah} x Rp ${item.harga}) = Rp ${item.harga * item.jumlah}\n`;
  });

  nota += `\nTotal: Rp ${document.getElementById("total").textContent}`;
  alert(nota);
}