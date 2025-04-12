import { usePathname, useSearchParams } from "next/navigation";

export function useEncodedUrl(customParams?: URLSearchParams) {
  const path = usePathname();
  const searchParams = useSearchParams();

  // Gunakan customParams jika ada, jika tidak pakai searchParams default
  const params = customParams
    ? customParams.toString()
    : searchParams.toString();

  const currentUrl = `${path}?${params}`;
  return encodeURIComponent(currentUrl);
}
