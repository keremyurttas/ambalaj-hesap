"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Loader } from "lucide-react";

export default function AmbalajMaliyetApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bladeWidth: "",
    bladeLength: "",
    machineRatio: "",
    numOfPieces: "",
    selectedPaper: "", // will be PaperSheets id
    printingPrice: "",
    lamination: "", // will be Laminations id
    cuttingPrice: "",
    gluingPrice: "",
    bladePrice: "",
    shipping: "",
  });
  const [paperSheets, setPaperSheets] = useState([]);
  const [laminations, setLaminations] = useState([]);
  const [isSavingProposal, setIsSavingProposal] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProposal = async () => {
    setIsSavingProposal(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      // Construct proposal data
      // Find selected paper and lamination objects
      const selectedPaperObj = paperSheets.find(
        (p) => p.id === Number(formData.selectedPaper)
      );
      const selectedLaminationObj = laminations.find(
        (l) => l.id === Number(formData.lamination)
      );
      console.log(subTotal, total);

      const proposalData = {
        name: formData.name,
        bladeWidth: Number(formData.bladeWidth),
        bladeLength: Number(formData.bladeLength),
        machineRatio: Number(formData.machineRatio),
        numOfPieces: Number(formData.numOfPieces),
        selectedPaper: selectedPaperObj ? selectedPaperObj.id : null,
        paperSheetPriceAtProposal: selectedPaperObj
          ? selectedPaperObj.price
          : null,
        printingPrice: Number(formData.printingPrice),
        lamination: selectedLaminationObj ? selectedLaminationObj.id : null,
        laminationPriceAtProposal: selectedLaminationObj
          ? selectedLaminationObj.price
          : null,
        cuttingPrice: Number(formData.cuttingPrice),
        gluingPrice: Number(formData.gluingPrice),
        bladePrice: Number(formData.bladePrice),
        shipping: Number(formData.shipping),
        subTotal: Math.round(Number(subTotal)),
        total: Math.round(Number(total)),
      };
      console.log("Sending proposalData:", proposalData);
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
      });
      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.message || "Teklif kaydedilemedi.");
      }
      setSaveSuccess(true);
      setSaveError("");
      // Optionally reset form
      // setFormData({ ...initial values... });
    } catch (error) {
      setSaveError(error.message || "Teklif kaydedilemedi.");
      setSaveSuccess(false);
    } finally {
      setIsSavingProposal(false);
    }
  };

  const subTotal = useMemo(() => {
    const en = parseFloat(formData.bladeWidth);
    const boy = parseFloat(formData.bladeLength);
    const oran = parseFloat(formData.machineRatio);

    if (!en || en <= 0) return 0;
    if (!boy || boy <= 0) return 0;
    if (!oran || oran <= 0) return 0;

    const adet = parseFloat(formData.numOfPieces) || 0;
    // Get price from selected object, not id
    const selectedPaperObj = paperSheets.find(
      (p) => p.id === Number(formData.selectedPaper)
    );
    const kagitFiyat = selectedPaperObj ? selectedPaperObj.price : 0;
    const baski = parseFloat(formData.printingPrice) || 0;
    const selectedLaminationObj = laminations.find(
      (l) => l.id === Number(formData.lamination)
    );
    const lam = selectedLaminationObj ? selectedLaminationObj.price : 0;
    const kesim = parseFloat(formData.cuttingPrice) || 0;
    const yapistirma = parseFloat(formData.gluingPrice) || 0;

    const alan = en * boy;
    // Corrected cost calculation
    const paperCost = (alan / (1 / oran)) * kagitFiyat * adet;
    const printingCost = adet * baski;
    const laminationCost = adet * lam;
    const cuttingCost = adet * kesim;
    const gluingCost = adet * yapistirma;
    const sonuc =
      paperCost + printingCost + laminationCost + cuttingCost + gluingCost;

    return isNaN(sonuc) ? 0 : sonuc;
  }, [formData, paperSheets, laminations]);
  const total = useMemo(() => {
    const bicak = parseFloat(formData.bladePrice) || 0;
    const shipping = parseFloat(formData.shipping) || 0;
    return subTotal + bicak + shipping;
  }, [subTotal, formData.bladePrice, formData.shipping]);

  async function fetchPapers() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/paper-sheets");

      if (!res.ok) {
        throw new Error("Failed to fetch papers");
      }

      const json = await res.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      console.error("Error fetching papers:", error);
      // Show user-friendly error message

      throw error; // Re-throw so caller knows it failed
    } finally {
      setIsLoading(false);
    }
  }
  async function fetchLaminations() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/laminations");

      if (!res.ok) {
        throw new Error("Failed to fetch papers");
      }

      const json = await res.json();
      setIsLoading(false);
      return json;
    } catch (error) {
      console.error("Error fetching papers:", error);
      // Show user-friendly error message

      throw error; // Re-throw so caller knows it failed
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function loadPapers() {
      const papers = await fetchPapers();
      setPaperSheets(papers);
      const laminations = await fetchLaminations();
      setLaminations(laminations);
      console.log(laminations);
    }

    loadPapers();
  }, []);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          Teklif ismi
        </h2>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Teklif ismi
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="X Şirketi Y Ambalajı"
        />
      </div>
      {/* 1. ETAP - BOYUT */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          1. Etap - Boyut Bilgileri
        </h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-800 font-medium text-sm md:text-base">
              Makine Boyutu: 70 x 100 cm
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bıçak İzi En (cm)
              </label>
              <input
                type="number"
                min={0}
                value={formData.bladeWidth}
                onChange={handleInputChange("bladeWidth")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: 15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bıçak İzi Boy (cm)
              </label>
              <input
                type="number"
                min={0}
                value={formData.bladeLength}
                onChange={handleInputChange("bladeLength")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: 20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Makinenin Oranı (Payda)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">1 /</span>
                <input
                  type="number"
                  min={0}
                  value={formData.machineRatio}
                  onChange={handleInputChange("machineRatio")}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 3"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Örn: 3 (1/3 için), 5 (1/5 için)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adet Sayısı
              </label>
              <input
                type="number"
                min={0}
                value={formData.numOfPieces}
                onChange={handleInputChange("numOfPieces")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: 1000"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kağıt Tabaka Fiyatı
            </label>
            <select
              value={formData.selectedPaper}
              onChange={handleInputChange("selectedPaper")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seçiniz...</option>
              {paperSheets?.map((paper) => (
                <option key={paper.id} value={paper.id}>
                  {paper.name} - {paper.price} ₺
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. ETAP - BASKI */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          2. Etap - Baskı
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birim Baskı Fiyatı (₺)
          </label>
          <input
            type="number"
            min={0}
            value={formData.printingPrice}
            onChange={handleInputChange("printingPrice")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Örn: 0.5"
          />
        </div>
      </div>

      {/* 3. ETAP - LAMİNASYON */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          3. Etap - Laminasyon
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Laminasyon tipi
          </label>
          <select
            value={formData.lamination}
            onChange={handleInputChange("lamination")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Seçiniz...</option>
            {laminations?.map((lamination) => (
              <option key={lamination.id} value={lamination.id}>
                {lamination.name} - {lamination.price} ₺
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. ETAP - KESİM */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          4. Etap - Kesim
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birim Kesim Fiyatı (₺)
          </label>
          <input
            type="number"
            min={0}
            value={formData.cuttingPrice}
            onChange={handleInputChange("cuttingPrice")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Örn: 0.3"
          />
        </div>
      </div>

      {/* 5. ETAP - YAPIŞTIRMA */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          5. Etap - Yapıştırma
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birim Yapıştırma Fiyatı (₺)
          </label>
          <input
            type="number"
            min={0}
            value={formData.gluingPrice}
            onChange={handleInputChange("gluingPrice")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Örn: 0.2"
          />
        </div>
      </div>

      {/* ARA TOPLAM */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-2xl md:text-3xl font-bold text-center">
          Ara Toplam:{" "}
          {subTotal.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ₺
        </h3>
      </div>

      {/* EK MALİYETLER */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">
          Ek Maliyetler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bıçak Bedeli (₺)
            </label>
            <input
              type="number"
              min={0}
              value={formData.bladePrice}
              onChange={handleInputChange("bladePrice")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Örn: 500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kargo (₺)
            </label>
            <input
              type="number"
              min={0}
              value={formData.shipping}
              onChange={handleInputChange("shipping")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Örn: 200"
            />
          </div>
        </div>
      </div>

      {/* GENEL TOPLAM */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-xl p-6 md:p-8 text-white">
        <h3 className="text-3xl md:text-4xl font-bold text-center">
          GENEL TOPLAM:{" "}
          {total.toLocaleString("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          ₺
        </h3>
      </div>

      {/* HESAPLAMA DETAYLARI */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border-2 border-gray-200">
        <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
          📊 Hesaplama Detayları
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
          <div className="bg-white p-4 rounded border-l-4 border-blue-500">
            <p className="font-semibold text-gray-700 mb-2">
              Ara Toplam Formülü:
            </p>
            <p className="text-sm text-gray-600 mb-2">
              (Alan / (1 / Makine Oranı)) × Kağıt Fiyatı × Adet × Baskı ×
              lamination × Kesim × Yapıştırma
            </p>
            <div className="bg-blue-50 p-3 rounded font-mono text-xs md:text-sm">
              = (({formData.bladeWidth || 0} × {formData.bladeLength || 0}) / (1
              / {formData.machineRatio || 1})) × {formData.selectedPaper || 0} ×{" "}
              {formData.numOfPieces || 0} × {formData.printingPrice || 0} ×{" "}
              {formData.lamination || 0} × {formData.cuttingPrice || 0} ×{" "}
              {formData.gluingPrice || 0}
            </div>
            <p className="mt-3 text-lg font-bold text-blue-600">
              ={" "}
              {subTotal.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ₺
            </p>
          </div>

          <div className="bg-white p-4 rounded border-l-4 border-pink-500">
            <p className="font-semibold text-gray-700 mb-2">
              Genel Toplam Formülü:
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Ara Toplam + Bıçak Bedeli + shipping
            </p>
            <div className="bg-pink-50 p-3 rounded font-mono text-xs md:text-sm">
              ={" "}
              {subTotal.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              + {formData.bladePrice || 0} + {formData.shipping || 0}
            </div>
            <p className="mt-3 text-lg font-bold text-pink-600">
              ={" "}
              {total.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ₺
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleSaveProposal}
        disabled={isSavingProposal}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mt-4"
      >
        {isSavingProposal ? "Kaydediliyor..." : "Kaydet"}
      </button>
      {saveError && <div className="text-red-500 mt-2">{saveError}</div>}
      {saveSuccess && (
        <div className="text-green-500 mt-2">Teklif başarıyla kaydedildi!</div>
      )}
    </div>
  );
}
