// export default function CreatorDashboard() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-purple-100">
//       <h1 className="text-3xl font-bold text-purple-700">
//         Creator Dashboard 🎨
//       </h1>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../services/api";

// type CreatorStats = {
//   totalEarnings: number;
//   totalTasks: number;
//   completedTasks: number;
// };

// export default function CreatorDashboard() {
//   const [stats, setStats] = useState<CreatorStats | null>(null);

//   useEffect(() => {
//     api.get("/creator/stats")
//       .then(res => setStats(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="min-h-screen bg-purple-100 p-8">
//       <h1 className="text-3xl font-bold text-purple-700 mb-6">
//         Creator Dashboard 🎨
//       </h1>

//       {!stats ? (
//         <p className="text-purple-600">Loading data...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>Total Earnings</p>
//             <h2 className="text-2xl font-bold">₹{stats.totalEarnings}</h2>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>Total Tasks</p>
//             <h2 className="text-2xl font-bold">{stats.totalTasks}</h2>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <p>Completed Tasks</p>
//             <h2 className="text-2xl font-bold">{stats.completedTasks}</h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import Navbar from "../../components/Navbar";

export default function CreatorDashboard() {
  return (
    <div className="min-h-screen bg-purple-100">
      <Navbar role="CREATOR" />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-purple-700">
          Creator Dashboard 🎨
        </h1>
      </div>
    </div>
  );
}
