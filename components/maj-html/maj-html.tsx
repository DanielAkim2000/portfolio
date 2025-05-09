"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MajHtml() {
  const { locale } = useParams();
  useEffect(() => {
    if (locale === "en") {
      document.documentElement.lang = "en";
    } else {
      document.documentElement.lang = "fr";
    }
  }, [locale]);
  return null;
}
