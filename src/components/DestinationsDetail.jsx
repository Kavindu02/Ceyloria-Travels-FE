import React from "react";
import { ChevronLeft, MapPin, Compass } from "lucide-react";

const DestinationsDetail = ({ selectedCategory, onBack }) => {
    return (
        <section className="animate-fade-in-up pb-20">
            {/* Header Section - Simplified & Clean */}
            <div className="container mx-auto px-6 pt-10">
                <button
                    onClick={onBack}
                    className="group mb-12 inline-flex items-center gap-2 font-bold text-gray-400 transition-colors hover:text-blue-600"
                >
                    <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-xs uppercase tracking-widest">Back to Categories</span>
                </button>

                <div className="mb-20 flex flex-col items-start gap-8 border-b border-gray-100 pb-12 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <h2 className="text-5xl font-black tracking-tight text-gray-900 md:text-7xl">
                            {selectedCategory.title}
                        </h2>
                        <p className="mt-4 text-xl font-bold italic tracking-tight text-blue-600 md:text-2xl">
                            {selectedCategory.tagline}
                        </p>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm font-medium leading-relaxed text-gray-500">
                            {selectedCategory.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Zig-zag Destinations Grid */}
            <div className="container mx-auto px-6 space-y-40">
                {selectedCategory.destinations.map((dest, index) => (
                    <div
                        key={dest.id}
                        className={`group relative flex flex-col items-center gap-16 md:flex-row ${index % 2 === 0 ? "" : "md:flex-row-reverse"
                            }`}
                    >
                        {/* Text Side */}
                        <div className="relative z-10 flex-1">
                            <div className={`relative overflow-hidden rounded-[3.5rem] p-12 md:p-20 shadow-2xl transition-all duration-700 ${dest.dark
                                    ? "bg-gray-900 text-white shadow-gray-900/40"
                                    : "bg-white text-gray-900 border border-gray-50 shadow-gray-200/40"
                                }`}>
                                {/* Floating Category Badge */}
                                <div className={`absolute top-12 left-12 flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl ${dest.dark ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                                    }`}>
                                    <MapPin size={24} />
                                </div>

                                <div className="mt-12 space-y-8">
                                    <div className="space-y-2">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${dest.dark ? "text-cyan-400" : "text-blue-600"}`}>
                                            Featured Location
                                        </span>
                                        <h3 className="text-5xl font-black md:text-7xl leading-tight">
                                            {dest.title}
                                        </h3>
                                    </div>

                                    <p className={`text-lg font-light leading-relaxed md:text-xl ${dest.dark ? "text-gray-400" : "text-gray-500"}`}>
                                        {dest.description}
                                    </p>

                                    <div className="flex items-center gap-6 pt-4">
                                        <div className={`h-0.5 w-16 ${dest.dark ? "bg-cyan-400" : "bg-blue-600"}`} />
                                        <span className="text-xs font-black uppercase tracking-[0.3em]">
                                            Experience {dest.title}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Background Number */}
                            <div className={`absolute -bottom-10 opacity-[0.03] text-[15rem] font-black select-none pointer-events-none ${index % 2 === 0 ? "-right-10" : "-left-10"
                                }`}>
                                0{index + 1}
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="flex-1 w-full">
                            <div className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700">
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="h-full w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-white backdrop-blur-xl transition-all duration-500 hover:bg-blue-600 group-hover:scale-110">
                                    <Compass size={28} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DestinationsDetail;
