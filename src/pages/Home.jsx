import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { storeApi } from '../services/api';

const CITIES = [
  { code: 'C01', name: '台北市' },
  { code: 'C02', name: '新北市' },
  { code: 'C03', name: '桃園市' },
  { code: 'C04', name: '台中市' },
  { code: 'C05', name: '台南市' },
  { code: 'C06', name: '高雄市' },
  { code: 'C07', name: '基隆市' },
  { code: 'C08', name: '新竹市' },
  { code: 'C09', name: '新竹縣' },
  { code: 'C10', name: '苗栗縣' },
  { code: 'C11', name: '彰化縣' },
  { code: 'C12', name: '南投縣' },
  { code: 'C13', name: '雲林縣' },
  { code: 'C14', name: '嘉義市' },
  { code: 'C15', name: '嘉義縣' },
  { code: 'C16', name: '屏東縣' },
  { code: 'C17', name: '宜蘭縣' },
  { code: 'C18', name: '花蓮縣' },
  { code: 'C19', name: '台東縣' },
  { code: 'C20', name: '澎湖縣' },
  { code: 'C21', name: '金門縣' },
  { code: 'C22', name: '連江縣' },
];

const INSTRUMENTS = [
  { code: 'DRUMS', name: '爵士鼓' },
  { code: 'PIANO', name: '鋼琴' },
];

const INSTRUMENT_MAP = {
  'DRUMS': '爵士鼓',
  'PIANO': '鋼琴'
};

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    instrument: '',
    date: '',
  });
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showError, setShowError] = useState(false);
  const itemsPerPage = 6;

  const fetchStores = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await storeApi.getStores({
        city: searchParams.city,
        instrument: searchParams.instrument,
      });
      
      if (response.data && response.data.stores) {
        setStores(response.data.stores);
      } else {
        setStores([]);
      }
    } catch (error) {
      setError(error.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchStores();
  };

  const currentStores = stores.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '1920px' }}>
      <div className="py-4">
        {/* 搜索區域 */}
        <div className="card shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="citySelect"
                    value={searchParams.city}
                    onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
                  >
                    <option value="">不限</option>
                    {CITIES.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="citySelect">
                    <LocationOnIcon className="me-2" />
                    地區
                  </label>
                </div>
              </div>
              <div className="col-3">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="instrumentSelect"
                    value={searchParams.instrument}
                    onChange={(e) => setSearchParams({ ...searchParams, instrument: e.target.value })}
                  >
                    <option value="">不限</option>
                    {INSTRUMENTS.map((instrument) => (
                      <option key={instrument.code} value={instrument.code}>
                        {instrument.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="instrumentSelect">
                    <MusicNoteIcon className="me-2" />
                    樂器類型
                  </label>
                </div>
              </div>
              <div className="col-3">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="dateInput"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  />
                  <label htmlFor="dateInput">
                    <AccessTimeIcon className="me-2" />
                    預約日期
                  </label>
                </div>
              </div>
              <div className="col-3">
                <button
                  className="btn btn-primary w-100 h-100"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      搜尋中...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="me-2" />
                      搜尋
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 練習室列表 */}
        <div className="position-relative" style={{ minHeight: '400px' }}>
          {loading && (
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && stores.length === 0 && (
            <div className="alert alert-info" role="alert">
              沒有找到符合條件的練習室
            </div>
          )}

          {!loading && stores.length > 0 && (
            <>
              <h4 className="mb-4">搜尋結果</h4>
              <div className="row g-4">
                {currentStores.map((store) => (
                  <div className="col-4" key={store.id}>
                    <div className="card h-100">
                      <div
                        className="card-img-top"
                        style={{
                          height: '200px',
                          backgroundImage: `url(https://source.unsplash.com/random/400x200?music-studio&${store.id})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      ></div>
                      <div className="card-body">
                        <h5 className="card-title">{store.name}</h5>
                        <p className="card-text text-muted mb-2">
                          地點：{store.address}
                        </p>
                        <p className="card-text text-muted mb-3">
                          電話：{store.phone}
                        </p>
                        <div className="mb-3">
                          <h6 className="card-subtitle mb-2">可用練習室：</h6>
                          {store.classes.map((classItem, index) => (
                            <div key={index} className="text-muted small">
                              • {classItem.name}（{classItem.instruments.map(code => INSTRUMENT_MAP[code] || code).join('、')}）
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-primary w-100">
                          查看詳情
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 分頁控制 */}
              {stores.length > itemsPerPage && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page - 1)}
                      >
                        上一頁
                      </button>
                    </li>
                    {[...Array(Math.ceil(stores.length / itemsPerPage))].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${page === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        page === Math.ceil(stores.length / itemsPerPage) ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page + 1)}
                      >
                        下一頁
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>

        {/* 錯誤提示 */}
        {showError && (
          <div
            className="toast show position-fixed top-0 start-50 translate-middle-x mt-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto text-danger">錯誤</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowError(false)}
              ></button>
            </div>
            <div className="toast-body">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 