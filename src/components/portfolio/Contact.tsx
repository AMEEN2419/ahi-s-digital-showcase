import { useState } from "react";
import Section from "./Section";
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: parsed.data,
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      toast.success("Message sent! Ameen will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast.error(err?.message || "Couldn't send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something.">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Have a project, role, or collaboration in mind? Drop a message — it lands
            straight in my inbox.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-1 text-muted-foreground" />
              <a href="mailto:ameenislahi24@gmail.com" className="story-link">
                ameenislahi24@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-1 text-muted-foreground" />
              <a href="tel:+919778534700" className="story-link">+91 97785 34700</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-muted-foreground" />
              <span>Palakkad, 678001 — India</span>
            </li>
          </ul>

          <div className="flex gap-3 pt-4 border-t border-border">
            <a
              href="https://github.com/AMEEN2419"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/ameen-islahi-8726b3304"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="md:col-span-3 rounded-2xl border border-border bg-card p-8 space-y-5"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground transition-colors"
              placeholder="Your name"
              maxLength={100}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground transition-colors"
              placeholder="you@example.com"
              maxLength={255}
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="mt-2 w-full bg-transparent border-b border-border py-2 outline-none focus:border-foreground transition-colors resize-none"
              placeholder="Tell me about your project…"
              maxLength={2000}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3 text-sm font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {loading ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
