interface CloudinaryImageOptions {
  width: number;
  height?: number;
  crop?: "fill" | "limit";
}

export function getOptimizedCloudinaryImageUrl(
  url: string,
  {
    width,
    height,
    crop = "fill",
  }: CloudinaryImageOptions,
): string {
  const marker = "/upload/";

  if (
    !url.includes("res.cloudinary.com") ||
    !url.includes(marker)
  ) {
    return url;
  }

  const transformations = [
    "f_auto",
    "q_auto:eco",
    `c_${crop}`,
    `w_${Math.max(1, Math.round(width))}`,
    height
      ? `h_${Math.max(1, Math.round(height))}`
      : null,
    crop === "fill"
      ? "g_auto"
      : null,
  ]
    .filter(Boolean)
    .join(",");

  return url.replace(
    marker,
    `${marker}${transformations}/`,
  );
}
