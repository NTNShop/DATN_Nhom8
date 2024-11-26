import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Điều hướng về trang trước
    };
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        brand_id: '',
        price: '',
        stock: '',
        description: '',
        short_description: '',
        specifications: '',
        status: 'in_stock',
        is_featured: 0,
        warranty: '6',
        images: [],
        variants: [],

    });
    // Thêm state để quản lý variant đang nhập
    const [currentVariant, setCurrentVariant] = useState({
        color: '',
        price: '',
        code: ''
    });
    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        setCurrentVariant(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const addVariant = () => {
        if (!currentVariant.color || !currentVariant.price) {
            alert('Vui lòng nhập đầy đủ thông tin màu sắc và giá');
            return;
        }

        // Tạo mã code ngẫu nhiên cho variant
        const variantCode = Math.random().toString(36).substring(2, 10).toUpperCase();

        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, { ...currentVariant, code: variantCode }]
        }));

        // Reset form variant
        setCurrentVariant({
            color: '',
            price: '',
            code: ''
        });
    };
    const removeVariant = (index) => {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }));
    };
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch categories and brands for select dropdowns
        const fetchCategoriesAndBrands = async () => {
            try {
                const categoryResponse = await axios.get('http://127.0.0.1:8000/api/v1/categories');
                const brandResponse = await axios.get('http://127.0.0.1:8000/api/v1/brands');

                // Lọc dữ liệu có status === 1
                const filteredCategories = categoryResponse.data.data.filter(item => item.status === 1);
                const filteredBrands = brandResponse.data.data.filter(item => item.status === 1);

                setCategories(filteredCategories);
                setBrands(filteredBrands);
            } catch (error) {
                console.error("Error fetching categories and brands:", error);
            }
};
fetchCategoriesAndBrands();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setProduct(prevState => ({
            ...prevState,
            specifications: data, // Cập nhật trường specifications khi CKEditor thay đổi
        }));
    };

    const handleFileChange = (e) => {
        setProduct(prevState => ({
            ...prevState,
            images: e.target.files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }


        try {
            const formData = new FormData();

            // Append basic product data
            Object.keys(product).forEach(key => {
                if (key === 'images') {
                    if (product.images.length > 0) {
                        Array.from(product.images).forEach(file => {
                            formData.append('images[]', file);
                        });
                    }
                } else if (key === 'variants') {
                    // Convert variants array to JSON string
                    formData.append('variants', JSON.stringify(product.variants));
                } else {
                    formData.append(key, product[key]);

                }


            });
            // console.log("FormData:", Array.from(formData.entries()));


            const response = await axios.post('http://127.0.0.1:8000/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.status === 'success') {
                alert('Thêm sản phẩm thành công');
                // Reset form or redirect
            }
        } catch (error) {
            console.error("Error response:", error.response?.data);
            alert(error.response?.data?.message || "Có lỗi xảy ra khi thêm sản phẩm");
        }
    };



    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!product.name) errors.name = "Tên sản phẩm là bắt buộc";
        if (!product.category_id) errors.category_id = "Danh mục là bắt buộc";
        if (!product.brand_id) errors.brand_id = "Thương hiệu là bắt buộc";
        if (!product.price) errors.price = "Giá là bắt buộc";
        if (!product.description) errors.description = "Mô tả là bắt buộc";
        if (!product.images || product.images.length === 0) errors.images = "Ảnh là bắt buộc";
        if (!product.stock) {
            errors.stock = "Số lượng là bắt buộc";
} else if (isNaN(product.stock) || product.stock < 0) {
errors.stock = "Số lượng phải là số không âm";
        }

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
                                        <li className="breadcrumb-item active" aria-current="page">Thêm sản phẩm</li>
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
                                <h4 className="card-title">Thêm sản phẩm</h4>

                                <form className="form-horizontal form-material mx-2" onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Tên sản phẩm</label>
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                name="name"
                                                value={product.name}
                                                onChange={handleInputChange}
                                                placeholder="Nhập tên sản phẩm"
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
                                                className="form-control-line border-input"
                                                name="images"
                                                onChange={handleFileChange}
                                                multiple
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
                                                placeholder="Nhập giá sản phẩm"
                                                className="form-control-line border-input"
                                            />
                                            {errors.price && <span className="text-danger">{errors.price}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="col-md-12 mb-0">số lượng</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name="stock"
                                            value={product.stock}
                                            onChange={handleInputChange}
                                            min="0"
                                            className="form-control-line border-input"

                                        />
                                        {errors.stock && <span className="error">{errors.stock}</span>}
                                    </div>


                                    {/* Phần thêm variant màu sắc */}
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Thêm biến thể màu sắc</label>
                                        <div className="col-md-12">
                                            <div className="d-flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    name="color"
                                                    value={currentVariant.color}
                                                    onChange={handleVariantChange}
                                                    placeholder="Nhập màu sắc"
                                                    className="form-control"
                                                />
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={currentVariant.price}
onChange={handleVariantChange}
                                                    placeholder="Nhập giá"
className="form-control"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addVariant}
                                                    className="btn btn-primary"
                                                >
                                                    Thêm màu
                                                </button>
                                            </div>

                                            {/* Hiển thị danh sách variants */}
                                            <div className="variants-list mt-2">
                                                {product.variants.map((variant, index) => (
                                                    <div key={index} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                                                        <span className='text-dark'>
                                                            Màu: {variant.color} - Giá: {Number(variant.price).toLocaleString()} VNĐ
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removeVariant(index)}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Mô tả ngắn</label>
                                        <div className="col-md-12">
                                            <textarea
                                                rows="1"
                                                name="short_description"
                                                value={product.short_description}
                                                onChange={handleInputChange}
                                                placeholder="Nhập mô tả ngắn"
                                                className="form-control-line border-input"
                                            />
{errors.short_description && <span className="text-danger">{errors.short_description}</span>}
                                        </div>
</div>

                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Mô tả</label>
                                        <div className="col-md-12">
                                            <textarea
                                                rows="3"
                                                name="description"
                                                value={product.description}
                                                onChange={handleInputChange}
                                                placeholder="Nhập mô tả"
                                                className="form-control-line border-input"
                                            />
                                            {errors.description && <span className="text-danger">{errors.description}</span>}
                                        </div>
                                    </div>
                                    {/* Trường warranty */}
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Thời gian bảo hành</label>
                                        <div className="col-md-12">
                                            <select
                                                name="warranty"
                                                value={product.warranty}
                                                onChange={handleInputChange}
                                                className="form-control"
                                            >
                                                <option value="6">6 tháng</option>
                                                <option value="12">12 tháng</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* Trường specifications với CKEditor */}
                                    <div className="form-group mb-3">
                                        <label className="col-md-12 mb-0">Thông số kỹ thuật</label>
                                        <div className="col-md-12">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={product.specifications}
                                                onChange={handleEditorChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
<label className="col-md-12 mb-0">Trạng Thái</label>
                                        <div className="col-md-12">
                                            <select
name="status"
                                                value={product.status}
                                                onChange={handleInputChange}
                                                className="form-control-line border-input"
                                            >
                                                <option value="in_stock">In Stock</option>
                                                <option value="out_of_stock">Out of Stock</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-12 d-flex">
                                            <button className="btn btn-success mx-auto mx-md-0 text-white" type="submit">
                                                Thêm sản phẩm
                                            </button>
                                            <button
                                                className="btn btn-secondary  mx-auto mx-md-0 text-white"
                                                type="button"
                                                onClick={handleGoBack}
                                            >
                                                Trở về
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;