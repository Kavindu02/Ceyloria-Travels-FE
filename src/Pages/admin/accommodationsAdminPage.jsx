import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function AccommodationsAdminPage() {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const axiosConfig = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` },
    }),
    [token]
  );

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/accommodations`,
          axiosConfig
        );
        setAccommodations(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch accommodations");
      } finally {
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, [axiosConfig]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accommodation?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/accommodations/${id}`,
        axiosConfig
      );
      setAccommodations((prev) => prev.filter((acc) => acc._id !== id));
      toast.success("Accommodation deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete accommodation");
    }
  };

  if (loading) return <div className="p-10 text-white">Loading accommodations...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">All Accommodations</h1>
          <p className="text-gray-400 mt-1">Manage your hotels and accommodations</p>
        </div>
        <button
          onClick={() => navigate("/admin/add-accommodation")}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-600 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
        >
          <FaEdit className="text-lg" /> Add New Hotel
        </button>
      </div>

      {!accommodations.length ? (
        <div className="bg-slate-800 rounded-lg p-12 text-center">
          <p className="text-white text-xl mb-4">No accommodations found.</p>
          <p className="text-gray-400 mb-6">Get started by adding your first hotel.</p>
          <button
            onClick={() => navigate("/admin/add-accommodation")}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold mx-auto"
          >
            <FaEdit className="text-lg" /> Add Your First Hotel
          </button>
        </div>
      ) : (
        <table className="min-w-full bg-slate-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price per Night</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accommodations.map((acc) => (
              <tr key={acc._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{acc.name ?? "N/A"}</td>
                <td className="px-4 py-2">{acc.type ?? "N/A"}</td>
                <td className="px-4 py-2">{acc.location ?? "N/A"}</td>
                <td className="px-4 py-2">
                  LKR {(acc.pricePerNight ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* Edit Button with icon */}
                  <Link
                    to={`/admin/update-accommodation/${acc._id}`}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 flex items-center"
                  >
                    <FaEdit />
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(acc._id)}
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
  );}