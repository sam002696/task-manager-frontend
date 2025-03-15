import React from "react";

const MainContent = () => {
  return (
    <main className="xl:pl-96">
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        {/* Main area content goes here */}
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to Taskboard
        </h1>
        <p className="mt-2 text-gray-600">Manage your projects efficiently.</p>
      </div>
    </main>
  );
};

export default MainContent;
