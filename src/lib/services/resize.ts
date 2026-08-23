import type { ResizeOption } from "@/types/resize";

export async function resizeImage(imageData: ImageData, resizeOption: ResizeOption) {
  if (resizeOption.enabled === false) return imageData;

  const resize = await import("@jsquash/resize");

  const height =
    resizeOption.height === 0
      ? Math.round((resizeOption.width / imageData.width) * imageData.height)
      : resizeOption.height;

  return resize.default(imageData, {
    width: resizeOption.width,
    height,
    fitMethod: resizeOption.fitMethod,
  });
}
