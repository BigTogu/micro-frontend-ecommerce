import React, { useState, useTransition } from "react";
import { cn } from "../../lib/utils";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "../../components/UI/Progress";

export default function UploadFile() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(40);

  const isUploading = false;

  //WHERE TO STORE THE UPLOAD IMAGE, MAYBE IN A UPLOADTHING.COM (s3). DIRECTAMENTE GUARDARLO EN UN S3 QUE ES MÁS BARATO O EN CLOUDFLARE R2 QUE AÚN ES MÁS BARATO
  const onDropRejected = () => {};
  const onDropAccepted = () => {};
  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jp"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 mb-2 text-zinc-500" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      className="mt-2 w-40 h-2 bg-gray-300"
                      value={uploadProgress}
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file </span>
                    to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload </span>
                    or drag and drop
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
