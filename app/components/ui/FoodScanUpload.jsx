"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

// const MOCK_INVENTORY_ITEMS = [
//   "Grains",
//   "Pulses",
//   "Oils",
//   "Spices",
//   "Pantry Staples",
//   "Beverages",
//   "Snacks",
//   "Fresh Essentials",
//   "Condiments",
// ];

const MOCK_PREVIOUS_UPLOADS = [
  {
    id: 1,
    filename: "receipt_01.jpg",
    status: "Linked to Oats",
  },
  {
    id: 2,
    filename: "yogurt_label.png",
    status: "Unassigned",
  },
  {
    id: 3,
    filename: "almond_milk.jpg",
    status: "Unassigned",
  },
];

export default function FoodScanUpload({ items }) {
  const fileInputRef = useRef(null);
  const MOCK_INVENTORY_ITEMS = items.map((e) => e.name);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [associateWith, setAssociateWith] = useState(""); // "inventory" | "log" | "unassigned"
  const [selectedInventory, setSelectedInventory] = useState(
    MOCK_INVENTORY_ITEMS[0]
  );
  const [notes, setNotes] = useState("");
  const handleFileSelect = (file) => {
    if (!file.type.startsWith("image/")) {
      console.log("Only image files allowed");
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // --- file handling (dummy, UI-only) ---
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleFileSelect(file);
  };

  const handleRemovePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSaveUpload = (e) => {
    e.preventDefault();

    const payload = {
      file: selectedFile,
      associateWith,
      inventoryItem: associateWith === "inventory" ? selectedInventory : null,
      notes,
    };

    console.log("TODO: Save upload payload →", payload);
    // TODO: plug into your API / storage
  };

  const canSave = useMemo(
    () => !!selectedFile && !!associateWith,
    [selectedFile, associateWith]
  );

  // --- UI ---
  return (
    <section className="space-y-5 sm:space-y-6">
      {/* Top banner like screenshot */}
      <header className="rounded-2xl bg-nav-panel px-5 sm:px-6 py-4 sm:py-5 shadow-md">
        <h1 className="font-oswald text-2xl sm:text-3xl text-primary-accent text-center">
          Food Scan Upload
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-neutral-700 text-center">
          Upload receipts or food labels to attach them to your inventory or
          logs.
        </p>
      </header>

      {/* Middle layout: upload + previous uploads */}
      <div className="grid gap-4 lg:gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.25fr)]">
        {/* LEFT: upload + preview */}
        <div className="rounded-2xl bg-nav-panel shadow-md p-4 sm:p-5 space-y-4">
          {/* Upload zone */}
          <div
            className="rounded-2xl border-2 border-dashed border-neutral-400/80 bg-white/80 px-4 py-10 sm:py-12 text-center cursor-pointer hover:border-primary-accent hover:bg-white transition"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-accent text-input-text mx-auto mb-3 text-lg">
              ⬆️
            </div>
            <p className="text-sm sm:text-base font-medium text-primary-accent">
              Drag &amp; drop image here or click to upload
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Supported formats: JPG, PNG (Max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          {/* Preview area like screenshot */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-neutral-800">Preview</p>
            <div className="rounded-2xl bg-white/90 min-h-[140px] flex items-center justify-start px-3 py-3 border border-neutral-200">
              {previewUrl ? (
                <div className="relative inline-block">
                  <Image
                    height={224}
                    width={224}
                    src={previewUrl}
                    alt="Upload preview"
                    className="max-h-56 rounded-xl object-contain shadow-md"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePreview}
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-primary-accent text-input-text text-xs flex items-center justify-center shadow cursor-pointer hover:bg-black"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <p className="text-xs text-neutral-500">
                  No image selected yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: previous uploads column */}
        <aside className="rounded-2xl bg-nav-panel shadow-md p-4 sm:p-5 h-fit">
          <h2 className="font-oswald text-lg text-primary-accent mb-3">
            Previous Uploads
          </h2>
          <div className="space-y-3">
            {MOCK_PREVIOUS_UPLOADS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-white border border-neutral-200 px-3 py-2.5 shadow-sm"
              >
                {/* Thumbnail placeholder */}
                <div className="h-10 w-10 flex-none rounded-md bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-700 font-semibold">
                  IMG
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-primary-accent truncate">
                    {item.filename}
                  </p>
                  <p className="mt-1 inline-flex items-center rounded-full bg-[#f3ecde] px-2 py-0.5 text-[10px] text-neutral-700 border border-neutral-300">
                    {item.status}
                  </p>
                </div>

                {/* Dummy icons row */}
                <div className="flex flex-col items-center gap-1 text-neutral-500 text-xs">
                  <button
                    type="button"
                    className="hover:text-primary-accent cursor-pointer"
                    onClick={() =>
                      console.log("Preview previous upload:", item.id)
                    }
                    title="Preview"
                  >
                    👁
                  </button>
                  <button
                    type="button"
                    className="hover:text-primary-accent cursor-pointer"
                    onClick={() =>
                      console.log("Relink previous upload:", item.id)
                    }
                    title="Link"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() =>
                      console.log("Delete previous upload:", item.id)
                    }
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Bottom card: associate with + notes + buttons (full width like screenshot) */}
      <form
        onSubmit={handleSaveUpload}
        className="rounded-2xl bg-nav-panel shadow-md p-4 sm:p-5 space-y-4"
      >
        {/* Associate With */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-neutral-800">
            Associate With
          </label>
          <select
            value={associateWith}
            onChange={(e) => setAssociateWith(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-primary-accent shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <option value="">Select an option</option>
            <option value="inventory">Inventory Item</option>
            <option value="log">Usage Log</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        {/* Inventory selection */}
        {associateWith === "inventory" && (
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-neutral-800">
              Select Inventory Item
            </label>
            <select
              value={selectedInventory}
              onChange={(e) => setSelectedInventory(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-primary-accent shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              {MOCK_INVENTORY_ITEMS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-neutral-800">
            Notes
          </label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any relevant notes here..."
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-primary-accent resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Bottom buttons aligned left, like screenshot */}
        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            disabled={!canSave}
            className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md border cursor-pointer
              ${
                canSave
                  ? "bg-primary-accent text-primary-btn-text border-primary-accent hover:bg-black"
                  : "bg-neutral-400 text-neutral-100 border-neutral-400 cursor-not-allowed"
              }`}
          >
            Save Upload
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("Cancel clicked – reset form");
              handleRemovePreview();
              setAssociateWith("");
              setNotes("");
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-neutral-700 bg-transparent text-primary-accent hover:bg-neutral-200/70 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
