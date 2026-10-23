import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** Fallback only: the Worker answers "/" with a redirect based on Accept-Language. */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
