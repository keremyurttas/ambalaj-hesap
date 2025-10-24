'use client'
// import {promises as fs} from 'fs';
import { useState } from "react";
import { X} from "lucide-react"
export default function AdminPage(){
  const defaultAdminData = {
    kagitTabakaFiyatlari: [
      { id: 1, ad: 'Standart Karton', fiyat: 15 },
      { id: 2, ad: 'Premium Karton', fiyat: 25 },
      { id: 3, ad: 'Lüks Karton', fiyat: 35 }
    ],
    laminasyonFiyatlari: {
      lakli: 2.5,
      parlakSelafon: 3.0,
      matSelafon: 3.5
    }
  };
  const [adminData, setAdminData] = useState(defaultAdminData);
  const addKagitTipi = () => {
    const newId = Math.max(...adminData.kagitTabakaFiyatlari.map(k => k.id), 0) + 1;
    setAdminData({
      ...adminData,
      kagitTabakaFiyatlari: [...adminData.kagitTabakaFiyatlari, { id: newId, ad: '', fiyat: 0 }]
    });
  };

  const updateKagitTipi = (id, field, value) => {
    setAdminData({
      ...adminData,
      kagitTabakaFiyatlari: adminData.kagitTabakaFiyatlari.map(k =>
        k.id === id ? { ...k, [field]: value } : k
      )
    });
  };

  const deleteKagitTipi = (id) => {
    setAdminData({
      ...adminData,
      kagitTabakaFiyatlari: adminData.kagitTabakaFiyatlari.filter(k => k.id !== id)
    });
  };

  const updateLaminasyonFiyat = (tip, value) => {
    setAdminData({
      ...adminData,
      laminasyonFiyatlari: {
        ...adminData.laminasyonFiyatlari,
        [tip]: parseFloat(value) || 0
      }
    });
  };
    return (
           <div className="space-y-6">
            {/* KAĞIT TABAKA FİYATLARI */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-lg md:text-xl font-bold text-blue-600">Kağıt Tabaka Fiyatları</h2>
                <button
                  onClick={addKagitTipi}
                  className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  + Yeni Ekle
                </button>
              </div>
              <div className="space-y-4">
                {adminData.kagitTabakaFiyatlari.map(kagit => (
                  <div key={kagit.id} className="flex flex-col md:flex-row gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={kagit.ad}
                      onChange={(e) => updateKagitTipi(kagit.id, 'ad', e.target.value)}
                      placeholder="Kağıt Adı"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={kagit.fiyat}
                      onChange={(e) => updateKagitTipi(kagit.id, 'fiyat', e.target.value)}
                      placeholder="Fiyat"
                      className="w-full md:w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => deleteKagitTipi(kagit.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      { <X size={18} /> }
                      <span className="md:hidden">Sil</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* LAMİNASYON FİYATLARI */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-6">Laminasyon Fiyatları</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Laklı (₺)
                  </label>
                  <input
                    type="number"
                    value={adminData.laminasyonFiyatlari.lakli}
                    onChange={(e) => updateLaminasyonFiyat('lakli', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parlak Selafon (₺)
                  </label>
                  <input
                    type="number"
                    value={adminData.laminasyonFiyatlari.parlakSelafon}
                    onChange={(e) => updateLaminasyonFiyat('parlakSelafon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mat Selafon (₺)
                  </label>
                  <input
                    type="number"
                    value={adminData.laminasyonFiyatlari.matSelafon}
                    onChange={(e) => updateLaminasyonFiyat('matSelafon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-800 text-sm">
                ℹ️ Değişiklikler anlık olarak kaydedilir. Production ortamında localStorage veya database kullanabilirsiniz.
              </p>
            </div>
          </div>
    )
}