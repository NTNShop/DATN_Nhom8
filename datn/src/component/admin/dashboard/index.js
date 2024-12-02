import React, { useEffect, useState } from 'react';
import Header from '../layouts/header';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const Dashboard = () => {
  // State to store daily sales data
  const [dailySales, setDailySales] = useState([]);

  // Fetching daily sales data from API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/auth/orders/daily-sales')
      .then((response) => {
        setDailySales(response.data); // Adjust based on API response structure
      })
      .catch((error) => {
        console.error('Error fetching daily sales data:', error);
      });
  }, []);

  // Extract sales data for the chart
  const chartLabels = dailySales.map((sale) => sale.date);
  const chartData = dailySales.map((sale) => sale.sales);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Doanh số bán hàng',
        data: chartData,
        backgroundColor: 'Cyan',
        borderColor: 'darkblue',
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
        backgroundColor: ['blue', 'yellow', 'cyan'],
        borderColor: ['darkblue', 'darkcyan'],
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

  // Sample statistics for the dashboard
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
          <div className="row">
            <div className="col-sm-10">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Tổng quan</h4>
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
                      <div className="card text-white mb-3" style={{ backgroundColor: '#33CC99' }}>
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

          <div className="row">
            <div className="col-lg-7">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Doanh số bán hàng</h3>
                  <h6 className="card-subtitle">Trong năm nay</h6>
                  <div className="chart-container" style={{ height: '360px' }}>
                    <Bar data={data} options={options} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Doanh số đặt hàng</h3>
                  <h6 className="card-subtitle">Trong năm nay</h6>
                  <div className="chart-container" style={{ height: '360px' }}>
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </div>
                <hr className="mt-0 mb-0" />
                <div className="card-body text-center">
                  <ul className="list-inline d-flex justify-content-center align-items-center mb-0">
                    <li className="list-inline-item px-4">
                      <span className="circle-circle" style={{ backgroundColor: 'blue' }}></span> Xe số
                    </li>
                    <li className="list-inline-item px-4">
                      <span className="circle-circle" style={{ backgroundColor: 'yellow' }}></span> Xe tay côn
                    </li>
                    <li className="list-inline-item px-4">
                      <span className="circle-circle" style={{ backgroundColor: 'cyan' }}></span> Xe tay ga
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
