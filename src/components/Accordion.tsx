"use client";
import { useState } from "react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="w-full">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b last:border-b-0">
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span>{item.title}</span>
              <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {isOpen && <div className="p-4 text-sm">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}











// import React, { useId, useState, useRef, useEffect } from "react";

// type AccordionItem = {
//   id?: string;
//   title: React.ReactNode;
//   content: React.ReactNode;
// };

// type AccordionProps = {
//   items: AccordionItem[];
//   /** allow more than one panel to be open at once */
//   allowMultiple?: boolean;
//   /** initially opened item ids */
//   defaultOpenIds?: string[];
//   className?: string;
// };

// export default function Accordion({
//   items,
//   allowMultiple = false, // single open is now default
//   defaultOpenIds = [],
//   className = "",
// }: AccordionProps) {
//   const idBase = useId();

//   // store open ids as a set for O(1) checks
//   const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

//   // refs for headers to support keyboard navigation
//   const headersRef = useRef<(HTMLButtonElement | null)[]>([]);

//   useEffect(() => {
//     // ensure defaultOpenIds are present in items
//     const validIds = new Set(items.map((_, i) => items[i].id ?? `${idBase}-item-${i}`));
//     const sanitized = defaultOpenIds.filter((id) => validIds.has(id));
//     if (sanitized.length) setOpenIds(new Set(sanitized));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const toggle = (id: string) => {
//     setOpenIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         if (!allowMultiple) next.clear();
//         next.add(id);
//       }
//       return next;
//     });
//   };

//   const onHeaderKeyDown = (e: React.KeyboardEvent, index: number) => {
//     const max = items.length - 1;
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       const next = index === max ? 0 : index + 1;
//       headersRef.current[next]?.focus();
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       const prev = index === 0 ? max : index - 1;
//       headersRef.current[prev]?.focus();
//     } else if (e.key === "Home") {
//       e.preventDefault();
//       headersRef.current[0]?.focus();
//     } else if (e.key === "End") {
//       e.preventDefault();
//       headersRef.current[max]?.focus();
//     } else if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       const id = items[index].id ?? `${idBase}-item-${index}`;
//       toggle(id);
//     }
//   };

//   return (
//     <div className={`w-full ${className}`.trim()} role="presentation">
//       {items.map((it, i) => {
//         const id = it.id ?? `${idBase}-item-${i}`;
//         const isOpen = openIds.has(id);

//         return (
//           <div key={id} className="border-b last:border-b-0">
//             <h3>
//               <button
//                 ref={(el: HTMLButtonElement | null) => {
//                   headersRef.current[i] = el;
//                 }}
//                 id={`${id}-header`}
//                 aria-controls={`${id}-panel`}
//                 aria-expanded={isOpen}
//                 onKeyDown={(e) => onHeaderKeyDown(e, i)}
//                 onClick={() => toggle(id)}
//                 className={`flex w-full items-center justify-between gap-4 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-150
//                   ${isOpen ? "bg-gray-50" : "bg-white"}`}
//               >
//                 <span className="flex-1 text-sm font-medium">{it.title}</span>

//                 {/* chevron */}
//                 <svg
//                   className={`ml-4 h-5 w-5 transform transition-transform duration-200 ${
//                     isOpen ? "rotate-180" : "rotate-0"
//                   }`}
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   aria-hidden
//                 >
//                   <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </button>
//             </h3>

//             <div
//               id={`${id}-panel`}
//               role="region"
//               aria-labelledby={`${id}-header`}
//               className={`overflow-hidden transition-[max-height] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"`}
//               style={{
//                 // use maxHeight animation; large number when open, 0 when closed
//                 maxHeight: isOpen ? 2000 : 0,
//               }}
//             >
//               <div className="p-4 text-sm text-gray-700 bg-white">{it.content}</div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
