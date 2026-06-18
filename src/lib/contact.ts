import { supabase } from "@/integrations/supabase/client";

export type ContactInquiry = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

export async function submitContactInquiry(inquiry: ContactInquiry): Promise<void> {
  const { error } = await supabase.from("contact_inquiries").insert({
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company || null,
    phone: inquiry.phone || null,
    message: inquiry.message,
  });

  if (error) throw error;
}
