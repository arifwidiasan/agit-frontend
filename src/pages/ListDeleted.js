import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TableKaryawanDeleted from "../components/TableKaryawanDeleted";

export default function ListDeleted() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <Header heading="List Deleted Karyawan" />
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
          <TableKaryawanDeleted />
        </div>
      </div>
    </>
  );
}
