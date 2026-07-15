export type LlmMessage = {
  system: string;
  user: string;
};

export type LlmProviderName = "openai" | "anthropic";

export type LlmProvider = {
  name: LlmProviderName;
  complete: (message: LlmMessage) => Promise<string>;
};

export type LlmCompleteResult = {
  text: string;
  provider: LlmProviderName;
  usedFallback: boolean;
};

export async function completeWithFallback(
  message: LlmMessage,
  primary: LlmProvider,
  fallback: LlmProvider,
): Promise<LlmCompleteResult> {
  try {
    const text = await primary.complete(message);
    return { text, provider: primary.name, usedFallback: false };
  } catch (primaryError) {
    try {
      const text = await fallback.complete(message);
      return { text, provider: fallback.name, usedFallback: true };
    } catch (fallbackError) {
      const primaryMsg =
        primaryError instanceof Error ? primaryError.message : String(primaryError);
      const fallbackMsg =
        fallbackError instanceof Error
          ? fallbackError.message
          : String(fallbackError);
      throw new Error(
        `Primary (${primary.name}) failed: ${primaryMsg}; fallback (${fallback.name}) failed: ${fallbackMsg}`,
      );
    }
  }
}
