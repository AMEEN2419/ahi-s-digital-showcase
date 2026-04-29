import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(2000),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");

    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { name, email, message } = parsed.data;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fafafa;padding:32px;border-radius:12px;max-width:560px;margin:0 auto">
        <div style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#888;margin-bottom:8px">New Portfolio Message</div>
        <h2 style="margin:0 0 24px;font-weight:700;font-size:22px">${escapeHtml(name)} reached out</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#888;width:80px">From</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}" style="color:#fafafa">${escapeHtml(email)}</a></td></tr>
        </table>
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #222">
          <div style="font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#888;margin-bottom:12px">Message</div>
          <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(message)}</div>
        </div>
        <div style="margin-top:32px;font-size:12px;color:#666">Sent from your portfolio contact form.</div>
      </div>`;

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "AHI Portfolio <onboarding@resend.dev>",
        to: ["ameenislahi24@gmail.com"],
        reply_to: email,
        subject: `Portfolio · ${name}`,
        html,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Resend error", resp.status, data);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-contact-email error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
