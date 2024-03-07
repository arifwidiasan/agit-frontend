import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import Swal from "sweetalert2";

export default function TableKaryawanDeleted() {
  const [karyawanListDeleted, setKaryawanListDeleted] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await api.get("/karyawans/softdelete", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setKaryawanListDeleted(result.data.data);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
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
                    <span className="inline-flex items-center">Deleted at</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {karyawanListDeleted.map((karyawan, index) => {
                  return (
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {karyawan.deleted_at}
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
