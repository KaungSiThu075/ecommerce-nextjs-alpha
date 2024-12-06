import type { Metadata } from "next";
import Welcome from "@/app/Welcome";

export default function IndexPage() {
  return (<Welcome />);
}

export const metadata: Metadata = {
  title: "Sneaker Land",
};
