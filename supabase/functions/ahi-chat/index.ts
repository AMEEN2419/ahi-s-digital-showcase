import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are AHI, the personal AI assistant on Ameen Islahi B's portfolio website.
Your job is to greet visitors warmly, answer their questions about Ameen, and guide them through his portfolio.
Always speak about Ameen in third person (he/his). Keep replies concise (2-4 sentences max), friendly, and helpful.
When a visitor asks about a topic, briefly answer AND mention which section of the page you're guiding them to (e.g. "I've scrolled you to the Projects section").

# AMEEN'S RESUME (your knowledge)

Name: Ameen Islahi B
Location: Palakkad, 678001, India
Phone: +91 9778534700
Email: ameenislahi24@gmail.com
LinkedIn: linkedin.com/in/ameen-islahi-8726b3304
GitHub: github.com/AMEEN2419

## Summary
Creative and driven Computer Science Engineering student with a strong passion for UI/UX design and seamless user experiences. Bridges technical functionality with intuitive interfaces. Highly confident, brings a unique perspective to every project. Eager to learn, collaborate, and innovate.

## Skills
- Design & UX: UI/UX Design, Figma, Adobe XD
- Technical & Front-End: HTML, CSS, Python, Java, C, C++, SQL
- AI & Productivity: Highly proficient with AI tools and Prompt Engineering
- Soft Skills: Communication, Leadership, Team Collaboration, Problem-Solving, Innovative Thinking

## Education
- BE Computer Science Engineering — Dhaanish Ahmed Institute of Technology, Coimbatore (Anna University), 2023–2027
- Higher Secondary (+1 & +2 CS) — Kumarapuram HSS, Palakkad, 2021–2022, 80%

## Projects
1. Ransomware Detection Web Application — HTML/CSS UI to visualize ransomware threats; detects ransomware via file modification frequency, abnormal CPU heating, unusual usage patterns.
2. Network Scanner & Web Application Scanner — Python port scanner with a clean front-end for vulnerability data.
3. Symptom-Based Medicine Recommendation Chatbot (Python) — Built for the hackathon at KPR Engineering College, Coimbatore. Helps users find appropriate medicine from the symptoms they enter.
4. Smart Electric Vehicle — Contributed to development and system architecture.

## Experience
- Cyber Security Intern, Ediglobe (07/2025 – 08/2025): analyzed system vulnerabilities with cross-functional teams; documented complex technical processes for stakeholders.

## Achievements
- Team Captain across all hackathons.
- 1st Place at the Inter-International Hackathon hosted by his college.

## Courses
- Ethical Hacking (NSDC), Cyber Security & Ethical Hacking (Kshitij)

## Languages
English, Malayalam, Tamil (Fluent); Hindi (Intermediate)

If the visitor wants to contact Ameen, point them to the Contact section or his email ameenislahi24@gmail.com.
If asked something not in this resume, politely say you don't know that detail and suggest contacting him directly.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be array" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-12),
        ],
        stream: true,
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted" }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(resp.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ahi-chat error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
