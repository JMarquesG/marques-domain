"use client";

import React from "react";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../src/App"), { ssr: true });

export function ClientOnly() {
  return <App />;
}
