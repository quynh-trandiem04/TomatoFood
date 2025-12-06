# 🍅 Tomato Food - Food Delivery Website

Một ứng dụng web đặt đồ ăn trực tuyến được xây dựng bằng React, cho phép người dùng duyệt menu, thêm món ăn vào giỏ hàng và đặt hàng.

## ✨ Tính năng

- 🏠 **Trang chủ**: Hiển thị menu đồ ăn với các danh mục khác nhau
- 🛒 **Giỏ hàng**: Quản lý các món ăn đã chọn
- 📋 **Đặt hàng**: Giao diện đặt hàng với thông tin giao hàng
- 📱 **Responsive Design**: Tối ưu cho mọi thiết bị
- 🎨 **UI/UX hiện đại**: Giao diện người dùng thân thiện

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.6
- **Routing**: React Router DOM 7.9.1
- **State Management**: React Context API
- **Styling**: CSS Modules
- **Code Quality**: ESLint

## 📁 Cấu trúc project

```
src/
├── components/         # Các component tái sử dụng
│   ├── Navbar/        # Thanh điều hướng
│   ├── Header/        # Header trang chủ
│   ├── ExploreMenu/   # Menu khám phá
│   ├── FoodDisplay/   # Hiển thị danh sách món ăn
│   ├── FoodItem/      # Component món ăn đơn lẻ
│   ├── Footer/        # Footer
│   └── AppDownload/   # Khuyến mãi tải app
├── pages/             # Các trang chính
│   ├── Home/          # Trang chủ
│   ├── Cart/          # Trang giỏ hàng
│   └── PlaceOrder/    # Trang đặt hàng
├── context/           # React Context
│   └── StoreContext.jsx # Quản lý state toàn cục
└── assets/            # Hình ảnh và tài nguyên
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 16
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**

```bash
git clone https://github.com/quynh-trandiem04/TomatoFood.git
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy ở môi trường development**

```bash
npm run dev
```

4. **Build cho production**

```bash
npm run build
```

5. **Preview build**

```bash
npm run preview
```

## 📝 Scripts có sẵn

- `npm run dev` - Chạy ứng dụng ở môi trường development
- `npm run build` - Build ứng dụng cho production
- `npm run preview` - Preview ứng dụng đã build
- `npm run lint` - Kiểm tra và fix lỗi ESLint

## 🎯 Tính năng chính

### Quản lý giỏ hàng

- Thêm/xóa món ăn vào giỏ hàng
- Cập nhật số lượng món ăn
- Tính toán tổng tiền tự động

### Điều hướng

- Trang chủ với menu đa dạng
- Giỏ hàng với tính năng quản lý chi tiết
- Trang đặt hàng với form thông tin giao hàng

### UI/UX

- Thiết kế responsive
- Animation mượt mà
- Giao diện trực quan, dễ sử dụng

## 👨‍💻 Tác giả

**Quynh Tran Diem** - [@quynh-trandiem04](https://github.com/quynh-trandiem04)

---
