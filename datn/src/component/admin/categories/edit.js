import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        status: '',
        parent_id: null,
        image_url: null,
    });
    const [categories, setCategories] = useState([]); // Danh sách các danh mục cha
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Lấy danh mục chi tiết
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

    // Lấy danh sách các danh mục cha
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/categories");
                if (!response.ok) {
                    throw new Error("Error fetching categories");
                }
                const data = await response.json();
    
                // Kiểm tra cấu trúc dữ liệu trả về
                console.log("Fetched categories:", data);
    
                // Nếu API trả về `data` là một đối tượng chứa mảng danh mục
                if (Array.isArray(data)) {
                    setCategories(data); // Dữ liệu trả về là mảng
                } else if (data && Array.isArray(data.data)) {
                    setCategories(data.data); // Trường hợp dữ liệu nằm trong `data.data`
                } else {
                    throw new Error("Invalid categories data format");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setError("Could not load parent categories. Please try again later.");
            }
        };
    
        fetchCategories();
    }, []);
    

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

        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('slug', category.slug);
        formData.append('status', category.status);
        formData.append('parent_id', category.parent_id || '');
        formData.append('_method', 'PUT'); // Add this to specify a PUT method for Laravel

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/categories/${id}`, {
                method: 'POST', // Kiểm tra xem API yêu cầu method 'POST' hay 'PUT'
                body: formData,
            });
        
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || "Có lỗi xảy ra khi cập nhật danh mục.");
            }
        
            toast.success('Cập nhật danh mục thành công!');
            setTimeout(() => {
                navigate('/admin/category'); // Điều hướng sau 2 giây
            }, 2000);
        } catch (error) {
            console.error("Error updating category:", error);
        
            // Hiển thị lỗi bằng toast
            toast.error(error.message || "Không thể cập nhật danh mục. Vui lòng thử lại.");
        }
        
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
                                                <select
                                                    name="parent_id"
                                                    value={category.parent_id || ''}
                                                    onChange={handleChange}
                                                    className="form-control-line border-input"
                                                >
                                                    <option value="">Chọn danh mục cha</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name}
</option>
                                                    ))}
                                                </select>
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
                                 <ToastContainer />
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