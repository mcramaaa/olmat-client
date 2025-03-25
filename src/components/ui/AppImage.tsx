// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "./dialog";

// interface IProps {
//   src: string;
//   className?: string;
//   object?: "object-cover" | "object-contain";
// }

// export default function AppImage({
//   className,
//   src,
//   object = "object-cover",
// }: IProps) {
//   const [isPreview, setisPreview] = useState<boolean>(false);

//   function handlePreview() {
//     setisPreview(!isPreview);
//   }
//   return (
//     <>
//       <div
//         className={`${className} relative cursor-pointer`}
//         onClick={handlePreview}
//       >
//         <Image alt={`${src}`} src={src} fill className={`${object}`} />
//       </div>
//       <Dialog open={isPreview} onOpenChange={handlePreview}>
//         <DialogContent className="max-w-3xl bg-transparent border-none">
//           <DialogHeader className="hidden">
//             <DialogTitle>Pratinjau Gambar</DialogTitle>
//           </DialogHeader>
//           <DialogDescription></DialogDescription>
//           <div className="relative flex items-center justify-center w-full">
//             <div className="relative object-center w-full aspect-square">
//               <Image
//                 src={src}
//                 alt={`${src}`}
//                 fill
//                 sizes=""
//                 className="object-contain max-w-full max-h-full"
//               />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AppImageProps {
  src: string;
  alt?: string;
  className?: string;
  object?: "object-cover" | "object-contain";
  priority?: boolean;
  sizes?: string;
}

export default function AppImage({
  className,
  src,
  alt,
  object = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: AppImageProps) {
  const [isPreview, setIsPreview] = useState<boolean>(false);

  function handlePreview() {
    setIsPreview(!isPreview);
  }

  return (
    <>
      <div
        className={`${className} relative cursor-pointer`}
        onClick={handlePreview}
      >
        <Image
          alt={alt || `Image ${src}`}
          src={src || "/placeholder.svg"}
          fill
          className={object}
          priority={priority}
          sizes={sizes}
        />
      </div>
      <Dialog open={isPreview} onOpenChange={handlePreview}>
        <DialogContent className="max-w-3xl bg-transparent border-none">
          <DialogHeader className="hidden">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="relative flex items-center justify-center w-full">
            <div className="relative object-center w-full aspect-square">
              <Image
                src={src || "/placeholder.svg"}
                alt={alt || `Image ${src}`}
                fill
                sizes={sizes}
                className="object-contain max-w-full max-h-full"
                priority={false}
              />
            </div>
          </div>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
