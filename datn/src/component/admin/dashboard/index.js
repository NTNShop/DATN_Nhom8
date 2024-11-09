import React from 'react';
import Header from '../layouts/header';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
  const data = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Bán hàng',
        data: [65, 59, 80, 81, 56, 55, 40, 50, 30, 37, 80, 95],
        backgroundColor: [
          'Cyan',

        ],
        borderColor: [
          'darkblue',

        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData = {
    labels: ['Xe số', 'Xe tay côn', 'Xe tay ga'],
    datasets: [
      {
        label: 'Doanh số bán xe',
        data: [300, 50, 150], 
        backgroundColor: [
          'blue',  
          'yellow', 
          'cyan',   
        ],
        borderColor: [
          'darkblue',    
          'darkcyan',    
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh số bán xe theo loại',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const data = tooltipItem.dataset.data;
            const total = data.reduce((acc, curr) => acc + curr, 0);
            const currentValue = data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2); 
            return `${tooltipItem.label}: ${percentage}%`; 
          },
        },
      },
    },
  };
  const statistics = {
    totalCategories: 10, 
    totalProducts: 150,  
    totalOrders: 150,     
    totalComments: 50,   
  };
  const previous_period = {
    totalCategories: 7, 
    totalProducts: 90,  
    totalOrders: 90,     
    totalComments: 25,   
  };
  

  return (
    <div>
      {/* Start Page Content */}
      <Header />
      <div className="page-wrapper" style={{ position: 'relative', left: '241px' }}>
        <div className="page-breadcrumb">
          <div className="row align-items-center">
            <div className="col-md-6 col-8 align-self-center">
              <h3 className="page-title mb-0 p-0">Thống kê</h3>
              <div className="d-flex align-items-center">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Thống kê</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-fluid">
          {/* ================== */}
          <div className="row">
      <div className="col-sm-10">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Tổng quan</h4>
            {/* Hiển thị thống kê */}
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="card text-white bg-info mb-3">
                  <div className="card-body">
                  <div className="card-title">Tổng số danh mục</div>
                    <h5 className="card-title fs-1">{statistics.totalCategories}</h5>
                    <h5 className="card-title fs-6">Kỳ trước: {previous_period.totalCategories}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
              <div className="card text-white  mb-3" style={{ backgroundColor: '#33CC99' }}>
                  <div className="card-body">
                  <div className="card-title">Tổng số sản phẩm</div>
                  <h5 className="card-title fs-1">{statistics.totalProducts}</h5>
                  <h5 className="card-title fs-6">Kỳ trước: {previous_period.totalProducts}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white mb-3" style={{ backgroundColor: '#FF9933' }}>
                  <div className="card-body">
                  <div className="card-title">Tổng số đơn hàng</div>
                  <h5 className="card-title fs-1">{statistics.totalOrders}</h5>
                  <h5 className="card-title fs-6">Kỳ trước: {previous_period.totalOrders}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-white mb-3" style={{ backgroundColor: '#9966CC' }}>
                  <div className="card-body">
                  <div className="card-title">Tổng số bình luận</div>
                  <h5 className="card-title fs-1">{statistics.totalComments}</h5>
                  <h5 className="card-title fs-6">Kỳ trước: {previous_period.totalComments}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          {/* ================== */}
          <div className="row">
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex flex-wrap align-items-center">
                        <div>
                          <h3 className="card-title">Doanh số bán hàng</h3>
                          <h6 className="card-subtitle">Trong năm nay</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="chart-container" style={{ height: '360px' }}>
                        <Bar data={data} options={options} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex flex-wrap align-items-center">
                        <div>
                          <h3 className="card-title">Doanh số đặt hàng</h3>
                          <h6 className="card-subtitle">Trong năm nay</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="chart-container" style={{ height: '360px' }}>
                        <Pie data={pieData} options={pieOptions} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <hr className="mt-0 mb-0"/>
                </div>
                <div className="card-body text-center ">
                  <ul className="list-inline d-flex justify-content-center align-items-center mb-0">
                    <li className="me-4">
                      <h6 className=""><i className="fa fa-circle font-10 me-2 " style={{color : 'blue'}}></i>Xe số</h6>
                    </li>
                    <li className="me-4">
                      <h6 className=""><i className="fa fa-circle font-10 me-2 " style={{color : 'yellow'}}></i>Xe tay côn</h6>
                    </li>
                    <li className="me-4">
                      <h6 className=""><i className="fa fa-circle font-10 me-2" style={{color : 'cyan'}}></i>Xe tay ga</h6>
                    </li>
                    </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <footer className="footer text-center"> © Design by <a href="#">Nhóm 8</a></footer>
      </div>
    </div>
  );
};

export default Dashboard;
