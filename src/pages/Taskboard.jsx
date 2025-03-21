import React, { useState } from "react";

import Topbar from "../components/taskboard/Topbar";
import MainContent from "../components/taskboard/MainContent";
import Sidebar from "../components/taskboard/SIdebar";

const Taskboard = () => {
  // State to manage the sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/*  Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/*  Main Layout */}
      <div className="flex flex-col flex-1 lg:pl-20">
        {/*  Top Bar */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/*  Main Content */}
        <MainContent />
      </div>
    </div>
  );
};

export default Taskboard;
