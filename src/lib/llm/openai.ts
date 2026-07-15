import OpenAI from "openai";
import type { LlmMessage, LlmProvider } from "./types";

export function createOpenAIProvider(
  apiKey: string = process.env.OPENAI_API_KEY ?? "",
  model: string = process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
): LlmProvider {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const client = new OpenAI({ apiKey });

  return {
    name: "openai",
    async complete(message: LlmMessage) {
      const response = await client.chat.completions.create({
        model,
        temperature: 0.9,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: message.system },
          { role: "user", content: message.user },
        ],
      });

      const text = response.choices[0]?.message?.content;
      if (!text) {
        throw new Error("OpenAI returned an empty completion");
      }
      return text;
    },
  };
}
