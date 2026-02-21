import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function PackageAdminPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get JWT token from localStorage (assuming you store it there)
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/packages`,
          axiosConfig
        );
        setPackages(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/packages/${id}`,
        axiosConfig
      );
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete package");
    }
  };

  if (loading) return <div className="p-10 text-white">Loading packages...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Packages</h1>
        <button
          onClick={() => navigate("/admin/add-package")}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaEdit /> Add Package
        </button>
      </div>

      {!packages.length ? (
        <div className="p-10 text-white">No packages found.</div>
      ) : (
        <table className="min-w-full bg-slate-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Cities Covered</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{pkg.title}</td>
                <td className="px-4 py-2">LKR {pkg.price.toLocaleString()}</td>
                <td className="px-4 py-2">{pkg.duration}</td>
                <td className="px-4 py-2">{pkg.citiesCovered.join(", ")}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link
                    to={`/admin/package-admin/${pkg._id}`}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
