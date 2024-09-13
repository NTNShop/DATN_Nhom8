import React, { useState, useEffect } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { getProduct, deleteProduct } from "../../../services/product";

// Hàm để lấy tên hiển thị của trạng thái
const getStatusDisplayName = (status) => {
  switch (status) {
    case 1:
      return "Active";
    case 0:
      return "Inactive";
    default:
      return "Unknown";
  }
};

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5); // Number of products per page

  useEffect(() => {
    getProduct("http://localhost:3001/api", setProduct, setError); // Đảm bảo đúng URL API
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(
        id,
        (response) => {
          setSuccessMessage("Product deleted successfully");
          setError(""); // Xóa bất kỳ lỗi nào trước đó
          // Làm mới danh sách người dùng sau khi xóa thành công
          getProduct("http://localhost:3001/api", setProduct, setError); // Đảm bảo đúng URL API
        },
        (error) => {
          setSuccessMessage(""); // Xóa bất kỳ thông báo thành công nào trước đó
          setError(error);
        }
      );
    }
  };

  // Get current products
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(product.length / productPerPage);

  return (
    <div>
      <Header />
      <div class="page-wrapper">
      <div className="row ">
        <div class="col-sm-12" style={{ width: "82%", position: "relative", left: "141px"  }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh Sách Người Dùng</h4>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}
              <span>
                <a href="/admin/addProduct" className="btn btn-primary mb-3">
                  Thêm Người Dùng
                </a>
              </span>

              <div className="table-responsive">
                <table className="table product-table">
                  <thead>
                    <tr>
                      <th className="border-top-0">ID</th>
                      <th className="border-top-0">Tên</th>
                      
                      <th className="border-top-0">Giá</th>
                      <th className="border-top-0">Trạng Thái</th>
                      <th className="border-top-0">hình ảnh</th>
                      <th className="border-top-0">Mô tả</th>
                      <th className="border-top-0">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProduct.length > 0 ? (
                      currentProduct.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          
                          <td>{product.price}</td>
                          <td>{getStatusDisplayName(product.status)}</td>
                          <td><img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} /></td>
                          <td>{product.description}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <span>
                                <a
                                  href={`/admin/editProduct/${product.id}`}
                                  className="btn btn-primary"
                                >
                                  Sửa
                                </a>
                              </span>
                              <span>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(product.id)}
                                >
                                  Xóa
                                </button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">Không có người dùng nào</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button
                  className="btn btn-primary mx-3"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt; Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  className="btn btn-primary mx-3"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
              
      <Footer />
    </div>
  );
};

export default ListProduct;
