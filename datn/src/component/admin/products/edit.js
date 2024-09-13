import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../layouts/header";
import Footer from "../layouts/footer";

import { getProductById, updateProduct } from '../../../services/product';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      getProductById(id, (productData) => {
        if (productData) {
          setProduct(productData);
          setName(productData.name);
          setPrice(productData.price);
         
          setDescription(productData.description);
          setImage(productData.image);
          setStatus(productData.status);
          setLoading(false);
        } else {
          setError('Sản phẩm không tồn tại');
          setLoading(false);
        }
      }, (error) => {
        setError(error);
        setLoading(false);
      });
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = { name, price, description, image, status };

    updateProduct(id, updatedProduct, (response) => {
      setSuccessMessage('Sản phẩm đã được cập nhật thành công');
      setError('');
      navigate('/admin/product');
    }, (error) => {
      setSuccessMessage('');
      setError(error);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="row">
        <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Chỉnh Sửa Sản Phẩm</h4>

              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Tên Sản Phẩm</label>
                  <input
                    type="text"
                    className="form-control-line border-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Giá</label>
                  <input
                    type="number"
                    className="form-control-line border-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Mô Tả</label>
                  <textarea
                    className="form-control-line border-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Hình Ảnh</label>
                  <input
                    type="text"
                    className="form-control-line border-input"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="col-md-12 mb-0">Trạng Thái</label>
                  <select
                    className="form-control-line border-input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Cập Nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProduct;
                            