import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getDailySales } from '../../../services/admin/dashboard';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DailySalesChart = () => {
  const [labels, setLabels] = useState([]); // Ngày
  const [salesData, setSalesData] = useState([]); // Doanh thu
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailySales = async () => {
      try {
        const data = await getDailySales(); // Gọi API qua service
        const days = data.map((item) => item.date); // Tách ngày
        const sales = data.map((item) => item.sales); // Tách doanh thu
        setLabels(days);
        setSalesData(sales);
      } catch (err) {
        setError('Không thể tải dữ liệu thống kê!');
      } finally {
        setLoading(false);
      }
    };

    fetchDailySales();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: salesData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu theo ngày',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default DailySalesChart;
