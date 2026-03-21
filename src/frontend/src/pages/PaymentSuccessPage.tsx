import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get("session_id"));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #6b0f1a 0%, #d4580a 100%)",
      }}
      data-ocid="payment_success.page"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 max-w-md w-full text-center border border-white/20 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-amber-400/20 flex items-center justify-center border-2 border-amber-400">
            <CheckCircle2 className="w-10 h-10 text-amber-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl font-bold text-white mb-3 font-display"
        >
          Payment Successful! 🙏
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/80 font-body mb-2 leading-relaxed"
        >
          Your order has been placed. May this purchase bring peace and
          prosperity.
        </motion.p>

        {sessionId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-white/50 text-xs font-body mb-6"
          >
            Order ref: {sessionId.slice(0, 16)}…
          </motion.p>
        )}
        {!sessionId && <div className="mb-6" />}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold font-body"
            onClick={() => navigate({ to: "/my-dashboard" })}
            data-ocid="payment_success.dashboard.button"
          >
            View My Orders
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/10 font-body"
            onClick={() =>
              navigate({ to: "/catalog", search: { category: undefined } })
            }
            data-ocid="payment_success.shop.button"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
