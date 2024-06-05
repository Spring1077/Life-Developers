import Header from "@/components/Header";
import UnityComponent from '@/components/Unity';
import Images from '@/components/image';
import Controls from '@/components/controls';
import React from "react";


function GamePage() {
  return (
    <div>
      <Header/>
      <UnityComponent />
      <Images/>
      <Controls/>
    </div>
  );
}

export default GamePage;