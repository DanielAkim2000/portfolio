"use client";

import { Toaster as SonnerToaster } from "../ui/sonner";

export type ToasterProps = {};

export const Toaster = (props: ToasterProps) => {
  return <SonnerToaster visibleToasts={1} expand />;
};
