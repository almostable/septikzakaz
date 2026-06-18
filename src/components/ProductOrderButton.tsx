"use client";

import { useState } from "react";
import LeadFormModal from "./LeadFormModal";

export default function ProductOrderButton({ productName }: { productName: string }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button className="btn" style={{ fontSize: "1.1rem", padding: "15px 30px" }} onClick={() => setModalOpen(true)}>
        Заказать монтаж
      </button>
      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title={`Заказ: ${productName}`} 
        source={`Каталог - ${productName}`} 
      />
    </>
  );
}
