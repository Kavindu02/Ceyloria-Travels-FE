import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RiArticleLine, RiImageAddLine, RiArrowLeftLine, RiSaveLine } from "react-icons/ri";

export default function UpdateBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "",
        author: "",
        anchor: "",
        link: "",
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + `/blogs/${id}`);
                setFormData(res.data);
            } catch (err) {
                console.error("Error fetching blog:", err);
                toast.error("Failed to load blog data");
                navigate("/admin/blogs");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const token = localStorage.getItem("token");
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/blogs/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Blog updated successfully!");
            navigate("/admin/blogs");
        } catch (err) {
            console.error("Error updating blog:", err);
            toast.error("Failed to update blog");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-10 text-white text-center">Loading blog data...</div>;

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
                    <h1 className="text-3xl font-bold text-white">Update Blog</h1>
                    <p className="text-slate-400">Edit your travel journal entry</p>
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
                            className="w-full h-24 rounded-xl bg-slate-800 border border-white/10 p-4 text-white focus:border-teal-500 outline-none transition resize-none"
                            required
                        ></textarea>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-300">Detailed Blog Content (HTML supported) *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
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
                        <label className="text-sm font-semibold text-slate-300">Anchor ID</label>
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
                        <label className="text-sm font-semibold text-slate-300">Target Detail Link</label>
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
                    disabled={updating}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    <RiSaveLine className="text-xl" />
                    {updating ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
