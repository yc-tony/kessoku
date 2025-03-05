# 使用 Node.js 官方映像
FROM node:14

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製其餘的應用程式代碼
COPY . .

# 暴露應用程式的端口
EXPOSE 5000

# 啟動應用程式
CMD ["node", "server.js"]
