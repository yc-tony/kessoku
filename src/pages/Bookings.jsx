import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderApi } from '../services/api';
import { ORDER_STATUS_MAP, ORDER_STATUS_STYLE_MAP } from '../utils/constants';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Bookings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getMyOrders();
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await orderApi.cancelOrder(orderId);
      setSuccessMessage('訂單已成功取消');
      setShowSuccess(true);
      // 重新獲取訂單列表
      fetchOrders();
    } catch (err) {
      setError(err.message);
      setShowError(true);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container-fluid py-4" style={{ maxWidth: '1920px' }}>
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{ maxWidth: '1920px' }}>
      <h2 className="mb-4">我的預約</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info" role="alert">
          目前沒有預約記錄
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>教室名稱</th>
                <th>工作室</th>
                <th>預約時間</th>
                <th>價格</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>
                    <MusicNoteIcon className="me-2" />
                    {order.className}
                  </td>
                  <td>
                    <Link 
                      to={`/store/${order.storeId}`}
                      className="text-decoration-none"
                    >
                      <LocationOnIcon className="me-2" />
                      {order.storeName}
                    </Link>
                  </td>
                  <td>
                    <AccessTimeIcon className="me-2" />
                    {formatDateTime(order.orderStartDate)} - {formatDateTime(order.orderEndDate)}
                  </td>
                  <td>
                    <AttachMoneyIcon className="me-2" />
                    {order.price} 元
                  </td>
                  <td>
                    <span className={`badge bg-${ORDER_STATUS_STYLE_MAP[order.orderStatus]}`}>
                      {ORDER_STATUS_MAP[order.orderStatus]}
                    </span>
                  </td>
                  <td>
                    {order.orderStatus !== 'CANCEL' && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        取消預約
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 錯誤提示 */}
      {showError && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1100 }}>
          <div className="toast show bg-danger text-white" role="alert">
            <div className="toast-body text-center">
              {error}
            </div>
          </div>
        </div>
      )}

      {/* 成功提示 */}
      {showSuccess && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 1100 }}>
          <div className="toast show bg-success text-white" role="alert">
            <div className="toast-body text-center">
              {successMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings; 