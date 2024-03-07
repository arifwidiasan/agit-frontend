import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function FormKaryawan() {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [agama, setAgama] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleAddKaryawan = async (data) => {
    try {
      const res = await api.post("karyawans", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(res);

      if (res.data.message === "success") {
        console.log("Karyawan berhasil ditambahkan");
        Swal.fire({
          icon: "success",
          title: "Behasil menambahkan karyawan",
          confirmButtonText: "OK",
          showCancelButton: false,
        });
        await navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.messages,
      });
      throw new Error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    if (!!tanggalLahir) {
      setUmur(new Date().getFullYear() - parseInt(tanggalLahir.split("-")[0]));
    }
  }, [tanggalLahir]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        handleAddKaryawan({
          nama: nama,
          nip: nip,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir + "T00:00:00Z",
          alamat: alamat,
          agama: agama,
          jenis_kelamin: jenisKelamin,
          no_hp: noHp,
          email: email,
        });
      }}
    >
      <div className="">
        {/* Nama */}
        <div class="mb-6">
          <label
            for="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nama
          </label>
          <input
            type="text"
            name="nama"
            onChange={(event) => setNama(event.target.value)}
            value={nama}
            id="name"
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>
        {/* nip */}
        <div class="mb-6">
          <label
            for="nip"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            NIP
          </label>
          <input
            type="text"
            id="nip"
            name="nip"
            onChange={(event) => setNip(event.target.value)}
            value={nip}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="1234567890"
            required
          />
        </div>
        {/* tempat lahir */}
        <div class="mb-6">
          <label
            for="tempatLahir"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tempat Lahir
          </label>
          <input
            type="text"
            id="tempatLahir"
            name="tempatLahir"
            onChange={(event) => setTempatLahir(event.target.value)}
            value={tempatLahir}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Jakarta"
            required
          />
        </div>
        {/* tanggal lahir */}
        <div class="mb-6">
          <label
            for="tanggalLahir"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="tanggalLahir"
            name="tanggalLahir"
            onChange={(event) => {
              setTanggalLahir(event.target.value);
              setUmur(
                new Date().getFullYear() - parseInt(tanggalLahir.split("-")[0])
              );

              console.log(umur);
            }}
            value={tanggalLahir}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* umur */}
        <div class="mb-6">
          <label
            for="umur"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Umur
          </label>
          <input
            type="text"
            id="umur"
            name="umur"
            value={!!umur ? umur : ""}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="umur"
            readOnly
          />
        </div>
        {/* alamat */}
        <div class="mb-6">
          <label
            for="alamat"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Alamat
          </label>
          <textarea
            id="alamat"
            name="alamat"
            onChange={(event) => setAlamat(event.target.value)}
            value={alamat}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Jl. Jend. Sudirman No. 1, Jakarta"
            required
          />
        </div>
        {/* agama */}
        <div class="mb-6">
          <label
            for="agama"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Agama
          </label>
          <select
            id="agama"
            name="agama"
            onChange={(event) => setAgama(event.target.value)}
            value={agama}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Pilih Agama</option>
            <option value="islam">Islam</option>
            <option value="kristen">Kristen</option>
            <option value="katolik">Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="budha">Budha</option>
          </select>
        </div>
        {/* jenis kelamin */}
        <div class="mb-6">
          <label
            htmlFor="jenisKelamin"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Jenis Kelamin
          </label>
          <div class="flex items-center">
            <input
              type="radio"
              id="laki-laki"
              name="jenisKelamin"
              onChange={() => setJenisKelamin("laki-laki")}
              value="laki-laki"
              className="text-blue-500 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <label
              htmlFor="laki-laki"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Laki-laki
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="perempuan"
              name="jenisKelamin"
              onChange={() => setJenisKelamin("perempuan")}
              value="perempuan"
              className="text-blue-500 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <label
              htmlFor="perempuan"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Perempuan
            </label>
          </div>
        </div>

        {/* no.hp */}
        <div class="mb-6">
          <label
            for="noHp"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            No. HP
          </label>
          <input
            type="text"
            id="noHp"
            onChange={(event) => setNoHp(event.target.value)}
            value={noHp}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="081234567890"
            required
          />
        </div>
        {/* email */}
        <div class="mb-6">
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            className="border border-slate-700  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@company.com"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
