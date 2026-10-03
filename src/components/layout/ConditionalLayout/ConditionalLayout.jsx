"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  navbar,
  children,
  footer,
}) {
  const pathname = usePathname();

  const isStudio = pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && navbar}

      {children}

      {!isStudio && footer}
    </>
  );
}