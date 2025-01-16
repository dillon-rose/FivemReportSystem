import React from "react";
import { debugData } from "./utils/debugData";
import { Card } from "./components/ui/Card";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center items-center h-[100vh] w-full">
      <Card className="w-[75vw] h-[75vh] grid grid-cols-[20%_80%]">
          <Navbar />
          <div className="bg-slate-800 rounded-lg">
            <Outlet />
          </div>
          <Toaster/>
      </Card>
    </div>
  );
};

export default App;
