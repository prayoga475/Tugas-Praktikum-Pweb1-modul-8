let dataPesanan = {
  namaPemesan: "",
  nomorIdentitas: 0,
  jenisKelamin: "",
  tipeKamar: "",
  durasiPenginapan: 0,
  diskon: 0,
  totalBayar: 0,
};

const dataKamar = [
  {
    tipeKamar: "standar",
    harga: 250000,
  },
  {
    tipeKamar: "deluxe",
    harga: 300000,
  },
  {
    tipeKamar: "family",
    harga: 350000,
  },
];

const hargaBreakfast = 80000;

const fungsiDiskon = (harga, durasiPenginapan) => {
  if (durasiPenginapan > 3) {
    return (harga * 10) / 100;
  } else {
    return 0;
  }
};

const fungsiTotalBayar = (harga, diskon, breakfast) => {
  switch (breakfast) {
    case true:
      return harga + hargaBreakfast - diskon;
    case false:
      return harga - diskon;
    default:
      return harga;
  }
};

const handleTipeKamar = (e) => {
  const tipeKamar = e.target.value;
  const kamarPilihan = dataKamar.find((fil) => {
    return fil.tipeKamar === tipeKamar;
  });

  dataPesanan = {
    ...dataPesanan,
    tipeKamar,
  };

  document.getElementById("harga").value = kamarPilihan.harga;
};

const handleNomorIdentitas = (e) => {
  const nomorIdentitas = e.target.value;
  const nomorIdentitasMessage = document.getElementById(
    "nomorIdentitasMessage"
  );
  console.log(nomorIdentitas.length);

  if (nomorIdentitas.length <= 16) {
    nomorIdentitasMessage.style.display = "table-row";
  } else {
    nomorIdentitasMessage.style.display = "none";
  }

  dataPesanan = {
    ...dataPesanan,
    nomorIdentitas,
  };
};

document.getElementById("nomorIdentitasMessage").style.display = "none";

const handleSubmit = (e) => {
  e.preventDefault();

  const idPemesanan = document.getElementById("idPemesanan").value;
  const namaPemesan = document.getElementById("namaPemesan").value;
  const jenisKelamin = document.getElementById("jk").value;
  const tanggalPesan = document.getElementById("tanggalPesan").value;
  const durasiMenginap = Number(
    document.getElementById("durasiMenginap").value
  );
  const breakfast = document.getElementById("breakfast").checked;
  const resumePemesanan = document.querySelector(".resumePemesanan");

  const kamarPilihan = dataKamar.find((fil) => {
    return fil.tipeKamar === dataPesanan.tipeKamar;
  });

  let diskonPesanan = fungsiDiskon(kamarPilihan.harga, durasiMenginap);
  let totalBayar = fungsiTotalBayar(
    kamarPilihan.harga,
    diskonPesanan,
    breakfast
  );

  document.getElementById("totalBayar").value = totalBayar;

  dataPesanan = {
    ...dataPesanan,
    namaPemesan: namaPemesan,
    jenisKelamin: jenisKelamin,
    durasiPenginapan: durasiMenginap,
    diskon: diskonPesanan,
    totalBayar,
  };

  resumePemesanan.innerHTML = `
  <table>
          <thead>
            <tr>
              <th colspan="3">Resume Pemesanan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nama Pemesan</td>
              <td>=</td>
              <td>${dataPesanan.namaPemesan}</td>
            </tr>
            <tr>
              <td>Nomor identitas</td>
              <td>=</td>
              <td>${dataPesanan.nomorIdentitas}</td>
            </tr>
            <tr>
              <td>Jenis kelamin</td>
              <td>=</td>
              <td>${dataPesanan.jenisKelamin}</td>
            </tr>
            <tr>
              <td>Tipe kamar</td>
              <td>=</td>
              <td>${dataPesanan.tipeKamar}</td>
            </tr>
            <tr>
              <td>Durasi penginapan</td>
              <td>=</td>
              <td>${dataPesanan.durasiPenginapan}</td>
            </tr>
            <tr>
              <td>Diskon</td>
              <td>=</td>
              <td>${dataPesanan.diskon}</td>
            </tr>
            <tr>
              <td>Total bayar</td>
              <td>=</td>
              <td>${dataPesanan.totalBayar}</td>
            </tr>
          </tbody>
        </table>
  `;
};
