import Image from "next/image";
import { ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function PostImage({ image }: ImageBlockObjectResponse) {
  const url = image.type === "file" ? image.file.url : image.external.url;
  const alt_text = image.caption[0] ? image.caption[0].plain_text : "";
  return (
    <div className="my-8">
      <Image
        src={url}
        alt={alt_text}
        width={700}
        height={400}
        className="rounded-lg shadow-sm w-full h-auto"
        priority={false}
      />
      {alt_text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
          {alt_text}
        </p>
      )}
    </div>
  );
}
