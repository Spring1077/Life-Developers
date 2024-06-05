import Header from "@/components/Header";
import UnityComponent from '@/components/Unity';
import React from "react";


function GamePage() {
  return (
    <div>
      <Header/>
      <div style={{ width: '100vw', height: '100vh' }}>
      <UnityComponent />
    </div>
    </div>
  );
}

export default GamePage;