import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type fileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: fileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} alt="uploaded image" width={1000} height={1000} className="max-h-96 overflow-hidden object-cover"/>
      ) : (
        <>
            <CloudUpload/>
            <p className="text-base"><span >Upload Image</span> / Drag & Drop</p>
            <p>.png .jpg .jpeg (Max Size 1MB)</p>
        </>
      )}
    </div>
  );
};

export default FileUploader;
