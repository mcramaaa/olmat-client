export function convertRupiah(value: number | undefined | 0) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (value) return formatter.format(value);
  return null;
}

export function convertDate(value: any | undefined) {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.toLocaleString("id-ID", { weekday: "long" }); // Get the day name
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${day}, ${formattedDate}`;
}

export function convertDateTime(value: any | undefined) {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.toLocaleString("id-ID", { weekday: "long" }); // Get the day name
  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });

  return `${day}, ${formattedDate} - ${time} WIB`;
}

export function convertBirth(value: any | undefined) {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${formattedDate} `;
}
