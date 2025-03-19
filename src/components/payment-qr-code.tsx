import Image from "next/image"

interface PaymentQRCodeProps {
  qrCode: string
}

export function PaymentQRCode({ qrCode }: PaymentQRCodeProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
      <div className="aspect-square relative">
        <Image src={qrCode || "/placeholder.svg"} alt="Payment QR Code" fill className="object-contain" />
      </div>
    </div>
  )
}

