## 如何将一个SSR项目成功部署上线

- xftp、xshell
- node、nginx环境
- 发布上线、screen守护进程


nginx.conf的配置
```
#打开gzip
gzip_on;
gzip_min_length 1k;
gizp_buffers 4 16k;
gzip_comp_level 8;
gzip_types text/plain application/javascript text/css text/javascript;
gzip_vary on;
gzip_disable "MSIE [1-6]\.";

server {

  listen 80;
  ......
  location / {
    root /home/airbnb/dist/client;
    index index.html index.htm;
    proxy_pass http://127.0.0.1:3000
  }

  # 后端接口配置夫
  location /api/ {
    proxy_pass http://127.0.0.1:9000/;
    client_max_body_size 50m;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_X_forwarded_for;
  }
}
```

修改了nginx配置文件需要
`cd /usr/local/nginx/sbin`
`./nginx -s reload`

查看进程端口号
netstat -ntulp

杀死进程
kill -9 进程号pid