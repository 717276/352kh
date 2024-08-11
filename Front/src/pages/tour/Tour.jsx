import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Trip from "./trip/Trip";
import TripDetail from "./trip/TripDetail";
import Build from "./build/Build";
import TripCreate from "./trip/TripCreate";
const Tour = () => {
  return (
    <Routes>
      <Route path="trip" element={<Trip></Trip>} />
      <Route path="tripDetail/:no" element={<TripDetail />} />
      <Route path="build" element={<Build></Build>} />
      <Route path="tripCreate" element={<TripCreate />} />
    </Routes>
  );
};
export default Tour;
