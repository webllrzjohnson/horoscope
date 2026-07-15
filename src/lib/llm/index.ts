import { createAnthropicProvider } from "./anthropic";
import { createOpenAIProvider } from "./openai";
import type { LlmProvider, LlmProviderName } from "./types";

export function resolveProviders(
  primaryName: LlmProviderName = (process.env.LLM_PRIMARY as LlmProviderName) ||
    "anthropic",
): { primary: LlmProvider; fallback: LlmProvider } {
  const openai = createOpenAIProvider();
  const anthropic = createAnthropicProvider();

  if (primaryName === "openai") {
    return { primary: openai, fallback: anthropic };
  }

  return { primary: anthropic, fallback: openai };
}

export { createAnthropicProvider } from "./anthropic";
export { createOpenAIProvider } from "./openai";
export { parseReadingOutput, readingOutputSchema } from "./schema";
export {
  completeWithFallback,
  type LlmMessage,
  type LlmProvider,
  type LlmProviderName,
} from "./types";
