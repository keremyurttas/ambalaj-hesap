"use client";
import { useState } from "react";
import { Pencil, X } from "lucide-react";

export default function LaminationAdmin({ lamination, deleted, onUpdate }) {
  const laminationId = lamination.id;
  const [laminationName, setLaminationName] = useState(lamination.name);
  const [price, setPrice] = useState(lamination.price);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  async function updateLamination(id, name, price) {
    setIsUpdating(true);
    // If both fields are empty/zero, delete instead of saving
    const isNameEmpty = !name || name.toString().trim() === "";
    const numericPrice = Number(price || 0);
    const isPriceEmpty = price === "" || numericPrice === 0;
    if (isNameEmpty && isPriceEmpty) {
      await deleteLamination(id);
      setIsUpdating(false);
      return;
    }

    const res = await fetch("/api/laminations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name,
        price,
      }),
    });

    const json = await res.json();
 
    if (!res.ok) {
      console.error("error while updating lamination");
    }
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

  async function deleteLamination(id) {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/laminations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('Failed to delete lamination:', res.status, text);
        setIsDeleting(false);
        return;
      }
      const text = await res.text();
      if (text) {
        try {
          const json = JSON.parse(text);
          if (json && json.id) deleted(json.id);
        } catch (e) {
          deleted(id);
        }
      } else {
        deleted(id);
      }
    } catch (err) {
      console.error('Error deleting lamination', err);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={laminationName}
        onChange={(e) => setLaminationName(e.target.value)}
        placeholder="Kağıt Adı"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="number"
        value={price}
        min={0}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Fiyat"
        className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        disabled={isUpdating || isDeleting}
        onClick={() => updateLamination(laminationId, laminationName, price)}
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
        onClick={() => deleteLamination(laminationId)}
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
