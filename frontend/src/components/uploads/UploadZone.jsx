import { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import {
  UploadCloud,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";

import { motion } from "framer-motion";

import api from "../../services/api";


function UploadZone({onUploadSuccess}) {

  const [fileName, setFileName] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const uploadFile = async (
    file
  ) => {

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "uploaded_by",
      "Frontend User"
    );
    formData.append(
    "organization_id",
    localStorage.getItem("selectedOrg")
  );

    try {

      let endpoint = "";

      if (
        file.name
          .toLowerCase()
          .includes("utility")
      ) {

        endpoint =
          "/upload/utility/";

      } else if (
        file.name
          .toLowerCase()
          .includes("travel")
      ) {

        endpoint =
          "/upload/travel/";

      } else {

        endpoint =
          "/upload/sap/";

      }

      await api.post(
        endpoint,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setSuccess(true);
      if (onUploadSuccess) {

        onUploadSuccess();

      }
    } catch (err) {

      console.error(err);

      console.error(
      err.response?.data || err
    );

    } finally {

      setUploading(false);

    }

  };

  const onDrop = useCallback(
    async (acceptedFiles) => {

      const file = acceptedFiles[0];

      if (!file) return;

      setFileName(file.name);

      setUploading(true);

      setSuccess(false);

      setError("");

      uploadFile(file);

    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop
  });

  return (

    <motion.div

      whileHover={{
        scale: 1.01
      }}

      {...getRootProps()}

      className={`
        rounded-3xl

        border-2
        border-dashed

        backdrop-blur-xl

        p-14

        shadow-lg

        transition-all
        duration-500

        cursor-pointer

        ${
          isDragActive

          ? `
            border-emerald-400
            bg-emerald-500/10
          `

          : `
            border-zinc-300
            dark:border-zinc-700

            bg-white/70
            dark:bg-zinc-900/60
          `
        }
      `}
    >

      <input {...getInputProps()} />

      <div className="
        flex
        flex-col
        items-center
        justify-center
        text-center
      ">

        <div className="
          w-20
          h-20
          rounded-3xl

          bg-gradient-to-br
          from-emerald-500/20
          to-cyan-500/20

          flex
          items-center
          justify-center

          mb-6
        ">

          {uploading ? (

            <Loader2
              size={40}
              className="
                text-emerald-400
                animate-spin
              "
            />

          ) : error ? (

            <AlertCircle
              size={40}
              className="
                text-red-400
              "
            />

          ) : success ? (

            <CheckCircle2
              size={40}
              className="
                text-emerald-400
              "
            />

          ) : (

            <UploadCloud
              size={40}
              className="
                text-emerald-400
              "
            />

          )}

        </div>

        <h2 className="
          text-2xl
          font-semibold
          tracking-tight
        ">

          {uploading
            ? "Uploading..."
            : error
              ? "Upload Failed"
              : success
                ? "Upload Complete"
                : "Drag & Drop ESG Files"
          }

        </h2>

        <p className="
          text-zinc-500
          dark:text-zinc-400

          mt-3
          max-w-xl
        ">

          {error
            ? error
            : fileName
              ? fileName
              : `
                Upload SAP procurement,
                utility consumption,
                or travel emissions datasets
                for automated normalization
                and anomaly detection.
              `
          }

        </p>

        <button className="
          mt-8

          px-6
          py-3

          rounded-2xl

          bg-gradient-to-r
          from-emerald-500
          to-cyan-500

          text-white
          font-medium

          shadow-lg

          hover:scale-105

          transition-all
          duration-300
        ">

          Browse Files

        </button>

      </div>

    </motion.div>

  );
}

export default UploadZone;