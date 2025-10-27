"use client";

import { useEffect, useState } from "react";
import PaperSheetAdmin from "../components/PaperSheetAdmin";
import LaminationAdmin from "../components/LaminationAdmin";
import { Loader } from "lucide-react";

export default function AdminPage() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [proposalSort, setProposalSort] = useState("desc");
  const [proposalFilter, setProposalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paperSheets, setPaperSheets] = useState([]);
  const [laminations, setLaminations] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [isLoadingProposals, setIsLoadingProposals] = useState(true);
  const [errorProposals, setErrorProposals] = useState(null);

  function deletePaperLocal(id) {
    console.log(id);
    const removedPapers = paperSheets.filter((paper) => paper.id !== id);
    setPaperSheets(removedPapers);
  }
  function deleteLaminationLocal(id) {
    console.log(id);
    const removedLaminatoions = laminations.filter(
      (lamination) => lamination.id !== id
    );
    setLaminations(removedLaminatoions);
  }
  async function createPaper() {
    setIsLoading(true);
    const res = await fetch("/api/paper-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.error("Server error:", res.status);
      const text = await res.text();
      console.error("Response text:", text);
      return;
    }

    // Only parse JSON if there is actually a body
    const text = await res.text();
    if (!text) {
      console.warn("Empty response body");
      return;
    }

    const json = JSON.parse(text);
    console.log("Created paper:", json);
    setPaperSheets([...paperSheets, json]);
    setIsLoading(false);
    return json;
  }
  async function createLamination() {
    setIsLoading(true);
    const res = await fetch("/api/laminations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.error("Server error:", res.status);
      const text = await res.text();
      console.error("Response text:", text);
      return;
    }

    // Only parse JSON if there is actually a body
    const text = await res.text();
    if (!text) {
      console.warn("Empty response body");
      return;
    }

    const json = JSON.parse(text);
    console.log("Created lamination:", json);
    setLaminations([...laminations, json]);
    setIsLoading(false);
    return json;
  }
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
  async function fetchProposals() {
    setIsLoadingProposals(true);
    setErrorProposals(null);
    try {
      const res = await fetch("/api/proposals");
      if (!res.ok) throw new Error("Failed to fetch proposals");
      const json = await res.json();
      setProposals(json);
    } catch (error) {
      setErrorProposals(error.message);
    } finally {
      setIsLoadingProposals(false);
    }
  }

  useEffect(() => {
    async function loadPapers() {
      const laminations = await fetchLaminations();
      const papers = await fetchPapers();
      setPaperSheets(papers);

      setLaminations(laminations);
    }

    loadPapers();
    fetchProposals();
  }, []);

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
      {/* KAĞIT TABAKA FİYATLARI */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-blue-600">
            Kağıt Tabaka Fiyatları
          </h2>
          <button
            onClick={createPaper}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Yeni Ekle
          </button>
        </div>
        <div className="space-y-4">
          {paperSheets &&
            paperSheets.map((paper) => (
              <PaperSheetAdmin
                paper={paper}
                key={paper.id}
                deleted={deletePaperLocal}
                onUpdate={(updated) =>
                  setPaperSheets((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
                }
              />
            ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-blue-600">
            Laminasyon Seçenekleri
          </h2>
          <button
            onClick={createLamination}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Yeni Ekle
          </button>
        </div>
        <div className="space-y-4">
          {laminations &&
            laminations.map((lamination) => (
              <LaminationAdmin
                lamination={lamination}
                key={lamination.id}
                deleted={deleteLaminationLocal}
                onUpdate={(updated) =>
                  setLaminations((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
                }
              />
            ))}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-blue-600">
            Teklif Geçmişi
          </h2>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <input
              type="text"
              value={proposalFilter}
              onChange={e => setProposalFilter(e.target.value)}
              placeholder="Ad ile filtrele..."
              className="px-3 py-2 border rounded focus:ring focus:ring-blue-200 text-sm"
            />
            <select
              value={proposalSort}
              onChange={e => setProposalSort(e.target.value)}
              className="px-3 py-2 border rounded text-sm"
            >
              <option value="desc">En yeni</option>
              <option value="asc">En eski</option>
              <option value="name">Ad (A-Z)</option>
            </select>
          </div>
        </div>
        {isLoadingProposals ? (
          <div className="text-gray-500">Teklifler yükleniyor...</div>
        ) : errorProposals ? (
          <div className="text-red-500">{errorProposals}</div>
        ) : proposals.length === 0 ? (
          <div className="text-gray-500">Henüz teklif yok.</div>
        ) : (
          (() => {
            // Filter and sort proposals
            let filtered = proposals.filter(p =>
              proposalFilter.trim() === "" ? true : p.name?.toLowerCase().includes(proposalFilter.trim().toLowerCase())
            );
            if (proposalSort === "desc") {
              filtered = filtered.sort((a, b) => b.id - a.id);
            } else if (proposalSort === "asc") {
              filtered = filtered.sort((a, b) => a.id - b.id);
            } else if (proposalSort === "name") {
              filtered = filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
            }
            return (
              <div>
                <ul className="divide-y divide-gray-200">
                  {filtered.map((proposal) => (
                    <li key={proposal.id} className="flex items-center justify-between py-3 px-2">
                      <div>
                        <span className="font-semibold text-blue-700">{proposal.name}</span>
                        <span className="ml-2 text-gray-600">{proposal.total ? proposal.total + "₺" : "-"}</span>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                        onClick={() => { setSelectedProposal(proposal); setShowModal(true); }}
                      >
                        Detaylar
                      </button>
                    </li>
                  ))}
                </ul>
                {showModal && selectedProposal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                      <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowModal(false)}
                      >
                        ×
                      </button>
                      <h3 className="text-lg font-bold text-blue-700 mb-4">Teklif Detayları</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-semibold">Ad:</span> {selectedProposal.name}</div>
                        <div><span className="font-semibold">Bıçak En:</span> {selectedProposal.bladeWidth}</div>
                        <div><span className="font-semibold">Bıçak Boy:</span> {selectedProposal.bladeLength}</div>
                        <div><span className="font-semibold">Makine Oranı:</span> {selectedProposal.machineRatio}</div>
                        <div><span className="font-semibold">Adet:</span> {selectedProposal.numOfPieces}</div>
                        <div><span className="font-semibold">Kağıt:</span> {selectedProposal.paperSheet?.name || '-'}</div>
                        <div><span className="font-semibold">Kağıt Fiyatı:</span> {selectedProposal.paperSheetPriceAtProposal}₺</div>
                        <div><span className="font-semibold">Baskı Fiyatı:</span> {selectedProposal.printingPrice}₺</div>
                        <div><span className="font-semibold">Laminasyon:</span> {selectedProposal.laminationObj?.name || '-'}</div>
                        <div><span className="font-semibold">Laminasyon Fiyatı:</span> {selectedProposal.laminationPriceAtProposal}₺</div>
                        <div><span className="font-semibold">Kesim Fiyatı:</span> {selectedProposal.cuttingPrice}₺</div>
                        <div><span className="font-semibold">Yapıştırma Fiyatı:</span> {selectedProposal.gluingPrice}₺</div>
                        <div><span className="font-semibold">Bıçak Bedeli:</span> {selectedProposal.bladePrice}₺</div>
                        <div><span className="font-semibold">Kargo:</span> {selectedProposal.shipping}₺</div>
                        <div><span className="font-semibold">Ara Toplam:</span> {selectedProposal.subtotal ? selectedProposal.subtotal + "₺" : "-"}</div>
                        <div><span className="font-semibold">Genel Toplam:</span> {selectedProposal.total ? selectedProposal.total + "₺" : "-"}</div>
                        <div><span className="font-semibold">Tarih:</span> {selectedProposal.createdAt ? new Date(selectedProposal.createdAt).toLocaleString() : "-"}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </div>
  
    </div>
  );
}
