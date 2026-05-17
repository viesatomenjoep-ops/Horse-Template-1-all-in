import { Metadata } from "next";
import InstagramClient from "./InstagramClient";

export const metadata: Metadata = {
  title: "Instagram | Equivest Worldwide",
  description: "Explore the possibilities and secure vault at Equivest Worldwide.",
};

export default function InstagramLandingPage() {
  return <InstagramClient />;
}
