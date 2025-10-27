
// // import {promises as fs} from 'fs';
// // import { useState } from "react";
// import { X} from "lucide-react"
// import {prisma} from '@/lib/prisma'
// export default async function AdminPage(){
//   const defaultAdminData = {
//     kagitTabakaFiyatlari: [
//       { id: 1, ad: 'Standart Karton', fiyat: 15 },
//       { id: 2, ad: 'Premium Karton', fiyat: 25 },
//       { id: 3, ad: 'Lüks Karton', fiyat: 35 }
//     ],
//     laminasyonFiyatlari: {
//       lakli: 2.5,
//       parlakSelafon: 3.0,
//       matSelafon: 3.5
//     }
//   };
//   const paperPrices = await prisma.paperSheets.findMany();

//   console.log(paperPrices)
//   // const [adminData, setAdminData] = useState(defaultAdminData);
//   const addKagitTipi =async (name, price)=> await prisma.paperSheets.create({
//     data:{
//       name,price
//     }
//   })

//   // const updateKagitTipi = (id, field, value) => {
//   //   setAdminData({
//   //     ...adminData,
//   //     kagitTabakaFiyatlari: adminData.kagitTabakaFiyatlari.map(k =>
//   //       k.id === id ? { ...k, [field]: value } : k
//   //     )
//   //   });
//   // };

//   // const deleteKagitTipi = (id) => {
//   //   setAdminData({
//   //     ...adminData,
//   //     kagitTabakaFiyatlari: adminData.kagitTabakaFiyatlari.filter(k => k.id !== id)
//   //   });
//   // };

//   // const updateLaminasyonFiyat = (tip, value) => {
//   //   setAdminData({
//   //     ...adminData,
//   //     laminasyonFiyatlari: {
//   //       ...adminData.laminasyonFiyatlari,
//   //       [tip]: parseFloat(value) || 0
//   //     }
//   //   });
//   // };
//     return (
//         <div className="space-y-6">
//             <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                 <h2 className="text-lg md:text-xl font-bold text-blue-600">Kağıt Tabaka Fiyatları</h2>
//                 <button
//                   onClick={addKagitTipi}
//                   className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   + Yeni Ekle
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {adminData.kagitTabakaFiyatlari.map(kagit => (
                  
//                 ))}
//               </div>
//             </div>
//         </div>
//     )
// }