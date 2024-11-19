import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import "../../../assets/css/styleEdit.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditProduct = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]); // Thêm state để lưu ảnh hiện tại
    const [imageErrors, setImageErrors] = useState(null); // Thêm state để xử lý lỗi ảnh

    // Sửa hàm handleFileChange để validate và preview ảnh
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate files
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            setImageErrors('Chỉ chấp nhận file ảnh');
            return;
        }

        // Validate size (ví dụ: giới hạn 5MB mỗi file)
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setImageErrors('File ảnh không được vượt quá 5MB');
            return;
        }

        setImageErrors(null);
        setProduct(prev => ({
            ...prev,
            images: files
        }));

        // Preview images
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setUploadedImages(imageUrls);
    };
    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        brand_id: '',
        price: '',
        description: '',
        short_description: '',
        specifications: '',
        status: 'in_stock',
        warranty: '6',
        images: [],
        variants: []
    });
    const [currentVariant, setCurrentVariant] = useState({
        color: '',
        price: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
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

        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/products/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchCategoriesAndBrands();
        fetchProductData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleVariantChange = (e) => {
        const { name, value } = e.target;
        setCurrentVariant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateColorCode = (colorName) => {
        // Loại bỏ dấu và chuyển thành chữ thường
        const removeAccents = (str) => {
            return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D');
        };
        
        return removeAccents(colorName.toLowerCase())
            .replace(/\s+/g, '_') // Thay thế khoảng trắng bằng dấu gạch dưới
            .replace(/[^a-z0-9_]/g, ''); // Chỉ giữ lại chữ cái, số và dấu gạch dưới
    };
    

    const addVariant = () => {
        if (!currentVariant.color || !currentVariant.price) {
            alert('Vui lòng nhập đầy đủ thông tin màu sắc và giá');
            return;
        }
    
        const colorCode = generateColorCode(currentVariant.color);
    
        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, { 
                color: currentVariant.color,
                price: currentVariant.price,
                code: colorCode // Tự động tạo code
            }]
        }));
    
        setCurrentVariant({
            color: '',
            price: '',
        });
    };

    const removeVariant = (index) => {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
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
    
    
        formData.append('price', parseFloat(product.price));
        formData.append('category_id', parseInt(product.category_id));
        formData.append('brand_id', parseInt(product.brand_id));
        formData.append('warranty', parseInt(product.warranty));
        formData.append('status', product.status);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('short_description', product.short_description);
        formData.append('specifications', product.specifications);
    
        // Xử lý variants
        product.variants.forEach((variant, index) => {
            formData.append(`variants[${index}][color]`, variant.color);
            formData.append(`variants[${index}][price]`, parseFloat(variant.price));
            formData.append(`variants[${index}][code]`, variant.code); // Code đã được tạo tự động
        });
    
        // Xử lý images
        if (product.images && product.images.length > 0) {
            Array.from(product.images).forEach(file => {
                formData.append('images[]', file);
            });
        }
    
        formData.append('_method', 'PUT');
    
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/products/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                }
            );
    
            if (response.data.status === 'success') {
                alert('Cập nhật sản phẩm thành công');
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Có lỗi xảy ra: " + (error.response?.data?.message || "Lỗi không xác định"));
        }
    };


    const validateForm = () => {
        const errors = {};
        if (!product.name) errors.name = "Tên sản phẩm là bắt buộc";
        if (!product.category_id) errors.category_id = "Danh mục là bắt buộc";
        if (!product.brand_id) errors.brand_id = "Thương hiệu là bắt buộc";
        if (!product.price || isNaN(product.price) || Number(product.price) <= 0) {
            errors.price = "Giá sản phẩm phải là số dương";
        }
        if (!product.short_description) errors.short_description = "Mô tả ngắn là bắt buộc";
        if (!product.description) errors.description = "Mô tả là bắt buộc";
        if (product.variants.length === 0) errors.variants = "Cần ít nhất một biến thể màu sắc";
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
                        accept="image/*"
                        className="form-control-line border-input"
                    />
                    {imageErrors && <span className="text-danger">{imageErrors}</span>}
                    
                    {/* Preview ảnh */}
                    <div className="image-preview mt-2 d-flex flex-wrap gap-2">
                        {uploadedImages.map((url, index) => (
                            <div key={index} className="position-relative" style={{width: '100px', height: '100px'}}>
                                <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
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
                                            {errors.variants && <span className="text-danger">{errors.variants}</span>}
                                        </div>
                                    </div>

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
                                                data={product.specifications}
                                                onChange={handleCKEditorChange}
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