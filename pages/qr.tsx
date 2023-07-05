import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router'

function Generate() {
  const router = useRouter()
  const {id} = router.query
  const [qrCodeValue, setQrCodeValue] = useState(id+"");

  return (
    <div className="grid justify-items-center">
      <br/>
      <h1 className="text-3xl">ลงทะเบียนสำเร็จ</h1>
      <h2>กรุณาบันทึกหน้าจอ QR Code นี้ไว้ สำหรับยืนยันตัวตนก่อนเข้าห้องสัมมนา `อยู่อย่างปลอดภัย บนโลกไซเบอร์`</h2><br/>
      <QRCode value={qrCodeValue} /><br/>
      <h3>ทางผู้จัดสัมมนาได้จัดส่ง QR Code ไปยัง e-mail ที่ท่านได้ลงทะเบียนไว้</h3>
      <h3>หากไม่พบ อาจอยู่ที่ `จดหมายขยะ` ใน e-mail ของท่าน</h3> <br/>
      <a href="https://shorturl.asia/uh2Ao">คลิกเพื่อเข้าสู่เนื้อหาการสัมมนา</a>
    </div>
  );
}

export default Generate;
