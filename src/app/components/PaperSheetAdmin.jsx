"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function PaperSheetAdmin({ paper, deleted, onUpdate }) {
  const paperId = paper.id;
  const [paperName, setPaperName] = useState(paper.name);
  const [price, setPrice] = useState(paper.price);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  async function updatePaper(id, name, price) {
    setIsUpdating(true);
    // If both fields are empty/zero, delete instead of saving
    const isNameEmpty = !name || name.toString().trim() === "";
    const numericPrice = Number(price || 0);
    const isPriceEmpty = price === "" || numericPrice === 0;
    if (isNameEmpty && isPriceEmpty) {
      // call delete endpoint and notify parent
      await deletePaper(id);
      setIsUpdating(false);
      return;
    }

    const res = await fetch("/api/paper-sheets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        price,
      }),
    });

    const json = await res.json();
    console.log(json);
    if (!res.ok) {
      console.log("error while updating paperSheet");
    }
    // Notify parent about the updated paper so it can update local state
    if (onUpdate && json) {
      try {
        onUpdate(json);
      } catch (e) {
        console.warn('onUpdate handler failed', e);
      }
    }
    setIsUpdating(false);
    return json;
  }

  async function deletePaper(id) {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/paper-sheets", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to delete paper sheet:', res.status, text);
        setIsDeleting(false);
        return;
      }
      // Optionally parse response
      const text = await res.text();
      if (text) {
        try {
          const json = JSON.parse(text);
          if (json && json.id) deleted(json.id);
        } catch (e) {
          // If parse fails, fallback to local optimistic deletion
          deleted(id);
        }
      } else {
        deleted(id);
      }
    } catch (err) {
      console.error('Error deleting paper sheet', err);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={paperName}
        onChange={(e) => setPaperName(e.target.value)}
        placeholder="Kağıt Adı"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="number"
        min={0}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Fiyat"
        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        disabled={isUpdating || isDeleting}
        onClick={() => updatePaper(paperId, paperName, price)}
        className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
      >
        {isUpdating ? (
          "Kaydediliyor"
        ) : (
          <>
            <Pencil size={9} />
            <span className="hidden md:block">Kaydet</span>
          </>
        )}
      </button>
      <button
        onClick={() => deletePaper(paperId)}
        disabled={isUpdating || isDeleting}
        className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
      >
        {isDeleting ? (
          "Siliniyor"
        ) : (
          <>
            <X size={9} />
            <span className="hidden md:block">Sil</span>
          </>
        )}
      </button>
    </div>
  );
}
