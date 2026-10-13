import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const alertInput = z.object({
  alert: z.string().trim().min(3).max(2000),
  context: z.string().trim().min(10).max(6000),
});

export const explainControlCenterAlert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => alertInput.parse(input))
  .handler(async ({ data }) => {
    try {
      const { explainAlertWithGateway } = await import("./alert-explainer/alert-explainer.server");
      const explanation = await explainAlertWithGateway(getRequest(), data);
      return { ok: true as const, explanation };
    } catch (error) {
      const status = error && typeof error === "object" && "status" in error && typeof error.status === "number"
        ? error.status
        : undefined;
      if (error instanceof Error) {
        console.error("[Control Center alert explainer] Request failed", { status, name: error.name });
      }

      let message = "The explanation could not be generated. Please try again.";
      if (status === 401) message = "The AI service is not authorized. Please contact your workspace administrator.";
      else if (status === 402 || status === 403) message = error instanceof Error ? error.message : "AI access is currently unavailable.";
      else if (status === 429) message = "The AI service is busy. Please wait briefly before trying again.";
      else if (status !== undefined && status >= 500) message = "The AI service is temporarily unavailable. Please try again later.";
      else if (error instanceof Error && error.name === "AlertExplainerError") message = error.message;

      return { ok: false as const, error: message };
    }
  });