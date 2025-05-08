# GemCommerce Unit Value Input

Dự án này là một component Vue 3 + TypeScript + Vite cho phép nhập giá trị với đơn vị `%` hoặc `px`, hỗ trợ stepper, validate, UX/UI hiện đại, animation đẹp mắt và kiểm thử tự động.

## 🚀 Chức năng chính
- Chọn đơn vị `%` hoặc `px` với UI đẹp, animation mượt.
- Nhập số nguyên, số thực, tự động chuyển dấu phẩy thành dấu chấm.
- Loại bỏ ký tự không hợp lệ khi nhập.
- Nếu nhập < 0, blur sẽ về 0.
- Nếu đơn vị là `%` và nhập > 100, blur sẽ revert về giá trị hợp lệ trước đó.
- Nút "-" disable khi giá trị là 0, nút "+" disable khi giá trị là 100 (với %).
- Nếu chuyển từ px sang % và giá trị hiện tại > 100, sẽ update về 100.
- Tooltip báo lỗi, animation shake khi nhập sai.
- Tối ưu accessibility, UX, performance.

## 🖼️ Giao diện
- UI hiện đại, dark mode, label trái, input phải, stepper căn giữa.
- Animation khi hover, focus, báo lỗi.

## 📂 Cấu trúc thư mục
```
src/
  App.vue                # Entry point sử dụng component
  main.ts                # Mount Vue app
  components/
    UnitValueInput.vue   # Component cha
    UnitSwitcher.vue     # Chọn đơn vị
    ValueStepper.vue     # Stepper nhập số
    *.spec.ts            # (Tùy chọn) Unit test cho từng component
```

## 🛠️ Hướng dẫn chạy project
```bash
npm install
npm run dev
```
Truy cập http://localhost:5173 để xem giao diện.

## 🧪 Chạy unit test
```bash
npm run test
```
> Yêu cầu đã cài `vitest`, `@vue/test-utils`.

## ✨ Lưu ý
- Có thể xóa các file `*.spec.ts` nếu không cần kiểm thử tự động.
- Dự án đã tối ưu hiệu năng, UX, animation, accessibility.

---
**Made with ❤️ by GemCommerce**
