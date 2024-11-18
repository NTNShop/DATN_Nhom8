import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { getUsers, deleteUser } from "../../../services/admin/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload, FaTrashAlt } from "react-icons/fa";

import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [showStatus, setShowStatus] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data); // Thiết lập người dùng cho bộ lọc ban đầu
      } catch (error) {
        setError("Không thể tải danh sách người dùng.");
        console.error("Failed to load users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle Search Functionality (Chỉ tìm kiếm theo full_name)
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.full_name &&
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      try {
        await deleteUser(userId);
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        toast.success("Xóa người dùng thành công!");
      } catch (error) {
        console.error("Error deleting user:", error);
        setError("Không thể xóa người dùng.");
        toast.error("Xóa người dùng thất bại!");
      }
    }
  };

  const handleViewDetails = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách người dùng");
    XLSX.writeFile(workbook, "DanhSachNguoiDung.xlsx");
  };

  const filterUsersByStatus = (status) => {
    setSelectedStatus(status);
    if (status === "Tất cả") {
      setFilteredUsers(users);
    } else {
      const isActive = status === "Hoạt động";
      setFilteredUsers(
        users.filter((user) => (user.status === 1) === isActive)
      );
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Header />
      <div
        className="page-wrapper"
        style={{ position: "relative", left: "241px" }}
      >
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Trang chủ</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Danh sách người dùng
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-primary">
                    Danh sách người dùng
                  </h4>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <button
                      onClick={handleDownloadExcel}
                      className="btn btn-success d-flex align-items-center"
                    >
                      <FaDownload className="me-2" /> Tải về
                    </button>
                    <div />
                    {/* Tìm kiếm */}
                    <div className="de-search text-start">
                      <p className="sl-box-title">Từ khóa</p>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập tên người dùng"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="input-group-text bg-primary text-white">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                    </div>

                    {/* Chọn trạng thái */}
                    <div className="d-flex justify-content-start gap-4 mb-3">
                      <div className="position-relative w-100">
                        {/* Trạng thái hoạt động label and filter icon */}
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2 text-secondary">
                            Trạng thái hoạt động
                          </span>
                        </div>

                        {/* Input field with chevron icon */}
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            value={selectedStatus}
                            onClick={() => setShowStatus(!showStatus)}
                            readOnly
                            style={{ cursor: "pointer" }}
                            placeholder="Chọn trạng thái"
                          />
                          <span
                            className={`input-group-text ${
                              showStatus ? "bi-chevron-up" : "bi-chevron-down"
                            } text-secondary`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowStatus(!showStatus)}
                          ></span>
                        </div>

                        {/* Dropdown list */}
                        {showStatus && (
                          <ul
                            className="dropdown-menu show mt-2 position-absolute w-100"
                            style={{ zIndex: 1050 }} // Ensures it appears on top
                          >
                            {["Tất cả", "Hoạt động", "Không hoạt động"].map(
                              (status) => (
                                <li
                                  key={status}
                                  className="dropdown-item text-center p-2"
                                  onClick={() => {
                                    filterUsersByStatus(status);
                                    setShowStatus(false);
                                  }}
                                >
                                  {status}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="table-responsive">
                    <table className="table table-bordered mt-2">
                      <thead>
                        <tr className="table-light">
                          <th className="border-top-0">ID</th>
                          <th className="border-top-0">Họ và tên</th>
                          <th className="border-top-0">Avatar</th> 
                          <th className="border-top-0">Email</th>
                          <th className="border-top-0">Số điện thoại</th>
                          <th className="border-top-0">Địa chỉ</th>
                          <th className="border-top-0">Vai Trò</th>
                          <th className="border-top-0">Trạng thái</th>
                          <th className="border-top-0">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentUsers.length > 0 ? (
                          currentUsers.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.full_name}</td>
                              <td>
                                <img
                                  src={user.avatar || "default-avatar-url"} 
                                  alt={user.full_name}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              <td>{user.address}</td>
                              <td>{user.role}</td>
                              <td
                                className={`text-center ${
                                  user.status === 1 ? "" : ""
                                }`}
                              >
                                <span
                                  className={`status-dot ${
                                    user.status === 1
                                      ? "dot-success"
                                      : "dot-danger"
                                  }`}
                                ></span>
                                {user.status === 1
                                  ? "Hoạt động"
                                  : "Không hoạt động"}
                              </td>

                              {/* Avatar Image */}
                             

                              {/* Action Button */}
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(user.id)}
                                >
                                  <FaTrashAlt />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              Không có người dùng nào
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination */}
                  <div className="d-flex justify-content-center">
                    <ul className="pagination">
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            number === currentPage ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => paginate(number)}
                            className="page-link"
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ListUser;
