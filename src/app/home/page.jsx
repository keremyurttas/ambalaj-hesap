'use client'
import React, { useState, useEffect } from 'react';
import { Calculator, Settings, X } from 'lucide-react';



export default function AmbalajMaliyetApp() {
  const [activeTab, setActiveTab] = useState(0);

  const [formData, setFormData] = useState({
    bicakIziEn: '', bicakIziBoy: '', makineOrani: '', adetSayisi: '',
    seciliKagit: '', baskiFiyati: '', laminasyon: '', kesimFiyati: '',
    yapistirmaFiyati: '', bicakBedeli: '', nakliye: ''
  });
  const [araToplam, setAraToplam] = useState(0);
  const [genelToplam, setGenelToplam] = useState(0);

  const adminData={    kagitTabakaFiyatlari: [
      { id: 1, ad: 'Standart Karton', fiyat: 15 },
      { id: 2, ad: 'Premium Karton', fiyat: 25 },
      { id: 3, ad: 'Lüks Karton', fiyat: 35 }
    ],
    laminasyonFiyatlari: {
      lakli: 2.5,
      parlakSelafon: 3.0,
      matSelafon: 3.5
    }}
  const hesaplaAraToplam = () => {
    const en = parseFloat(formData.bicakIziEn) || 0;
    const boy = parseFloat(formData.bicakIziBoy) || 0;
    const oran = parseFloat(formData.makineOrani) || 1;
    const adet = parseFloat(formData.adetSayisi) || 0;
    const kagitFiyat = parseFloat(formData.seciliKagit) || 0;
    const baski = parseFloat(formData.baskiFiyati) || 0;
    const lam = parseFloat(formData.laminasyon) || 0;
    const kesim = parseFloat(formData.kesimFiyati) || 0;
    const yapistirma = parseFloat(formData.yapistirmaFiyati) || 0;

    const alan = en * boy;
    const sonuc = (alan / (1 / oran)) * kagitFiyat * adet * baski * lam * kesim * yapistirma;
    setAraToplam(sonuc);
  };

  const hesaplaGenelToplam = () => {
    const bicak = parseFloat(formData.bicakBedeli) || 0;
    const nakliye = parseFloat(formData.nakliye) || 0;
    setGenelToplam(araToplam + bicak + nakliye);
  };

  useEffect(() => {
    hesaplaAraToplam();
  }, [formData.bicakIziEn, formData.bicakIziBoy, formData.makineOrani, 
      formData.adetSayisi, formData.seciliKagit, formData.baskiFiyati, 
      formData.laminasyon, formData.kesimFiyati, formData.yapistirmaFiyati]);

  useEffect(() => {
    hesaplaGenelToplam();
  }, [araToplam, formData.bicakBedeli, formData.nakliye]);

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };



  return (
   


        

     
          <div className="space-y-6">
            {/* 1. ETAP - BOYUT */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">1. Etap - Boyut Bilgileri</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-800 font-medium text-sm md:text-base">Makine Boyutu: 70 x 100 cm</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bıçak İzi En (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.bicakIziEn}
                      onChange={handleInputChange('bicakIziEn')}
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
                      value={formData.bicakIziBoy}
                      onChange={handleInputChange('bicakIziBoy')}
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
                        value={formData.makineOrani}
                        onChange={handleInputChange('makineOrani')}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Örn: 3"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Örn: 3 (1/3 için), 5 (1/5 için)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adet Sayısı
                    </label>
                    <input
                      type="number"
                      value={formData.adetSayisi}
                      onChange={handleInputChange('adetSayisi')}
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
                    value={formData.seciliKagit}
                    onChange={handleInputChange('seciliKagit')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seçiniz...</option>
                    {adminData.kagitTabakaFiyatlari.map(kagit => (
                      <option key={kagit.id} value={kagit.fiyat}>
                        {kagit.ad} - {kagit.fiyat} ₺
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. ETAP - BASKI */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">2. Etap - Baskı</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birim Baskı Fiyatı (₺)
                </label>
                <input
                  type="number"
                  value={formData.baskiFiyati}
                  onChange={handleInputChange('baskiFiyati')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 0.5"
                />
              </div>
            </div>

            {/* 3. ETAP - LAMİNASYON */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">3. Etap - Laminasyon</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Laminasyon Tipi
                </label>
                <select
                  value={formData.laminasyon}
                  onChange={handleInputChange('laminasyon')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seçiniz...</option>
                  <option value={adminData.laminasyonFiyatlari.lakli}>
                    Laklı - {adminData.laminasyonFiyatlari.lakli} ₺
                  </option>
                  <option value={adminData.laminasyonFiyatlari.parlakSelafon}>
                    Parlak Selafon - {adminData.laminasyonFiyatlari.parlakSelafon} ₺
                  </option>
                  <option value={adminData.laminasyonFiyatlari.matSelafon}>
                    Mat Selafon - {adminData.laminasyonFiyatlari.matSelafon} ₺
                  </option>
                </select>
              </div>
            </div>

            {/* 4. ETAP - KESİM */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">4. Etap - Kesim</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birim Kesim Fiyatı (₺)
                </label>
                <input
                  type="number"
                  value={formData.kesimFiyati}
                  onChange={handleInputChange('kesimFiyati')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 0.3"
                />
              </div>
            </div>

            {/* 5. ETAP - YAPIŞTIRMA */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">5. Etap - Yapıştırma</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birim Yapıştırma Fiyatı (₺)
                </label>
                <input
                  type="number"
                  value={formData.yapistirmaFiyati}
                  onChange={handleInputChange('yapistirmaFiyati')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Örn: 0.2"
                />
              </div>
            </div>

            {/* ARA TOPLAM */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-2xl md:text-3xl font-bold text-center">
                Ara Toplam: {araToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
              </h3>
            </div>

            {/* EK MALİYETLER */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4">Ek Maliyetler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bıçak Bedeli (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.bicakBedeli}
                    onChange={handleInputChange('bicakBedeli')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nakliye (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.nakliye}
                    onChange={handleInputChange('nakliye')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Örn: 200"
                  />
                </div>
              </div>
            </div>

            {/* GENEL TOPLAM */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-xl p-6 md:p-8 text-white">
              <h3 className="text-3xl md:text-4xl font-bold text-center">
                GENEL TOPLAM: {genelToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
              </h3>
            </div>

            {/* HESAPLAMA DETAYLARI */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border-2 border-gray-200">
              <h2 className="text-lg md:text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                📊 Hesaplama Detayları
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                  <p className="font-semibold text-gray-700 mb-2">Ara Toplam Formülü:</p>
                  <p className="text-sm text-gray-600 mb-2">
                    (Alan / (1 / Makine Oranı)) × Kağıt Fiyatı × Adet × Baskı × Laminasyon × Kesim × Yapıştırma
                  </p>
                  <div className="bg-blue-50 p-3 rounded font-mono text-xs md:text-sm">
                    = (({formData.bicakIziEn || 0} × {formData.bicakIziBoy || 0}) / (1 / {formData.makineOrani || 1})) × {formData.seciliKagit || 0} × {formData.adetSayisi || 0} × {formData.baskiFiyati || 0} × {formData.laminasyon || 0} × {formData.kesimFiyati || 0} × {formData.yapistirmaFiyati || 0}
                  </div>
                  <p className="mt-3 text-lg font-bold text-blue-600">
                    = {araToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border-l-4 border-pink-500">
                  <p className="font-semibold text-gray-700 mb-2">Genel Toplam Formülü:</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Ara Toplam + Bıçak Bedeli + Nakliye
                  </p>
                  <div className="bg-pink-50 p-3 rounded font-mono text-xs md:text-sm">
                    = {araToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} + {formData.bicakBedeli || 0} + {formData.nakliye || 0}
                  </div>
                  <p className="mt-3 text-lg font-bold text-pink-600">
                    = {genelToplam.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                  </p>
                </div>
              </div>
            </div>
          </div>
   

      
  );
}