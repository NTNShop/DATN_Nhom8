    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate, Link } from 'react-router-dom';
    import Header from "../layouts/header";
    import Footer from "../layouts/footer";
    import "../../../assets/css/styleEdit.css";

    const EditCategory = () => {
        const { id } = useParams();
        const navigate = useNavigate();
        const [category, setCategory] = useState({
            name: '',
            slug: '',
            status: '',
            parent_id: null,
            image_url: null,
        });
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [selectedImage, setSelectedImage] = useState(null);

        // Fetch category data on load
        useEffect(() => {
            const fetchCategory = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/categories/${id}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching category: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    setCategory(data);
                } catch (error) {
                    console.error("Error fetching category data:", error);
                    setError("Could not load category data. Please try again later.");
                } finally {
                    setLoading(false);
                }
            };

            fetchCategory();
        }, [id]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCategory((prevCategory) => ({
                ...prevCategory,
                [name]: value
            }));
        };

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            setSelectedImage(file);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            // Tạo dữ liệu x-www-form-urlencoded
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append('name', category.name);
            urlEncodedData.append('slug', category.slug);
            urlEncodedData.append('status', category.status);
            urlEncodedData.append('parent_id', category.parent_id);

            // Nếu có ảnh mới được chọn, xử lý upload riêng biệt và gửi URL ảnh
            if (selectedImage) {
                const imageUrl = await uploadImage(selectedImage); // Giả sử bạn có một hàm upload hình ảnh riêng biệt
                urlEncodedData.append('image_url', imageUrl);
            } else {
                urlEncodedData.append('image_url', category.image_url); // Gửi URL ảnh cũ nếu không có ảnh mới
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/categories/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Đặt content type là x-www-form-urlencoded
                    },
                    body: urlEncodedData.toString(), // Chuyển dữ liệu thành chuỗi URL-encoded
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || "Failed to update category.");
                }

                navigate("/admin/category");
            } catch (error) {
                console.error("Error updating category:", error);
                setError("Could not update category. Please check your input and try again.");
            }
        };

        // Hàm upload ảnh (giả sử bạn đã có hàm này hoặc sử dụng Firebase, Cloudinary, v.v.)
        const uploadImage = async (imageFile) => {
            // Giả sử bạn upload hình ảnh và nhận URL ảnh trả về
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch('http://127.0.0.1:8000/api/v1/categories', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            return data.url; // Giả sử API trả về URL của ảnh
        };

        return (
            <div>
                <Header />
                <div className="page-wrapper" style={{ position: "relative", left: "241px" }}>
                    <div className="page-breadcrumb">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-8 align-self-center">
                                <div className="d-flex align-items-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/admin/category">Danh sách danh mục</Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">Sửa danh mục</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="col-sm-10">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Sửa danh mục</h4>
                                    {error && <p className="text-danger">{error}</p>}
                                    {loading ? (
                                        <p>Đang tải...</p>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="form-horizontal form-material mx-2">
                                            <div className="form-group mb-3">
                                                <label className="col-md-12 mb-0">Tên danh mục</label>
                                                <div className="col-md-12">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={category.name}
                                                        onChange={handleChange}
                                                        className="form-control-line border-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="col-md-12 mb-0">Slug</label>
                                                <div className="col-md-12">
                                                    <input
                                                        type="text"
                                                        name="slug"
                                                        value={category.slug}
                                                        onChange={handleChange}
                                                        className="form-control-line border-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="col-md-12 mb-0">Trạng Thái</label>
                                                <div className="col-md-12">
                                                    <select
                                                        name="status"
                                                        value={category.status}
                                                        onChange={handleChange}
                                                        className="form-control-line border-input"
                                                        required
                                                    >
                                                        <option value="">Chọn trạng thái</option>
                                                        <option value="1">Kích hoạt</option>
                                                        <option value="0">Không kích hoạt</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="col-md-12 mb-0">Danh mục cha</label>
                                                <div className="col-md-12">
                                                    <input
                                                        type="text"
                                                        name="parent_id"
                                                        value={category.parent_id || ''}
                                                        onChange={handleChange}
                                                        className="form-control-line border-input"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="col-md-12 mb-0">Hình ảnh</label>
                                                <div className="col-md-12">
                                                    {category.image_url && (
                                                        <img 
                                                            src={`http://127.0.0.1:8000${category.image_url}`} 
                                                            alt="Category" 
                                                            style={{ maxWidth: "100px", marginBottom: "10px" }} 
                                                        />
                                                    )}
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        onChange={handleImageChange}
                                                        className="form-control-line border-input"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-sm-12 d-flex">
                                                    <button type="submit" className="btn btn-success mx-auto mx-md-0 text-white">
                                                        Cập nhật
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };

    export default EditCategory;
