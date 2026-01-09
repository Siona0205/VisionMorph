// src/components/PdfPreviewModal.jsx
import React from "react";

export default function PdfPreviewModal({ open, onClose, pdfUrl, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl w-[90%] max-w-3xl h-[80%] shadow-xl relative overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* PDF Preview */}
        <iframe
          src={pdfUrl}
          title="PDF Preview"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
