import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { getUsers, deleteUser } from "../../../services/admin/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        // Sắp xếp danh sách theo thứ tự giảm dần của ID
        const sortedData = data.sort((a, b) => b.id - a.id);
        setUsers(sortedData);
        setFilteredUsers(sortedData); // Thiết lập danh sách ban đầu
      } catch (error) {
        setError("Không thể tải danh sách người dùng.");
        console.error("Failed to load users:", error);
      }
    };
    fetchUsers();
  }, []);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' hoặc 'desc'

  // Hàm sắp xếp
  const handleSort = (field) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
    setFilteredUsers(sortedUsers);
  };
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
                      <p className="sl-box-title">Số điện thoại</p>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="input-group-text bg-primary text-white">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-start gap-4 mb-3">
                      <div className="position-relative w-100">
                        <div className="d-flex align-items-center mb-2">
                          <span className="me-2 text-secondary">
                            Trạng thái hoạt động
                          </span>
                        </div>
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

                        {showStatus && (
                          <ul
                            className="dropdown-menu show mt-2 position-absolute w-100"
                            style={{ zIndex: 1050 }}
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
                          <th
                            className="border-top-0 font-weight-bold"
                            onClick={() => handleSort("id")}
                            style={{ cursor: "pointer" }}
                          >
                            #
                            {sortField === "id" && (
                              <i
                                className={`ms-2 bi ${
                                  sortOrder === "asc"
                                    ? "bi-sort-up"
                                    : "bi-sort-down"
                                }`}
                              ></i>
                            )}
                          </th>

                          <th className="border-top-0 font-weight-bold">
                            Họ và tên
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Avatar
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Email
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Số điện thoại
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Địa chỉ
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Vai Trò
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Trạng thái
                          </th>
                          <th className="border-top-0 font-weight-bold">
                            Thao tác
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentUsers.length > 0 ? (
                          currentUsers.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>
                                <div
                                  className="text-ellipsis"
                                  title={user.full_name}
                                >
                                  {user.full_name}
                                </div>
                              </td>
                              <td>
                                <div>
                                  
                                <img
                                  src={
                                    `http://127.0.0.1:8000${user.avatar}` ||
                                    "default-avatar-url"
                                  }
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                  }}
                                />
                                </div>
                              </td>
                              <td>
                                <div
                                  className="text-ellipsis"
                                  title={user.email}
                                >
                                  {user.email}
                                </div>
                              </td>

                              <td>{user.phone}</td>
                              <td>
                                <div
                                  className="text-ellipsis"
                                  title={user.address}
                                >
                                  {user.address}
                                </div>
                              </td>

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

                              <td>
                                <Link
                                  to={`/users/${user.id}`}
                                  className="btn btn-outline-dark mx-1"
                                >
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/admin/editUser/${user.id}`}
                                  className="btn btn-outline-dark "
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                  className="btn btn-outline-dark mx-1"
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
