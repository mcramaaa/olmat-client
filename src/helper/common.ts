export function convertRupiah(value: number | undefined | 0) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (value) return formatter.format(value);
  return null;
}

export function convertDate(value: string | Date | undefined | null): string {
  if (!value) return "Tanggal Tidak Valid";

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Tanggal Tidak Valid";
  }

  // Tambahkan 7 jam ke waktu UTC
  date.setHours(date.getHours() + 7);

  const day = date.toLocaleString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  return `${day}, ${formattedDate}`;
}

export function convertDateTime(value: any | undefined) {
  if (!value) return "Invalid Date";

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Tambahkan 7 jam ke waktu UTC
  date.setHours(date.getHours() + 7);

  const day = date.toLocaleString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
  const time = date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  return `${day}, ${formattedDate} - ${time} WIB`;
}

export function convertBirth(value: string | Date | undefined | null): string {
  if (!value) return "Tanggal Tidak Valid";

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Tanggal Tidak Valid";
  }

  // Tambahkan 7 jam ke waktu UTC
  date.setHours(date.getHours() + 7);

  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

  return formattedDate; // Hapus spasi ekstra
}

export function convertGender(value: string | undefined) {
  if (value === "L") {
    return "Laki-laki";
  } else {
    return "Perempuan";
  }
}

export function UpperCaseFirst(name: string): string {
  return name
    .toLowerCase() // jadi huruf kecil semua
    .split(" ") // pisah per kata
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // kapitalisasi tiap kata
    .join(" "); // gabungkan lagi
}
