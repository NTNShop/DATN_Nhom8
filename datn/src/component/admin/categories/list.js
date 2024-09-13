import React, { useState, useEffect } from 'react';
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { getCategories, deleteCategory } from '../../../services/categories';

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5); // Số lượng danh mục mỗi trang

  useEffect(() => {
    const fetchCategories = () => {
      getCategories('http://localhost:3001/api', setCategories, setError);
    };

    fetchCategories();
  }, []);


  // Tính toán các danh mục hiển thị cho trang hiện tại
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Tính tổng số trang
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div className="">
      {/* <!-- Bắt đầu nội dung trang --> */}
      <Header />

      <div className="row">
        <div className="col-sm-11" style={{ position: "relative", left: "241px" }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Danh Sách Danh Mục</h4>
              <span><a href='/admin/addCategory' className="btn btn-primary mb-3">Thêm Danh Mục</a></span>

              <div className="table-responsive">
                <table className="table user-table">
                  <thead>
                    <tr>
                      <th className="border-top-0">ID</th>
                      <th className="border-top-0">Tên danh mục</th>
                      <th className="border-top-0">Trạng Thái</th>
                      <th className="border-top-0">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.length > 0 ? (
                      currentCategories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td>
                          <td>
                            <span 
                              className={`badge mb-2 mt-2 ${
                                category.status === 1 ? 'bg-success ' : 'bg-danger'
                              }`}
                            >
                              {category.status === 1 ? 'Đang hoạt động' : 'Không hoạt động'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <span><a href={`/admin/editCategory/${category.id}`} className="btn btn-primary">Sửa</a></span>
                              <span>
                               
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">Không có danh mục nào</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="pagination ">
                <button 
                  className="btn btn-primary mx-3" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt; Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                  className="btn btn-primary mx-3" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next &gt;
                </button>
              </div>

              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Kết thúc nội dung trang */}
      <Footer />
    </div>
  );
};

export default ListCategory;
