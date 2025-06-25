import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import React from "react";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar stays fixed width and full height */}
      <div className="w-64 fixed h-screen z-10">
        <AdminSidebar />
      </div>

      {/* Main Content shifts right to leave space for sidebar */}
      <div className="flex-1 ml-64 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
