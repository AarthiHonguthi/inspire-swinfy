"use client"; // Mark this component as a Client Component

import React from "react";
import { useParams } from "next/navigation";
import FindSpeakerPage from "../../../components/SpeakerCollection";

export default function Home() {
  const params = useParams();
  const category = params?.category as string; // Assert category as a string

  if (!category) return null; // Handle undefined category

  return (
    <>
      <FindSpeakerPage category={category} /> {/* Pass category as a prop */}
    </>
  );
}
