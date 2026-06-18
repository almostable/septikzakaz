"use client";
import { useState } from "react";
import LeadFormModal from "./LeadFormModal";

interface Props {
  label?: string;
  source?: string;
  className?: string;
}

export default function CallToAction({ label = "Получить консультацию", source = "Сайт", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={`btn ${className}`} onClick={() => setOpen(true)}>{label}</button>
      <LeadFormModal isOpen={open} onClose={() => setOpen(false)} title={label} source={source} />
    </>
  );
}
