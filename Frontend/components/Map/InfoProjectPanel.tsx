// "use client";

// import { useState } from "react";
// import InfoButton from "./InfoButton";
// import ProjectsButton from "./ProjectsButton";

// // ----------------------------- types
// interface InfoProjectsPanelProps {
//   selectedDistrict: {
//     district_name: string;
//     division_name: string;
//     province_name: string;
//     id: number;
//     centroid_lat: number;
//     centroid_long: number;
//   } | null;
// }


// export default function InfoProjectsPanel({
//   selectedDistrict,
// }: InfoProjectsPanelProps) {
//   const [showInfo, setShowInfo] = useState(false);

//   return (
//     <div className="flex flex-col gap-3 relative text-black">
     
//       <div className="flex gap-3">
//         <InfoButton
//           onClick={() =>
//             selectedDistrict && setShowInfo((prev) => !prev)
//           }
//         />
//         <ProjectsButton />
//       </div>

  
//       {selectedDistrict && showInfo && (
//   <div className="absolute top-12 left-0 p-4 w-72 bg-white rounded shadow-md z-50">
//     <h3 className="font-bold mb-2">District Info</h3>
//     <p><b>District:</b> {selectedDistrict.district_name}</p>
//     <p><b>Division:</b> {selectedDistrict.division_name}</p>
//     <p><b>Province:</b> {selectedDistrict.province_name}</p>
//     <p><b>ID:</b> {selectedDistrict.id}</p>
//     <p>
//       <b>Centroid:</b> {selectedDistrict.centroid_lat}, {selectedDistrict.centroid_long}
//     </p>
//   </div>
// )}

//     </div>
//   );
// }
