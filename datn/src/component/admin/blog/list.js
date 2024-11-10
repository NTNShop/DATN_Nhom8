import React, { useEffect, useState } from "react";
import { getPosts } from "../../../services/posts"; // Đảm bảo đúng đường dẫn tới service của bạn
import { Link } from "react-router-dom"; 
import Header from "../../../component/client/home/header";
import Footer from "../../../component/client/home/footer";
import Cart from "../../../assets/img/cart/cart.png";
import Cart1 from "../../../assets/img/cart/cart1.png";
import banner from "../../../assets/img/hero/banner2.jpg";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts();
      setPosts(result.posts);
      setPagination(result.pagination);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>BÀI VIẾT</h2>
                <div className="breadcrumb__option">
                  <a href="./index.html">TRANG CHỦ</a>
                  <span>BÀI VIẾT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="blog spad text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="blog__sidebar">
                <div className="blog__sidebar__item">
                  <h4>Tin tức xe máy gần đây</h4>
                  <div className="blog__sidebar__recent">
                    {/* Danh sách bài viết mới */}
                    {posts.slice(0, 3).map((post) => (
                      <a href="#" className="blog__sidebar__recent__item" key={post.id}>
                        <div className="blog__sidebar__recent__item__pic">
                          <img src={Cart1} width={100} alt="thumbnail" />
                        </div>
                        <div className="blog__sidebar__recent__item__text">
                          <h6>{post.title}</h6>
                          <span>{post.created_at}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="row">
                {/* Hiển thị các bài viết */}
                {loading ? (
                  <p>Đang tải bài viết...</p>
                ) : (
                  posts.map((post) => (
<div className="col-lg-6 col-md-6 col-sm-6" key={post.id}>
                      <div className="blog__item">
                        <div className="blog__item__pic">
                          <img src={Cart} alt="Post Image" />
                        </div>
                        <div className="blog__item__text">
                          <ul>
                            <li>
                              <i className="fa fa-calendar-o"></i> {new Date(post.created_at).toLocaleDateString()}
                            </li>
                            <li>
                              <i className="fa fa-comment-o"></i> 5
                            </li>
                          </ul>
                          <h5>
                            <Link to={`/blog-details/${post.id}`}>{post.title}</Link>
                          </h5>
                          <p>{post.content}</p>
                          <Link to={`/blog-details/${post.id}`} className="blog__btn">
                            ĐỌC THÊM <span className="arrow_right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {/* Pagination */}
                <div className="col-lg-12">
                  <div className="product__pagination blog__pagination">
                    {pagination.total > 1 && (
                      <>
                        {pagination.current_page > 1 && (
                          <a href={pagination.links.prev}>« Trước</a>
                        )}
                        <a href={pagination.links.first}>{pagination.current_page}</a>
                        {pagination.current_page < pagination.last_page && (
                          <a href={pagination.links.next}>Tiếp theo »</a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;