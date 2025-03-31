/**
 * 城市列表
 */
export const CITIES = [
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

/**
 * 樂器列表
 */
export const INSTRUMENTS = [
  { code: 'DRUMS', name: '爵士鼓' },
  { code: 'PIANO', name: '鋼琴' },
];

/**
 * 樂器代碼對應中文名稱
 */
export const INSTRUMENT_MAP = {
  'DRUMS': '爵士鼓',
  'PIANO': '鋼琴'
};

// 訂單狀態映射
export const ORDER_STATUS_MAP = {
  REVIEWING: '審查中',
  PURCHASING: '待付訂金',
  ACTIVE: '預約成功',
  CANCEL: '取消預約'
};

// 訂單狀態樣式映射
export const ORDER_STATUS_STYLE_MAP = {
  REVIEWING: 'warning',
  PURCHASING: 'info',
  ACTIVE: 'success',
  CANCEL: 'secondary'
}; 