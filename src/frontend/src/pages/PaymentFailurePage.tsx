import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export function PaymentFailurePage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #6b0f1a 0%, #d4580a 100%)",
      }}
      data-ocid="payment_failure.page"
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
          <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-500">
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl font-bold text-white mb-3 font-display"
        >
          Payment was not completed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-white/80 font-body mb-8 leading-relaxed"
        >
          Don't worry — your cart is still saved. Please try again or choose
          Cash on Delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-semibold font-body"
            onClick={() => navigate({ to: "/checkout" })}
            data-ocid="payment_failure.retry.button"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/10 font-body"
            onClick={() =>
              navigate({ to: "/catalog", search: { category: undefined } })
            }
            data-ocid="payment_failure.shop.button"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
