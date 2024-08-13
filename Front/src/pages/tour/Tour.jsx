import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Trip from "./trip/Trip";
import TripDetail from "./trip/TripDetail";
import Build from "./build/Build";
import TripCreate from "./trip/TripCreate";
const Tour = () => {
  return (
    <Routes>
      <Route path="trip" element={<Trip></Trip>} />
      <Route path="tripDetail/:t_no" element={<TripDetail />} />
      <Route path="tripCreate" element={<TripCreate />} />
      <Route path="build" element={<Build></Build>} />
    </Routes>
  );
};
export default Tour;
