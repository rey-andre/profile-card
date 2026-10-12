import { createPublicClient } from "@/lib/supabase/server";
import { type Experience, DEFAULT_EXPERIENCES } from "./experience";

export async function getExperienceList(): Promise<Experience[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("is_visible", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase experiences fetch returned error, falling back to default resume data:", error.message);
      return DEFAULT_EXPERIENCES;
    }

    if (data && data.length > 0) {
      return data;
    }

    return DEFAULT_EXPERIENCES;
  } catch (err) {
    console.warn("Failed to fetch experiences from Supabase, using default experiences:", err);
    return DEFAULT_EXPERIENCES;
  }
}
