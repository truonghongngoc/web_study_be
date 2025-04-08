 2. Update api article thêm params categoryId
3. Tìm hiểu nestjs/swagger. update các đầu api. 
thêm @ApiBearerAuth() đối với các API cần auth. 
 Cập nhật Dto body cho các api 4. thêm api getMany article 


5. Cập thiết kế DB
- mỗi bài viết sẽ lưu thông tin action (thả tim, like)
- trong comment mình có thể rep được moment đó

6. tạo repo BE đẩy lên github


Auth : 
- Login email,pass => call API login => tạo access_token {id, email} access_token => Dùng access_token đính vào header request => Call các đầu api sẽ đi qua AuthGuard => giã token hợp lệ thì trả ra {id, email}, Lỗi thì 401.

=> Tổng kiến thức liên qian đến code BE. viết report nhé. hạn t2 nộp nhá.

công nghệ công cụ : nestjs
tạo dự án :
$ npm i -g @nestjs/cli
$ nest new project-name
 nest g controller( user )
bảo mật : JWT(json web token): mã hóa thông tin người dùng trong token
 . authguard: kiểm tra token. nếu hợp lệ ->cho phép truy cập thông tin người dùng. không hợp lệ -> lỗi 401
 
các hàm trong prisma:create,findMany(one),update,delete
xử ý dữ liệu : prisma (npx prisma migrate dev)
 .@ApiGuard:mô tả thuộc tính cho Swagger API Docs.
    @ApiBearerAuth(): thêm xác thực vào token
