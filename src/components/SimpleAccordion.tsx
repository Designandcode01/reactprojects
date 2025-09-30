"use client";
import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

const items: AccordionItem[] = [
  { title: "What is React?", content: "A JS library for UIs." },
  { title: "What is TypeScript?", content: "A typed superset of JS." },
  { title: "What is Tailwind CSS?", content: "A utility-first CSS framework." },
];

export default function SimpleAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // default first open

  return (
    <div className="max-w-xl mx-auto divide-y divide-gray-200 rounded-lg border">
      {items.map((item, i) => (
        <div key={i}>

          <button
            className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            
            {item.title}

            <span>{openIndex === i ? "−" : "+"}</span>
          </button>

          {openIndex === i && (
            <div className="p-4 bg-gray-50 text-gray-700">{item.content}</div>
          )}

        </div>
      ))}
    </div>
  );
}
