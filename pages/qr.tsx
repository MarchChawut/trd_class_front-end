import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router'

function Generate() {
  const router = useRouter()
  const {id} = router.query
  const [qrCodeValue, setQrCodeValue] = useState(id+"");

  return (
    <div>
      <QRCode value={qrCodeValue} />
    </div>
  );
}

export default Generate;
