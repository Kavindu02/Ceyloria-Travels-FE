import { useState, useEffect } from "react";
import { MapPin, Calendar, Users, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const fontHead = "font-['Poppins']";
const fontBody = "font-['Inter']";

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/packages`
        );
        setPackages(response.data || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
        toast.error("Failed to load packages. Please try again.");
        // Fallback demo data
        setPackages([
          {
            _id: "1",
            title: "Cultural Triangle Explorer",
            description:
              "Explore ancient cities, temples, and UNESCO World Heritage sites across Sri Lanka's cultural heartland.",
            price: 1200,
            duration: 5,
            maxPeople: 8,
            image:
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            rating: 4.8,
            category: "Cultural",
          },
          {
            _id: "2",
            title: "Coastal Retreat Paradise",
            description:
              "Relax on pristine beaches, enjoy water sports, and witness stunning ocean sunsets.",
            price: 1500,
            duration: 7,
            maxPeople: 6,
            image:
              "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
            rating: 4.9,
            category: "Beach",
          },
          {
            _id: "3",
            title: "Hill Country Mountain Escape",
            description:
              "Journey through tea plantations, misty mountains, and colonial-era towns.",
            price: 1000,
            duration: 4,
            maxPeople: 10,
            image:
              "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=800&q=80",
            rating: 4.7,
            category: "Adventure",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className={`bg-gradient-to-b from-neutral-50 to-white ${fontBody}`}>
      {/* Hero Section */}
      <section className="relative w-full h-80 md:h-96 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2760%27%20height%3D%2760%27%20viewBox%3D%270%200%2060%2060%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.1%27%3E%3Cpath%20d%3D%27M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
          <h1 className={`${fontHead} text-5xl md:text-7xl font-bold mb-4 text-center drop-shadow-lg`}>
            Discover Our Packages
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center">
            Handpicked travel experiences crafted to show you the beauty and soul
            of Sri Lanka
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-16">
            <h2 className={`${fontHead} text-3xl font-bold text-neutral-900 mb-2`}>
              All Packages
            </h2>
            <p className="text-neutral-500">
              {packages.length} package{packages.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-200 border-t-cyan-600"></div>
            </div>
          )}

          {/* Packages Grid */}
          {!loading && packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div
                  key={pkg._id || idx}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-neutral-100 hover:border-cyan-300"
                >
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden bg-neutral-100">
                    {pkg.image ? (
                      <>
                        <img
                          src={pkg.image}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={pkg.title}
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                        <MapPin size={48} className="text-cyan-400 opacity-50" />
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span>{pkg.rating || 4.8}</span>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg px-4 py-2 shadow-md">
                      <span className="text-2xl font-bold text-cyan-600">
                        ${pkg.price || "N/A"}
                      </span>
                      <span className="text-xs text-neutral-500 block">per person</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {pkg.category && (
                      <div className="inline-block px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        {pkg.category}
                      </div>
                    )}

                    <h3 className={`${fontHead} text-xl font-bold text-neutral-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2`}>
                      {pkg.title}
                    </h3>

                    <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-6 pb-6 border-b border-neutral-100">
                      {pkg.duration && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-cyan-500" />
                          {pkg.duration} Days
                        </span>
                      )}
                      {pkg.maxPeople && (
                        <>
                          <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                          <span className="flex items-center gap-1.5">
                            <Users size={16} className="text-cyan-500" />
                            Up to {pkg.maxPeople} Pax
                          </span>
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg group-hover:shadow-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-600 active:scale-95">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-20">
                <MapPin size={64} className="mx-auto text-neutral-300 mb-4" />
                <h3 className={`${fontHead} text-2xl font-bold text-neutral-900 mb-2`}>
                  No packages found
                </h3>
                <p className="text-neutral-500">
                  Try adjusting your filters to see more options
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className={`${fontHead} text-4xl md:text-5xl font-bold mb-4`}>
            Ready for Your Next Adventure?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Let our expert team customize the perfect itinerary for you
          </p>
          <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-full hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neutral-400">
            © 2024 Sri Lanka Travel. Designed with{" "}
            <span className="text-red-500">♥</span> for wanderers
          </p>
        </div>
      </footer>
    </div>
  );
}
