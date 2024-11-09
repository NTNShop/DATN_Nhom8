import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditProduct = () => {
    const { id } = useParams();  // Use useParams to get the product ID from the URL
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        brand_id: '',
        price: '',
        description: '',
        short_description: '',
        specifications: '',
        status: 'in_stock',
        images: [], // Images should be handled as files in the form
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch categories and brands
        const fetchCategoriesAndBrands = async () => {
            try {
                const categoryResponse = await axios.get('http://127.0.0.1:8000/api/v1/categories');
                const brandResponse = await axios.get('http://127.0.0.1:8000/api/v1/brands');
                setCategories(categoryResponse.data.data);
                setBrands(brandResponse.data.data);
            } catch (error) {
                console.error("Error fetching categories and brands:", error);
            }
        };

        // Fetch the product data by ID
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
                setProduct(response.data.data); // Assuming the product data is under the `data` key
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchCategoriesAndBrands();
        fetchProductData();
    }, [id]);  // Add `id` as a dependency to re-fetch when the product ID changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProduct((prevState) => ({
            ...prevState,
            images: e.target.files,
        }));
    };
    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setProduct((prevState) => ({
            ...prevState,
            specifications: data,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            if (key === 'images' && product[key].length > 0) {
                Array.from(product[key]).forEach((file) => {
                    formData.append('images[]', file);
                });
            } else {
                formData.append(key, product[key]);
            }
        });

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Cập nhật sản phẩm thành công');
            // Optionally redirect or reset form
        } catch (error) {
            if (error.response) {
                console.error("Dữ liệu lỗi phản hồi:", error.response.data);
                alert("Không thể cập nhật sản phẩm. Vui lòng kiểm tra lại form và thử lại.");
            } else {
                console.error("Lỗi:", error.message);
                alert("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!product.name) errors.name = "Name is required";
        if (!product.category_id) errors.category_id = "Category is required";
        if (!product.price) errors.price = "Price is required";
        if (!product.short_description) errors.short_description = "Short description is required";
        if (!product.description) errors.description = "Description is required";
        return errors;
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
                                        <li className="breadcrumb-item"><a href="#">Danh sách sản phẩm</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Sửa sản phẩm</li>
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
                                <h4 className="card-title">Chỉnh sửa sản phẩm</h4>
                                <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Tên sản phẩm</label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="name"
                                                value={product.name}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            />
                                            {errors.name && <span className="text-danger">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Danh mục</label>
                                        <div className="col-md-12">
                                            <select
                                                name="category_id"
                                                value={product.category_id}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            >
                                                <option value="">Chọn danh mục</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && <span className="text-danger">{errors.category_id}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Thương hiệu</label>
                                        <div className="col-md-12">
                                            <select
                                                name="brand_id"
                                                value={product.brand_id}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            >
                                                <option value="">Chọn thương hiệu</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.brand_id && <span className="text-danger">{errors.brand_id}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Hình ảnh</label>
                                        <div className="col-md-12">
                                            <input
                                                type="file"
                                                name="images"
                                                onChange={handleFileChange}
                                                multiple
                                                className="form-control-line border-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Giá</label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="price"
                                                value={product.price}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Mô tả ngắn</label>
                                        <div className="col-md-12">
                                            <textarea
                                                name="short_description"
                                                value={product.short_description}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            />
                                            {errors.short_description && <span className="text-danger">{errors.short_description}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Mô tả</label>
                                        <div className="col-md-12">
                                            <textarea
                                                name="description"
                                                value={product.description}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            />
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>
                                    </div>
                                    

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Trạng thái</label>
                                        <div className="col-md-12">
                                            <select
                                                name="status"
                                                value={product.status}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            >
                                                <option value="in_stock">Còn hàng</option>
                                                <option value="out_of_stock">Hết hàng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Thông số kỹ thuật</label>
                                        <div className="col-md-12">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={product.specifications}  // Đưa dữ liệu vào CKEditor
                                                onChange={handleCKEditorChange}  // Cập nhật dữ liệu khi thay đổi
                                            />
                                            {errors.specifications && <span className="text-danger">{errors.specifications}</span>}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProduct;
