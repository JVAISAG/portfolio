import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { buildSystemPrompt } from "@/lib/prompt";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://example.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "example_token",
});

// Create a new ratelimiter, that allows 10 requests per 10 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  analytics: true,
});

const FREE_MODELS = [
  "google/gemma-4-31b-it:free",
  "openrouter/free"
];

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    // Only apply rate limiting if credentials are provided
    if (
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json(
          { reply: "Rate limit exceeded. Please try again in a few minutes." },
          { status: 429 },
        );
      }
    }

    const body = await req.json();
    const { message, history = [], mode = "Engineer" } = body;

    // Basic input validation
    if (!message || message.length > 500) {
      return NextResponse.json(
        {
          reply:
            "Message too long or missing. Please keep it under 500 characters.",
        },
        { status: 400 },
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        {
          reply:
            "API Key missing: Please add OPENROUTER_API_KEY to your .env.local file.",
        },
        { status: 500 },
      );
    }

    const systemPrompt = buildSystemPrompt(mode);

    const payload = {
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message },
      ],
      max_tokens: 800,
      stream: true,
    };

    let response: Response | null = null;
    let lastError = "";

    for (const model of FREE_MODELS) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://ai-resume.vercel.app", 
            "X-Title": "AI Resume Portfolio"
          },
          body: JSON.stringify({ ...payload, model })
        });
        
        if (res.ok) {
          response = res;
          break;
        } else {
          const errorText = await res.text();
          console.error(`API Error with model ${model}:`, res.status, errorText);
          lastError = `Status ${res.status}: ${errorText}`;
        }
      } catch (error) {
        console.error(`Network Error with model ${model}:`, error);
        lastError = String(error);
      }
    }

    if (!response || !response.body) {
      return NextResponse.json(
        { reply: `All free models failed. Last error: ${lastError}` },
        { status: 502 }
      );
    }

    // Return the raw SSE stream from OpenRouter to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        reply:
          "An error occurred while communicating with the AI. Please try again.",
      },
      { status: 500 },
    );
  }
}
