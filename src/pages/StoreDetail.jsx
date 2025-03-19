import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storeApi, authApi } from '../services/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const INSTRUMENT_MAP = {
  'DRUMS': '爵士鼓',
  'PIANO': '鋼琴'
};

const StoreDetail = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [classOrders, setClassOrders] = useState({});
  const [selectedTimes, setSelectedTimes] = useState({});

  useEffect(() => {
    fetchStoreInfo();
  }, [storeId]);

  const fetchStoreInfo = async () => {
    try {
      setLoading(true);
      const response = await storeApi.getStoreInfo(storeId);
      setStore(response.data);
      
      // 獲取每個教室的預約情況
      const ordersPromises = response.data.classes.map(async (classItem) => {
        const ordersResponse = await storeApi.getClassOrders(classItem.id);
        return { classId: classItem.id, orders: ordersResponse.data };
      });
      
      const ordersResults = await Promise.all(ordersPromises);
      const ordersMap = {};
      ordersResults.forEach(result => {
        ordersMap[result.classId] = result.orders;
      });
      setClassOrders(ordersMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isTimeSlotBooked = (classId, date, time) => {
    const classOrderList = classOrders[classId] || [];
    return classOrderList.some(order => 
      order.date === date && order.timeList.includes(time)
    );
  };

  const handleTimeSelect = (classId, date, time) => {
    setSelectedTimes(prev => {
      const currentClassTimes = prev[classId] || {};
      const currentDateTimes = currentClassTimes[date] || [];
      
      if (currentDateTimes.includes(time)) {
        // 取消選擇
        const newDateTimes = currentDateTimes.filter(t => t !== time);
        const newClassTimes = { ...currentClassTimes, [date]: newDateTimes };
        
        // 如果該日期沒有選擇任何時段，則刪除該日期
        if (newDateTimes.length === 0) {
          delete newClassTimes[date];
        }
        
        // 如果該教室沒有選擇任何時段，則刪除該教室
        if (Object.keys(newClassTimes).length === 0) {
          const newSelectedTimes = { ...prev };
          delete newSelectedTimes[classId];
          return newSelectedTimes;
        }
        
        return { ...prev, [classId]: newClassTimes };
      } else {
        // 新增選擇
        return {
          ...prev,
          [classId]: {
            ...currentClassTimes,
            [date]: [...currentDateTimes, time].sort()
          }
        };
      }
    });
  };

  const handleSubmit = () => {
    if (!authApi.isAuthenticated()) {
      // 保存當前頁面路徑
      sessionStorage.setItem('previousPath', window.location.pathname);
      navigate('/login');
      return;
    }

    // TODO: 實現預約提交邏輯
    console.log('預約資訊：', selectedTimes);
  };

  // 檢查是否有任何選擇的時段
  const hasSelectedTimes = Object.keys(selectedTimes).length > 0;

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

  if (error) {
    return (
      <div className="container-fluid py-4" style={{ maxWidth: '1920px' }}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!store) return null;

  return (
    <div className="container-fluid py-4" style={{ maxWidth: '1920px' }}>
      {/* 店家基本信息 */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-4">{store.name}</h2>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="d-flex align-items-center text-muted">
                <LocationOnIcon className="me-2" />
                <span>{store.address}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center text-muted">
                <PhoneIcon className="me-2" />
                <span>{store.phone}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex align-items-center text-muted">
                <EmailIcon className="me-2" />
                <span>{store.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 練習室列表 */}
      <div className="row g-4">
        {store.classes.map((classItem) => (
          <div key={classItem.id} className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h4 className="card-title mb-3">{classItem.name}</h4>
                <p className="text-muted mb-2">
                  可用樂器：{classItem.instruments.map(code => INSTRUMENT_MAP[code] || code).join('、')}
                </p>
                <p className="text-muted mb-3">{classItem.description}</p>
                
                {/* 時間選擇區域 */}
                <div className="mt-4">
                  <h5 className="mb-3">可預約時段</h5>
                  {classItem.orderDateTimeList.map((dateTime) => (
                    <div key={dateTime.date} className="mb-4">
                      <h6 className="mb-2">{dateTime.date}</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {dateTime.timeList.map((time) => {
                          const isBooked = isTimeSlotBooked(classItem.id, dateTime.date, time);
                          const isSelected = selectedTimes[classItem.id]?.[dateTime.date]?.includes(time);
                          
                          return (
                            <button
                              key={time}
                              className={`btn ${isBooked ? 'btn-secondary' : isSelected ? 'btn-success' : 'btn-outline-primary'}`}
                              disabled={isBooked}
                              onClick={() => handleTimeSelect(classItem.id, dateTime.date, time)}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 已選擇的時段摘要 */}
                {selectedTimes[classItem.id] && (
                  <div className="mt-4">
                    <h6 className="text-primary mb-2">已選擇的時段：</h6>
                    {Object.entries(selectedTimes[classItem.id]).map(([date, times]) => (
                      <div key={date} className="small text-muted">
                        {date}：{times.join('、')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 統一提交按鈕 */}
      {hasSelectedTimes && (
        <div className="position-fixed bottom-0 start-0 w-100 bg-white shadow-lg p-3" style={{ zIndex: 1000 }}>
          <div className="container-fluid" style={{ maxWidth: '1920px' }}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-1">已選擇 {Object.keys(selectedTimes).length} 間練習室</h6>
                <div className="text-muted small">
                  {Object.entries(selectedTimes).map(([classId, dates]) => {
                    const classItem = store.classes.find(c => c.id === classId);
                    const className = classItem?.name || classId;
                    return (
                      <div key={classId}>
                        {className}：
                        {Object.entries(dates).map(([date, times], index, arr) => (
                          <span key={date}>
                            {date} ({times.length} 個時段)
                            {index < arr.length - 1 ? '、' : ''}
                          </span>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                提交預約
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail; 