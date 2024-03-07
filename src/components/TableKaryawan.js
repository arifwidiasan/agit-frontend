import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TableKaryawan() {
  const [karyawan, setKaryawan] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [colomnSearch, setColomnSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await api.get("karyawans", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setKaryawan(result.data.data);
    console.log(result.data);
  };

  const handleDeleteById = async (id) => {
    try {
      const res = await api.delete(`karyawans/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.data.message === "success") {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Behasil menghapus karyawan",
          confirmButtonText: "OK",
          showCancelButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.messages,
      });
    }
  };

  const navigate = useNavigate();

  const filteredKaryawan = karyawan.filter((karyawan) => {
    if (colomnSearch === "name") {
      return karyawan.nama.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (colomnSearch === "nip") {
      return karyawan.nip.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (colomnSearch === "email") {
      return karyawan.email.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (colomnSearch === "no_hp") {
      return karyawan.no_hp.toLowerCase().includes(searchTerm.toLowerCase());
    }

    if (colomnSearch === "umur") {
      return Number(karyawan.umur) === Number(searchTerm);
    }

    return true; // if no match, return all
  });

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between mx-auto px-4 py-2 ">
          <div className="relative max-w-xs flex flex-col space-y-4">
            <div>
              <select
                className="relative cursor-pointer max-w-xs block mt-2 w-full p-3 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-100 dark:border-slate-50"
                value={colomnSearch}
                placeholder="Choose column by"
                onChange={(e) => setColomnSearch(e.target.value)}
              >
                <option value="">Choose column by</option>
                <option value="name">Name</option>
                <option value="nip">NIP</option>
                <option value="email">Email</option>
                <option value="no_hp">Nomor</option>
                <option value="umur">Umur</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="hs-table-search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className={`block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-100 dark:border-slate-50 ${
                  colomnSearch === "" && "cursor-not-allowed bg-gray-400"
                }`}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                readOnly={colomnSearch === ""}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <div className="relative max-w-xs ml-6 inline-flex items-center">
              <a
                href="/tambah-karyawan"
                className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Tambah Data
              </a>
            </div>
            <div className="relative max-w-xs ml-6 inline-flex items-center">
              <a
                href="/list-deleted"
                className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                List Deleted
              </a>
            </div>
            <div className="relative max-w-xs ml-6 inline-flex items-center">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    <span className="inline-flex items-center">Nama</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    <span className="inline-flex items-center">NIP</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    <span className="inline-flex items-center">Email</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    <span className="inline-flex items-center">No. HP</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    <span className="inline-flex items-center">Umur</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredKaryawan.map((karyawan, index) => {
                  return (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.nip}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.no_hp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.umur}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div flex flex-row items-center justify-between mx-auto>
                          <button
                            onClick={() => navigate("/detail/" + karyawan.id)}
                            className="justify-center py-2 px-3 mx-1 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                          >
                            Lihat
                          </button>
                          <button
                            onClick={() =>
                              navigate("/update-karyawan/" + karyawan.id)
                            }
                            className="justify-center py-2 px-3 mx-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:green-blue-500"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteById(karyawan.id)}
                            className="justify-center py-2 px-3 mx-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
