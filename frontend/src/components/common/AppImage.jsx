import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { isRenderableImageUrl } from "../../utils/imageUpload";

export default function AppImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  eager = false
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [src]);

  const valid = isRenderableImageUrl(src);
  if (!valid || failed) {
    return (
      <div className={`grid place-items-center bg-(--card) text-(--text-muted) ${wrapperClassName || className}`}>
        <ImageOff className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">{alt || "Image unavailable"}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-(--card-solid)" aria-hidden="true" /> : null}
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
    </div>
  );
}
