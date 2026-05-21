import Image from "next/image";
import { cn } from "@/lib/utils";

const brandMarkSrc = "/logos/logo SAA.jpeg";

export default function BrandMark({ className = "h-full w-full" }) {
  return (
    <span className={cn("relative block overflow-hidden", className)} aria-hidden="true">
      <Image
        src={brandMarkSrc}
        alt=""
        fill
        sizes="96px"
        className="object-contain"
      />
    </span>
  );
}
