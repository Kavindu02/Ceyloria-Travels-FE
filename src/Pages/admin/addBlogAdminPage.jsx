import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RiArticleLine, RiImageAddLine, RiArrowLeftLine } from "react-icons/ri";

export default function AddBlogAdminPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "",
        author: "Ceyloria Team",
        anchor: "",
        link: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            // Auto-generate anchor and link if title changes
            ...(name === "title" && {
                anchor: value.toLowerCase().replace(/[^a-z0-9]/g, "-"),
                link: "/" + value.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            }),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/blogs", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Blog created successfully!");
            navigate("/admin/blogs");
        } catch (err) {
            console.error("Error creating blog:", err);
            toast.error(err.response?.data?.message || "Failed to create blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    to="/admin/blogs"
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition"
                >
                    <RiArrowLeftLine className="text-xl" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Add New Blog</h1>
                    <p className="text-slate-400">Share a new adventure with your readers</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Blog Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Hidden Gems of Sigiriya"
                            className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white focus:border-teal-500 outline-none transition"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white focus:border-teal-500 outline-none transition"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="City Guide">City Guide</option>
                            <option value="Nature">Nature</option>
                            <option value="Heritage">Heritage</option>
                            <option value="Coastal">Coastal</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Culture">Culture</option>
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-300">Image URL *</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://image-url.com/photo.jpg or /gallery/path.png"
                                className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 pl-12 pr-4 text-white focus:border-teal-500 outline-none transition"
                                required
                            />
                            <RiImageAddLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl" />
                        </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-300">Excerpt / Short Description *</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="A brief summary of the blog post..."
                            className="w-full h-32 rounded-xl bg-slate-800 border border-white/10 p-4 text-white focus:border-teal-500 outline-none transition resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-300">Detailed Blog Content (HTML supported) *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your full story here..."
                            className="w-full h-64 rounded-xl bg-slate-800 border border-white/10 p-4 text-white focus:border-teal-500 outline-none transition resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white focus:border-teal-500 outline-none transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Anchor ID (for smooth scroll)</label>
                        <input
                            type="text"
                            name="anchor"
                            value={formData.anchor}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white focus:border-teal-500 outline-none transition"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Target Detail Link (e.g. /colombo)</label>
                        <input
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white focus:border-teal-500 outline-none transition"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-teal-500/20 transition disabled:opacity-50"
                >
                    {loading ? "Creating Post..." : "Publish Blog Post"}
                </button>
            </form>
        </div>
    );
}
