import Anthropic from "@anthropic-ai/sdk";
import type { LlmMessage, LlmProvider } from "./types";

export function createAnthropicProvider(
  apiKey: string = process.env.ANTHROPIC_API_KEY ?? "",
  model: string = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
): LlmProvider {
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const client = new Anthropic({ apiKey });

  return {
    name: "anthropic",
    async complete(message: LlmMessage) {
      const response = await client.messages.create({
        model,
        max_tokens: 600,
        temperature: 0.9,
        system: message.system,
        messages: [{ role: "user", content: message.user }],
      });

      const text = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n")
        .trim();

      if (!text) {
        throw new Error("Anthropic returned an empty completion");
      }
      return text;
    },
  };
}
