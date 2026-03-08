import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, LogIn } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface LoginPromptProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function LoginPrompt({
  title = "Login to Continue",
  description = "Login with Internet Identity to access this feature securely.",
  showBackButton = false,
  onBack,
}: LoginPromptProps) {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-saffron/20 bg-card shadow-divine">
          {/* Decorative top bar */}
          <div className="h-1.5 gradient-saffron" />

          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, oklch(0.68 0.22 45) 0%, transparent 70%)",
            }}
          />

          <div className="relative px-8 py-10 text-center">
            {/* Sacred emblem */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.12,
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="mb-7 flex justify-center"
            >
              <div className="relative">
                {/* Outer ring glow */}
                <div className="absolute inset-0 rounded-full bg-saffron/15 blur-xl scale-150" />
                {/* Ring */}
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 border-saffron/25"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.975 0.014 72) 0%, oklch(0.94 0.025 68) 100%)",
                    boxShadow:
                      "0 0 0 6px oklch(0.68 0.22 45 / 0.08), 0 8px 32px oklch(0.68 0.22 45 / 0.18)",
                  }}
                >
                  <span
                    className="text-5xl font-display leading-none select-none"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.22 45) 0%, oklch(0.42 0.12 22) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ॐ
                  </span>
                </div>

                {/* Orbiting diya dots */}
                <AnimatePresence>
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <motion.div
                      key={angle}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.4, 0.85, 0.4] }}
                      transition={{
                        delay: 0.3 + i * 0.09,
                        duration: 2.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="absolute w-1.5 h-1.5 rounded-full bg-saffron"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-44px)`,
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.45 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight">
                {title}
              </h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </motion.div>

            {/* Divider with petals */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              className="my-7 flex items-center gap-3"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-saffron/30" />
              <span className="font-body text-xs text-saffron/60 tracking-widest">
                🪔
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-saffron/30" />
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.4 }}
              className="flex flex-wrap gap-2 justify-center mb-7"
            >
              {["Secure & Private", "No Password", "Decentralized"].map(
                (feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-body text-xs font-medium border border-saffron/25 text-saffron bg-saffron/5"
                  >
                    ✓ {feat}
                  </span>
                ),
              )}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Button
                size="lg"
                className="w-full font-body font-semibold text-white border-0 rounded-xl h-12 text-sm shadow-warm transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-saffron active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.22 45) 0%, oklch(0.42 0.12 22) 100%)",
                }}
                onClick={() => login()}
                disabled={isLoggingIn}
                aria-label="Opens Internet Identity in a new tab"
                data-ocid="login.prompt.primary_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Opening Internet Identity…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login with Internet Identity
                  </>
                )}
              </Button>

              {showBackButton && onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full font-body text-sm text-muted-foreground hover:text-saffron hover:bg-saffron/5 transition-all"
                  onClick={onBack}
                  data-ocid="login.prompt.secondary_button"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  Go Back
                </Button>
              )}
            </motion.div>

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-6 font-body text-xs text-muted-foreground/70"
            >
              Internet Identity opens in a new tab. Complete login there, then
              return here.
            </motion.p>
          </div>
        </div>

        {/* Subtle floating petals below card */}
        <div className="flex justify-center gap-4 mt-5" aria-hidden="true">
          {["🌸", "🪔", "🌼"].map((emoji, i) => (
            <motion.span
              key={emoji}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ delay: 0.55 + i * 0.1, duration: 0.4 }}
              className="text-base select-none"
              style={{
                animation: `subtle-float ${3 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
