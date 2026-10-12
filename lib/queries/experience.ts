import { createClient } from "@/lib/supabase/client";

export interface Experience {
  id: string;
  company: string;
  role: string;
  employment_type?: string | null;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  description?: string | null;
  responsibilities: string[];
  technologies?: string[] | null;
  logo_url?: string | null;
  display_order: number;
  is_visible: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ExperienceInput = Omit<Experience, "id" | "created_at" | "updated_at">;

export const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: "00000000-0000-0000-0000-000000000201",
    company: "PT Mobil Anak Bangsa",
    role: "Programmer / Software Engineer",
    employment_type: "Full-time",
    location: "Jakarta, Indonesia",
    start_date: "Dec 2025",
    end_date: "Present",
    description: "Leading end-to-end development of internal enterprise systems and managing cloud server infrastructure.",
    responsibilities: [
      "End-to-End System Development: Spearheaded the end-to-end development of PRO-MIS (Portal Management Internal System) as a solo developer, driving the full software lifecycle from system design and architecture to coding and deployment.",
      "AI-Assisted Engineering: Leveraged AI agents (Google Antigravity IDE) to accelerate development workflows, optimize code quality, and efficiently architect complex internal systems.",
      "Cloud Infrastructure Management: Administered and managed the company's cloud server infrastructure to ensure optimal performance, security, and high availability for internal web applications.",
      "Financial & Budget Systems: Engineered an Accounting module to consolidate financial reports across MABI Group subsidiaries by bridging multiple disparate Accurate databases. Developed a Finance & Budget Control module to track annual departmental budgets and monitor cost realization linked to Purchase Requests (PR).",
      "Operational Tracking Solutions: Built an After-Sales Service module for comprehensive unit reporting, enabling real-time recording, tracking, and monitoring of unit damages, adjustments, and maintenance requests."
    ],
    technologies: [
      "PHP",
      "Laravel",
      "PostgreSQL",
      "Windows Server",
      "Cloud Infrastructure",
      "Google Antigravity IDE",
      "Accurate DB"
    ],
    display_order: 1,
    is_visible: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000202",
    company: "PT Asta Protek Jiarsi",
    role: "Programmer",
    employment_type: "Contract",
    location: "Tangerang, Indonesia",
    start_date: "Jan 2024",
    end_date: "Nov 2025",
    description: "Development and maintenance of banking compliance and data integration applications.",
    responsibilities: [
      "Developed and maintained Anti Money Laundering (AML) applications using Laravel & PostgreSQL.",
      "Rewrote AML applications from Laravel using Vue.js & Node.js for enhanced modern architecture.",
      "Implemented ETL processes using Pentaho Data Integration for data transfer across enterprise systems.",
      "Improved system performance and stability through bug fixing and database query optimization.",
      "Created technical documentation for ETL pipelines and data transformation workflows."
    ],
    technologies: [
      "Laravel",
      "PostgreSQL",
      "Vue.js",
      "Node.js",
      "Pentaho Data Integration",
      "ETL"
    ],
    display_order: 2,
    is_visible: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000203",
    company: "PT Asta Protek Jiarsi",
    role: "PHP Programmer",
    employment_type: "Internship",
    location: "Tangerang, Indonesia",
    start_date: "Aug 2023",
    end_date: "Dec 2023",
    description: "Development of banking reporting and self-service internal applications.",
    responsibilities: [
      "Developed Central Bank Reporting (CBR) web applications using Laravel.",
      "Developed Employee Self Service (ESS) systems for web (Laravel) and mobile (Flutter).",
      "Analyzed and resolved bugs while ensuring system stability and high code quality.",
      "Created comprehensive documentation for database queries and user operational guides."
    ],
    technologies: ["PHP", "Laravel", "Flutter", "MySQL", "REST API"],
    display_order: 3,
    is_visible: true,
  },
];

export async function getClientExperienceList(): Promise<Experience[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data && data.length > 0 ? data : DEFAULT_EXPERIENCES;
  } catch (err) {
    console.warn("Client fallback to default experiences:", err);
    return DEFAULT_EXPERIENCES;
  }
}

export async function createExperience(input: ExperienceInput): Promise<Experience> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("experiences")
    .insert([input])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateExperience(
  id: string,
  input: Partial<ExperienceInput>
): Promise<Experience> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("experiences")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteExperience(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function toggleExperienceVisibility(
  id: string,
  isVisible: boolean
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("experiences")
    .update({ is_visible: isVisible, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
