import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
const app = express();

app.use(cors())
dotenv.config()

app.use("/users", (req, res) => {
    res.status(200).json({ result: "done" });
})


// Khởi tạo Prisma Client
const prisma = new PrismaClient();

async function checkConnection() {
  try {
    // Kết nối đến database
    await prisma.$connect();
    console.log('Kết nối đến cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', error);
  } finally {
    // Đảm bảo đóng kết nối sau khi kiểm tra
    await prisma.$disconnect();
  }
}

// Gọi hàm kiểm tra kết nối
checkConnection();

const CONNECTION_URL =  process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;
  app.listen(PORT)
