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
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.orderId} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      <MusicNoteIcon className="me-2" />
                      {order.className}
                    </h5>
                    <span className={`badge bg-${ORDER_STATUS_STYLE_MAP[order.orderStatus]}`}>
                      {ORDER_STATUS_MAP[order.orderStatus]}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <Link 
                      to={`/store/${order.storeId}`}
                      className="text-decoration-none"
                    >
                      <LocationOnIcon className="me-2" />
                      {order.storeName}
                    </Link>
                  </div>

                  <div className="mb-3">
                    <AccessTimeIcon className="me-2" />
                    {formatDateTime(order.orderStartDate)} - {formatDateTime(order.orderEndDate)}
                  </div>

                  <div className="mb-3">
                    <AttachMoneyIcon className="me-2" />
                    {order.price} 元
                  </div>

                  {order.orderStatus !== 'CANCEL' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancelOrder(order.orderId)}
                    >
                      取消預約
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
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