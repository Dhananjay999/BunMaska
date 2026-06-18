import { supabase } from "@/integrations/supabase/client";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  skills: string[] | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  display_order: number | null;
};

export type Project = {
  id: string;
  title: string;
  description: string | null;
  technologies: string[] | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  category: string | null;
  featured: boolean | null;
  display_order: number | null;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number | null;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
  suffix: string | null;
  display_order: number | null;
};

export async function fetchTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as TeamMember[];
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Project[];
}

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function fetchStats(): Promise<Stat[]> {
  const { data, error } = await (supabase.from as any)("stats")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Stat[];
}
