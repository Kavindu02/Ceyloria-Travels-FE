import React, { useEffect } from "react";
import { Compass } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DestinationsOverview from "../components/DestinationsOverview";
import DestinationsDetail from "../components/DestinationsDetail";

const categoryData = [
    {
        id: "shores",
        title: "Tranquil Shores",
        tagline: "Where Peace Meets the Ocean",
        description: "Explore the sun-drenched coastlines and hidden bays of Sri Lanka.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
        destinations: [
            {
                id: "bentota",
                title: "Bentota",
                description: "Spreading its coastal presence throughout southwest Sri Lanka, Bentota is a tropical paradise with immaculate water, gorgeous golden shorelines and a variety of water sports. Along with a range of thrilling activities like windsurfing, boat tours along the Bentota River and snorkelling locations. Bentota is a great place for those looking for a relaxing beach vacation.",
                image: "https://images.unsplash.com/photo-1586902197503-e710262d24c2?q=80&w=2000&auto=format&fit=crop",
                dark: true,
                imgSide: "right"
            },
            {
                id: "unawatuna",
                title: "Unawatuna",
                description: "Due to its lively nature, the beach's distinctive curved shape, which is adjacent to Sri Lanka's Southern coastline, attracts a lot of tourists. In addition to the thrilling boat rides and snorkelling locations in this tourist area, visitors seeking peace and quiet can discover serene forested hideaways.",
                image: "https://images.unsplash.com/photo-1544015759-42b787597f80?q=80&w=2000&auto=format&fit=crop",
                dark: false,
                imgSide: "left"
            },
            {
                id: "mirissa",
                title: "Mirissa",
                description: "When you arrive at this tropical beach destination, you will be able to witness the stunning coastlines, gleaming ocean and stunning sunset views. Mirissa Beach's main attractions for tourists are diving and lounging on the shore. The beach's stunning surroundings will leave you with enduring memories, so unwind there as the sun sets.",
                image: "https://images.unsplash.com/photo-1540202404-a2f29036bb57?q=80&w=2000&auto=format&fit=crop",
                dark: false,
                imgSide: "right"
            },
            {
                id: "arugam-bay",
                title: "Arugam Bay",
                description: "Arugam Bay, located on Sri Lanka's Eastern Coast, is a well-known surfing spot with serene boat trips to neighbouring lagoons. Visit uncharted waterways to find peace and observe wildlife in its natural environment.",
                image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2000&auto=format&fit=crop",
                dark: true,
                imgSide: "left"
            }
        ]
    },
    {
        id: "cultural",
        title: "Cultural Quest",
        tagline: "Embrace Traditions, Honour the Past",
        description: "Journey through ancient kingdoms and sacred heritage sites.",
        image: "https://images.unsplash.com/photo-1544015759-42b787597f80?q=80&w=1974&auto=format&fit=crop",
        destinations: [
            {
                id: "anuradhapura",
                title: "Anuradhapura",
                description: "Step back in time to the first capital of Sri Lanka. Home to massive dagobas and ancient hydraulic marvels, this sacred city is a testament to the island's glorious past.",
                image: "/pagesPhotos/anuradhapura/hero.png",
                dark: true,
                imgSide: "right"
            },
            {
                id: "sigiriya",
                title: "Sigiriya",
                description: "Experience the eighth wonder of the world. A massive rock fortress rising from the plains, adorned with frescoes and water gardens that showcase ancient engineering genius.",
                image: "/pagesPhotos/sigiriya/hero.png",
                dark: false,
                imgSide: "left"
            }
        ]
    },
    {
        id: "wild",
        title: "Wild Encounters",
        tagline: "Immerse Yourself in Nature’s Wonders",
        description: "Encounter majestic wildlife in their natural sanctuary.",
        image: "https://images.unsplash.com/photo-1581852017103-68accd351ad3?q=80&w=2070&auto=format&fit=crop",
        destinations: [
            {
                id: "yala",
                title: "Yala Safari",
                description: "The premier national park in Sri Lanka. From leopards stalking through the scrub to elephants bathing in lagoons, Yala offers a raw, unfiltered wildlife experience.",
                image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?q=80&w=2148&auto=format&fit=crop",
                dark: true,
                imgSide: "right"
            }
        ]
    },
    {
        id: "nature",
        title: "Nature’s Wonders",
        tagline: "Find Peace in Earth’s Embrace",
        description: "Discover the emerald-green highlands and misty mountain passes.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
        destinations: [
            {
                id: "ella",
                title: "Ella Highlands",
                description: "A misty mountain getaway surrounded by tea estates. Famous for the Nine Arch Bridge and breathtaking views through the Ella Gap.",
                image: "/pagesPhotos/ella/hero.png",
                dark: true,
                imgSide: "right"
            }
        ]
    }
];

const Destinations = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    // Find the current category based on the URL param
    const selectedCategory = categoryData.find(cat => cat.id === category) || null;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [category]);

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden min-h-screen">

            <div className={`transition-all duration-700 ${selectedCategory ? 'pt-10' : 'pt-0'}`}>
                {!selectedCategory ? (
                    <DestinationsOverview
                        categoryData={categoryData}
                        onSelectCategory={(cat) => navigate(`/destinations/${cat.id}`)}
                    />
                ) : (
                    <DestinationsDetail
                        selectedCategory={selectedCategory}
                        onBack={() => navigate("/destinations")}
                    />
                )}
            </div>

            {/* --- CTA SECTION --- */}
            <section className="py-24 px-6 bg-gray-50/50">
                <div className="max-w-6xl mx-auto rounded-[4rem] bg-gray-900 overflow-hidden relative shadow-3xl group">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2070&auto=format&fit=crop"
                            alt="Plan Your Trip"
                            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
                    </div>

                    <div className="relative z-10 p-10 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
                                Craft Your <span className="text-cyan-400">Extraordinary</span> Story
                            </h2>
                            <p className="text-gray-400 text-xl font-light leading-relaxed">
                                Connect with our travel experts to customize your journey through the most beautiful corners of Sri Lanka.
                            </p>
                        </div>
                        <Link
                            to="/contact"
                            className="bg-white text-gray-900 px-12 py-6 rounded-full font-black text-lg hover:bg-cyan-400 hover:scale-105 transition-all shadow-xl shadow-cyan-400/20 flex items-center gap-4 whitespace-nowrap"
                        >
                            Start Planning <Compass size={28} />
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx="true" global="true">{`
                @keyframes subtle-zoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-subtle-zoom {
                    animation: subtle-zoom 20s infinite alternate ease-in-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default Destinations;
