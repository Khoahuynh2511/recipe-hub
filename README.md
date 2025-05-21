# Recipe Hub - Ứng dụng khám phá và quản lý công thức nấu ăn

![Recipe Hub Logo](public/icons/logo.png)

## 📋 Giới thiệu

Recipe Hub là một ứng dụng web hiện đại giúp người dùng khám phá, lưu trữ và quản lý công thức nấu ăn từ khắp nơi trên thế giới. Được xây dựng với Astro và tích hợp công nghệ trí tuệ nhân tạo, Recipe Hub không chỉ là nơi tìm kiếm công thức mà còn là trợ lý thông minh trong việc lập kế hoạch bữa ăn và mua sắm nguyên liệu.

## 🌟 Tính năng nổi bật

### 1. Trí tuệ nhân tạo để ghép cặp món ăn và đồ uống
Sử dụng **TensorFlow Universal Sentence Encoder** để phân tích ngữ nghĩa của món ăn và đề xuất đồ uống phù hợp dựa trên hương vị, vùng miền và thành phần. Đây là điểm khác biệt lớn nhất so với các ứng dụng công thức thông thường.

### 2. Lưu trữ offline thông minh
- **Cookbook cá nhân**: Lưu trữ các công thức yêu thích để truy cập mọi lúc, mọi nơi
- **Danh sách mua sắm thông minh**: Tự động phân loại nguyên liệu theo nhóm (thịt, rau củ, đồ khô...)
- **Đồng bộ giữa thiết bị**: Dữ liệu người dùng được lưu trữ an toàn và có thể truy cập từ nhiều thiết bị

### 3. Ứng dụng web tiến bộ (PWA)
- Có thể cài đặt trên các thiết bị di động như một ứng dụng native
- Hoạt động offline khi không có kết nối internet
- Tải nhanh và tối ưu hiệu suất 

### 4. Tìm kiếm thông minh
- Sử dụng **Fuse.js** cho tìm kiếm mờ (fuzzy search) thông minh
- Kết quả tìm kiếm được xếp hạng theo độ phù hợp
- Tìm kiếm theo nhiều tiêu chí: nguyên liệu, loại món, vùng miền...

### 5. Giao diện người dùng hiện đại
- Thiết kế responsive trên mọi thiết bị
- Giao diện thân thiện, dễ sử dụng với Tailwind CSS
- Trải nghiệm người dùng mượt mà với các hiệu ứng chuyển động tinh tế

## 🚀 Công nghệ sử dụng

- **Frontend**: [Astro](https://astro.build/) - Framework hiệu suất cao cho web tĩnh và động
- **CSS**: [Tailwind CSS](https://tailwindcss.com/) - Framework CSS tiện ích
- **Tìm kiếm**: [Fuse.js](https://fusejs.io/) - Thư viện tìm kiếm mờ nhẹ
- **Machine Learning**: [TensorFlow.js](https://www.tensorflow.org/js) - Thư viện học máy cho JavaScript
- **Lưu trữ cục bộ**: IndexedDB, localStorage với [idb-keyval](https://github.com/jakearchibald/idb-keyval)
- **API**: TheMealDB, TheCocktailDB

## 🏗️ Cấu trúc dự án

```
recipe-hub/
├── public/              # Tài nguyên tĩnh (hình ảnh, icons)
├── src/
│   ├── components/      # Các thành phần UI tái sử dụng
│   ├── layouts/         # Bố cục trang
│   ├── lib/             # Thư viện và tiện ích
│   │   ├── api.ts       # Giao tiếp với API
│   │   ├── fuse.ts      # Cấu hình tìm kiếm
│   │   ├── pairing.ts   # Hệ thống ghép cặp AI
│   │   └── store.ts     # Quản lý trạng thái và lưu trữ
│   ├── pages/           # Các trang của ứng dụng 
│   └── styles/          # CSS toàn cục
└── scripts/             # Scripts build và tiện ích
```

## ⚙️ Cài đặt và chạy

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```

2. **Chạy môi trường phát triển**
   ```bash
   npm run dev
   ```

3. **Build cho production**
   ```bash
   npm run build
   ```

4. **Xem bản build**
   ```bash
   npm run preview
   ```

## 📊 Dữ liệu và API

Recipe Hub sử dụng dữ liệu từ nhiều nguồn:

- [TheMealDB](https://www.themealdb.com/) - Cơ sở dữ liệu món ăn
- [TheCocktailDB](https://www.thecocktaildb.com/) - Cơ sở dữ liệu đồ uống

## 🔮 Tính năng sắp tới

- Chức năng lên kế hoạch bữa ăn theo tuần
- Tính toán dinh dưỡng cho từng công thức
- Điều chỉnh khẩu phần và số lượng người ăn
- Hỗ trợ nhiều ngôn ngữ

## 👨‍💻 Tác giả

**Kai H (Huỳnh Đăng Khoa)**
- GitHub: [Khoahuynh2511](https://github.com/Khoahuynh2511)

## 📄 Giấy phép

Recipe Hub được phát hành dưới [Giấy phép MIT](LICENSE). 