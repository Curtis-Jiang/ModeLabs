# 使用 Nginx 作为基础镜像
FROM nginx:alpine

# 复制构建后的 React 静态文件到 Nginx 的默认 HTML 目录
COPY build/ /usr/share/nginx/html

# 暴露端口 80
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
