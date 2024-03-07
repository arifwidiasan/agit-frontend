import Header from "../components/Header";
import TableKaryawan from "../components/TableKaryawan";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <Header heading="Tabel Karyawan" />
          <TableKaryawan />
        </div>
      </div>
    </>
  );
}
