/**
 * Đa nền tảng build script cho Recipe Hub
 * Tự động phát hiện hệ điều hành và chạy lệnh build phù hợp
 */

import { execSync } from 'child_process';
import { platform } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Xác định nền tảng hiện tại
console.log(`🖥️ Phát hiện nền tảng: ${platform()}`);

try {
  // Cấp quyền thực thi cho file Astro nếu cần (chỉ trên Linux/macOS)
  if (platform() !== 'win32') {
    console.log('🔐 Bước 1: Cấp quyền thực thi cho Astro (Linux/macOS)...');
    execSync('chmod +x node_modules/.bin/astro', { stdio: 'inherit' });
  } else {
    console.log('🔐 Bước 1: Bỏ qua cấp quyền thực thi (Windows)');
  }

  // Chạy Astro build
  console.log('🏗️ Bước 2: Xây dựng ứng dụng Astro...');
  execSync('astro build', { stdio: 'inherit' });

  console.log('✅ Quá trình build đã hoàn tất thành công!');
} catch (error) {
  console.error('❌ Lỗi trong quá trình build:', error.message);
  process.exit(1);
} 