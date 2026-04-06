import { redirect } from "next/navigation";

/** Default entry: depth gallery first; horizontal story lives at `/home` */
export default function RootPage() {
  redirect("/depth-gallery");
}
