// export default function ViewerDashboard() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-green-100">
//       <h1 className="text-3xl font-bold text-green-700">
//         Viewer Dashboard 👤
//       </h1>
//     </div>
//   );
// }


import Navbar from "../../components/Navbar";

export default function ViewerDashboard() {
  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar role="Viewer" />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Viewer Dashboard 👤
        </h1>
      </div>
    </div>
  );
}
