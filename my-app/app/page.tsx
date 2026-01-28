"use client";
import { useState, useEffect } from "react";

export default function Home() {
  // Thay dấu ... bằng số 1500 (25 phút)
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Thay dấu ... bằng false (chưa chạy)
  const [isRunning, setIsRunning] = useState(false);
  // --- ĐÂY LÀ ĐỘNG CƠ ---
  useEffect(() => {
    let timer: any;

    // Nếu đang chạy (isRunning = true) VÀ thời gian còn (timeLeft > 0)
    if (isRunning && timeLeft > 0) {
      // Cứ 1 giây (1000ms) thì trừ đi 1
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Dọn dẹp (Tắt máy khi không dùng để đỡ tốn xăng/RAM)
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // --- ĐÂY LÀ HÀM PHỤ TRỢ ---

  // 1. Hàm đổi giây sang dạng Phút:Giây (VD: 1500 -> 25:00)
  const formatTime = (seconds :number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // 2. Hàm bấm nút Bắt đầu / Tạm dừng
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Nhớ Enter xuống dòng cho thoáng nha
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">
          {formatTime(timeLeft)}
        </h1>
        <p className="text-xl">Code bởi Reitokomei tại GitHub Codespaces</p>
        <button
          onClick={toggleTimer}
          className="mt-8 px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 font-bold transition"
        >
          {isRunning ? "Tạm dừng" : "Bắt đầu"}
        </button>
      </div>
    </div>
  );
}