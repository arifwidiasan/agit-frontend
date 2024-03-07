import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

export default function Detail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleDetailById();
  }, []);

  const handleDetailById = async () => {
    try {
      const res = await api.get(`karyawans/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.messages,
      });
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="w-full px-20 mt-10 mx-auto">
            <Header heading="Detail Karyawan" />
            <div
            className="cursor-pointer mb-4 flex items-center"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <strong>Back</strong>
          </div>
            <div className="mt-5 p-6  bg-white shadow-md rounded-lg overflow-hidden">
              <h1 className="text-2xl font-bold mb-4">{data?.nama}</h1>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p>
                    <strong>NIP:</strong> {data?.nip}
                  </p>
                  <p>
                    <strong>Tempat Lahir:</strong> {data?.tempat_lahir}
                  </p>
                  <p>
                    <strong>Tanggal Lahir:</strong>{" "}
                    {new Date(data?.tanggal_lahir).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {data?.alamat}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Agama:</strong> {data?.agama}
                  </p>
                  <p>
                    <strong>Jenis Kelamin:</strong> {data?.jenis_kelamin}
                  </p>
                  <p>
                    <strong>No HP:</strong> {data?.no_hp}
                  </p>
                  <p>
                    <strong>Email:</strong> {data?.email}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Created At:</strong> {data?.created_at}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {!!data?.updated_at ? data.updated_at : "-"}
                  </p>
                  <p>
                    <strong>Deleted At:</strong>{" "}
                    {!!data?.deleted_at ? data.deleted_at : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
