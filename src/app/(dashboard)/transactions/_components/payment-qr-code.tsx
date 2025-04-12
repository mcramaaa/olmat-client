import QRCode from "react-qr-code";

interface PaymentQRCodeProps {
  qrCode: string;
}

export function PaymentQRCode({ qrCode }: PaymentQRCodeProps) {
  return (
    <div className="border-2 aspect-square w-52 overflow-hidden flex justify-center items-center relative border-dashed border-gray-300 rounded-lg p-2 bg-white">
      {/* <div className=""> */}
      <QRCode
        value={qrCode}
        bgColor="transparent"
        className="object-contain w-52 h-52"
      />
      {/* <Image src={qrCode || "/placeholder.svg"} alt="Payment QR Code" fill  /> */}
      {/* </div> */}
    </div>
  );
}
