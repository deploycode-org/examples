import Image from "next/image";
import { Back } from "@/app/back";
import photo from "./photo.jpg";

export default function ImagePage() {
  return (
    <main>
      <h1>next/image</h1>
      <p>
        The source is a {photo.width}×{photo.height} JPEG of about 115 KB. The browser gets it from{" "}
        <code>/_next/image</code>, resized to the width it needs and re-encoded as WebP or AVIF by sharp
        on the server — <code>next start</code> needs no image service of its own.
      </p>
      <Image
        src={photo}
        alt="A generated gradient, served through the Next.js image optimizer"
        sizes="(max-width: 40rem) 100vw, 640px"
        placeholder="blur"
        priority
      />
      <p>
        If the picture is missing, the optimizer failed on the server: open the image in a new tab to
        see its error.
      </p>
      <Back />
    </main>
  );
}
