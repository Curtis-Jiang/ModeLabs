# 使用官方的 Node.js 镜像作为基础镜像
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制源代码
COPY . .

# 构建 React 应用
RUN npm run build

# 使用 Nginx 作为 web 服务器来提供静态文件
FROM nginx:alpine

# 将 React 应用的构建文件复制到 Nginx 的默认目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
