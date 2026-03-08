import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Flower2,
  Minus,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend.d";
import { PRODUCT_IMAGES } from "../data/productImages";
import { useAllProducts } from "../hooks/useQueries";
import {
  type Schedule,
  type ScheduleItem,
  TIME_SLOTS,
  useSchedule,
} from "../hooks/useSchedule";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatPrice(paise: bigint) {
  return `₹${(Number(paise) / 100).toFixed(0)}`;
}

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

// ==================== STEP INDICATOR ====================
function StepIndicator({ step }: { step: number }) {
  const steps = ["Pick Items", "Delivery Time", "Review & Confirm"];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-body font-bold transition-all duration-300 ${
              i + 1 < step
                ? "bg-green-500 text-white"
                : i + 1 === step
                  ? "bg-saffron text-white"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {i + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span
            className={`font-body text-xs hidden sm:block ${
              i + 1 === step
                ? "text-saffron font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-6 sm:w-10 transition-all duration-500 ${
                i + 1 < step ? "bg-green-400" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== STEP 1 ====================
function Step1({
  quantities,
  onQuantityChange,
  onNext,
}: {
  quantities: Record<string, number>;
  onQuantityChange: (productId: string, qty: number) => void;
  onNext: () => void;
}) {
  const { data: allProducts = [], isLoading } = useAllProducts();
  const scheduleProducts = allProducts.filter(
    (p) =>
      p.category === ProductCategory.flowers ||
      p.category === ProductCategory.haar,
  );
  const hasSelection = Object.values(quantities).some((q) => q > 0);

  const flowers = scheduleProducts.filter(
    (p) => p.category === ProductCategory.flowers,
  );
  const haars = scheduleProducts.filter(
    (p) => p.category === ProductCategory.haar,
  );

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Pick Your Items
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Choose flowers and garlands for your daily schedule
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Flowers */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flower2 className="w-4 h-4 text-saffron" />
              <h3 className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
                Fresh Flowers 🌸
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {flowers.map((product, idx) => {
                const key = product.id.toString();
                const qty = quantities[key] ?? 0;
                const img = PRODUCT_IMAGES[Number(product.id)];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    data-ocid={`schedule.product.item.${idx + 1}`}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 ${
                      qty > 0
                        ? "border-saffron bg-saffron/5"
                        : "border-border bg-card hover:border-saffron/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
                      {img ? (
                        <img
                          src={img}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0 text-lg">
                          🌸
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          {formatPrice(product.price)}/{product.unit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full border-saffron text-saffron hover:bg-saffron hover:text-white"
                        onClick={() =>
                          onQuantityChange(key, Math.max(0, qty - 1))
                        }
                        disabled={qty === 0}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-body text-sm font-bold w-5 text-center">
                        {qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full border-saffron text-saffron hover:bg-saffron hover:text-white"
                        onClick={() => onQuantityChange(key, qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Haar */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">💐</span>
              <h3 className="font-body font-semibold text-sm text-foreground uppercase tracking-wide">
                Haar & Garlands 💐
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {haars.map((product, idx) => {
                const key = product.id.toString();
                const qty = quantities[key] ?? 0;
                const img = PRODUCT_IMAGES[Number(product.id)];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (idx + flowers.length) * 0.05 }}
                    data-ocid={`schedule.product.item.${idx + flowers.length + 1}`}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 ${
                      qty > 0
                        ? "border-saffron bg-saffron/5"
                        : "border-border bg-card hover:border-saffron/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0 mr-3">
                      {img ? (
                        <img
                          src={img}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center flex-shrink-0 text-lg">
                          💐
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          {formatPrice(product.price)}/{product.unit}
                          {product.occasionTag && (
                            <span className="ml-1 text-amber-600">
                              • {product.occasionTag}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full border-saffron text-saffron hover:bg-saffron hover:text-white"
                        onClick={() =>
                          onQuantityChange(key, Math.max(0, qty - 1))
                        }
                        disabled={qty === 0}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-body text-sm font-bold w-5 text-center">
                        {qty}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full border-saffron text-saffron hover:bg-saffron hover:text-white"
                        onClick={() => onQuantityChange(key, qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          className="bg-saffron hover:bg-saffron-dark text-white font-body px-8"
          disabled={!hasSelection}
          onClick={onNext}
          data-ocid="schedule.step1.next.button"
        >
          Next: Choose Delivery Time
        </Button>
      </div>
    </div>
  );
}

// ==================== STEP 2 ====================
function Step2({
  timeSlotId,
  days,
  startDate,
  endDate,
  noEndDate,
  onTimeSlotChange,
  onDaysChange,
  onStartDateChange,
  onEndDateChange,
  onNoEndDateChange,
  onBack,
  onNext,
}: {
  timeSlotId: string;
  days: string[];
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  onTimeSlotChange: (id: string) => void;
  onDaysChange: (days: string[]) => void;
  onStartDateChange: (d: string) => void;
  onEndDateChange: (d: string) => void;
  onNoEndDateChange: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const canProceed = timeSlotId !== "" && days.length > 0 && startDate !== "";

  const toggleDay = (day: string) => {
    onDaysChange(
      days.includes(day) ? days.filter((d) => d !== day) : [...days, day],
    );
  };

  const selectAllDays = () => {
    onDaysChange(DAYS_OF_WEEK);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Choose Delivery Time & Days
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-6">
        When should we deliver your flowers?
      </p>

      {/* Time Slots */}
      <div className="mb-6">
        <Label className="font-body font-semibold text-sm text-foreground mb-3 block">
          <Clock className="w-4 h-4 inline mr-1.5 text-saffron" />
          Delivery Time Slot
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => (
            <button
              type="button"
              key={slot.id}
              onClick={() => onTimeSlotChange(slot.id)}
              data-ocid="schedule.timeSlot.radio"
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                timeSlotId === slot.id
                  ? "border-saffron bg-saffron/8"
                  : "border-border bg-card hover:border-saffron/40"
              }`}
            >
              <span className="text-2xl">{slot.icon}</span>
              <div>
                <p className="font-body font-semibold text-sm text-foreground">
                  {slot.label}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {slot.time}
                </p>
              </div>
              <div className="ml-auto">
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    timeSlotId === slot.id
                      ? "border-saffron bg-saffron"
                      : "border-muted-foreground"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Days of Week */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="font-body font-semibold text-sm text-foreground">
            <CalendarDays className="w-4 h-4 inline mr-1.5 text-saffron" />
            Days of Week
          </Label>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-saffron hover:bg-saffron/10 h-7 font-body"
            onClick={selectAllDays}
            data-ocid="schedule.everyDay.button"
          >
            Every Day
          </Button>
        </div>
        <div className="flex flex-wrap gap-2" data-ocid="schedule.days.toggle">
          {DAYS_OF_WEEK.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium border-2 transition-all duration-200 ${
                days.includes(day)
                  ? "border-saffron bg-saffron text-white"
                  : "border-border bg-card text-foreground hover:border-saffron/50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="font-body text-sm font-medium text-foreground mb-2 block">
            Start Date
          </Label>
          <Input
            type="date"
            min={getTodayString()}
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="font-body"
            data-ocid="schedule.startDate.input"
          />
        </div>
        <div>
          <Label className="font-body text-sm font-medium text-foreground mb-2 block">
            End Date{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </Label>
          <Input
            type="date"
            min={startDate || getTodayString()}
            value={endDate}
            disabled={noEndDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="font-body disabled:opacity-50"
            data-ocid="schedule.endDate.input"
          />
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id="noEndDate"
              checked={noEndDate}
              onCheckedChange={(v) => onNoEndDateChange(!!v)}
              data-ocid="schedule.noEndDate.checkbox"
            />
            <Label
              htmlFor="noEndDate"
              className="font-body text-xs text-muted-foreground cursor-pointer"
            >
              No end date (ongoing schedule)
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          className="font-body border-border"
          onClick={onBack}
          data-ocid="schedule.step2.back.button"
        >
          Back
        </Button>
        <Button
          className="bg-saffron hover:bg-saffron-dark text-white font-body px-8"
          disabled={!canProceed}
          onClick={onNext}
          data-ocid="schedule.step2.next.button"
        >
          Review Schedule
        </Button>
      </div>
    </div>
  );
}

// ==================== STEP 3 ====================
function Step3({
  items,
  timeSlotId,
  days,
  startDate,
  endDate,
  noEndDate,
  onBack,
  onConfirm,
}: {
  items: ScheduleItem[];
  timeSlotId: string;
  days: string[];
  startDate: string;
  endDate: string;
  noEndDate: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const slot = TIME_SLOTS.find((s) => s.id === timeSlotId);
  const dailyTotal = items.reduce(
    (sum, item) => sum + (Number(item.price) / 100) * item.quantity,
    0,
  );

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Review & Confirm
      </h2>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Check your schedule before confirming
      </p>

      <Card className="border-saffron/30 bg-saffron/3 mb-6">
        <CardContent className="p-5">
          {/* Selected Items */}
          <div className="mb-4">
            <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Selected Items
            </h4>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between items-center"
                >
                  <span className="font-body text-sm text-foreground">
                    {item.productName}{" "}
                    <span className="text-muted-foreground">
                      × {item.quantity}
                    </span>
                  </span>
                  <span className="font-body text-sm font-semibold text-saffron">
                    ₹{((Number(item.price) / 100) * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-3" />

          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Time Slot
              </h4>
              <p className="font-body text-sm text-foreground">
                {slot?.icon} {slot?.label} ({slot?.time})
              </p>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Delivery Days
              </h4>
              <div className="flex flex-wrap gap-1">
                {days.map((d) => (
                  <Badge
                    key={d}
                    variant="outline"
                    className="text-xs border-saffron text-saffron"
                  >
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                Start Date
              </h4>
              <p className="font-body text-sm text-foreground">{startDate}</p>
            </div>
            <div>
              <h4 className="font-body text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                End Date
              </h4>
              <p className="font-body text-sm text-foreground">
                {noEndDate ? "Ongoing (no end date)" : endDate || "Not set"}
              </p>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between items-center">
            <span className="font-body font-semibold text-foreground">
              Estimated Daily Value
            </span>
            <span className="font-display text-xl font-bold text-saffron">
              ₹{dailyTotal.toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          className="font-body"
          onClick={onBack}
          data-ocid="schedule.step3.back.button"
        >
          Back
        </Button>
        <Button
          className="bg-saffron hover:bg-saffron-dark text-white font-body px-8 font-semibold"
          onClick={onConfirm}
          data-ocid="schedule.confirm.button"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Confirm Schedule
        </Button>
      </div>
    </div>
  );
}

// ==================== MY SCHEDULES TAB ====================
function MySchedules({
  schedules,
  onPause,
  onResume,
  onCancel,
  onCreateNew,
}: {
  schedules: Schedule[];
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onCreateNew: () => void;
}) {
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-amber-100 text-amber-800 border-amber-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            My Schedules
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Manage your daily flower delivery schedules
          </p>
        </div>
        <Button
          className="bg-saffron hover:bg-saffron-dark text-white font-body"
          onClick={onCreateNew}
          data-ocid="schedule.createNew.button"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      {schedules.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          data-ocid="schedule.mySchedule.empty_state"
        >
          <div className="text-6xl">🌸</div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            No schedules yet
          </h3>
          <p className="font-body text-sm text-muted-foreground max-w-xs">
            Create your first daily flower schedule and never miss your morning
            puja
          </p>
          <Button
            className="bg-saffron hover:bg-saffron-dark text-white font-body mt-2"
            onClick={onCreateNew}
            data-ocid="schedule.createNew.button"
          >
            Create First Schedule
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules.map((schedule, idx) => {
            const slot = TIME_SLOTS.find((s) => s.id === schedule.timeSlotId);
            const dailyTotal = schedule.items.reduce(
              (sum, item) => sum + (Number(item.price) / 100) * item.quantity,
              0,
            );

            return (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                data-ocid={`schedule.mySchedule.item.${idx + 1}`}
              >
                <Card
                  className={`border-border bg-card ${
                    schedule.status === "cancelled" ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="font-display text-base font-semibold text-foreground">
                          {slot?.icon} {slot?.label} — {slot?.time}
                        </CardTitle>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          Created{" "}
                          {new Date(schedule.createdAt).toLocaleDateString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs ${statusColors[schedule.status]} border`}
                      >
                        {schedule.status.charAt(0).toUpperCase() +
                          schedule.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Items
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {schedule.items.map((item) => (
                            <Badge
                              key={item.productId.toString()}
                              variant="outline"
                              className="text-xs"
                            >
                              {item.productName} ×{item.quantity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Days
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {schedule.days.map((d) => (
                            <Badge
                              key={d}
                              variant="outline"
                              className="text-xs border-saffron/50 text-saffron"
                            >
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Date Range
                        </p>
                        <p className="font-body text-sm text-foreground">
                          {schedule.startDate} →{" "}
                          {schedule.noEndDate
                            ? "Ongoing"
                            : schedule.endDate || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Daily Value
                        </p>
                        <p className="font-display text-base font-bold text-saffron">
                          ₹{dailyTotal.toFixed(0)}
                        </p>
                      </div>
                    </div>

                    {schedule.status !== "cancelled" && (
                      <div className="flex gap-2 pt-3 border-t border-border">
                        {schedule.status === "active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-body text-xs border-amber-400 text-amber-700 hover:bg-amber-50"
                            onClick={() => onPause(schedule.id)}
                            data-ocid={`schedule.pause.button.${idx + 1}`}
                          >
                            ⏸ Pause
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="font-body text-xs border-green-400 text-green-700 hover:bg-green-50"
                            onClick={() => onResume(schedule.id)}
                            data-ocid={`schedule.resume.button.${idx + 1}`}
                          >
                            ▶ Resume
                          </Button>
                        )}

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="font-body text-xs border-destructive text-destructive hover:bg-destructive/5"
                              data-ocid={`schedule.cancel.button.${idx + 1}`}
                            >
                              Cancel Schedule
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display">
                                Cancel Schedule?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-body">
                                This will cancel your daily flower delivery
                                schedule. You can create a new one anytime.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                className="font-body"
                                data-ocid="schedule.cancel.cancel_button"
                              >
                                Keep Schedule
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-white font-body"
                                onClick={() => onCancel(schedule.id)}
                                data-ocid="schedule.cancel.confirm_button"
                              >
                                Yes, Cancel
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==================== MAIN SCHEDULE PAGE ====================
export function SchedulePage() {
  const [activeMainTab, setActiveMainTab] = useState("create");
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [timeSlotId, setTimeSlotId] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [noEndDate, setNoEndDate] = useState(false);

  const {
    schedules,
    addSchedule,
    pauseSchedule,
    resumeSchedule,
    cancelSchedule,
  } = useSchedule();
  const { data: allProducts = [] } = useAllProducts();

  const resetWizard = () => {
    setStep(1);
    setQuantities({});
    setTimeSlotId("");
    setSelectedDays([]);
    setStartDate("");
    setEndDate("");
    setNoEndDate(false);
  };

  const handleConfirm = () => {
    const scheduleProducts = allProducts.filter(
      (p) =>
        p.category === ProductCategory.flowers ||
        p.category === ProductCategory.haar,
    );

    const items: ScheduleItem[] = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([key, qty]) => {
        const product = scheduleProducts.find((p) => p.id.toString() === key);
        return {
          productId: BigInt(key),
          productName: product?.name ?? "Unknown",
          quantity: qty,
          price: product?.price ?? BigInt(0),
          unit: product?.unit ?? "",
        };
      });

    addSchedule({
      items,
      timeSlotId,
      days: selectedDays,
      startDate,
      endDate: noEndDate ? undefined : endDate,
      noEndDate,
    });

    toast.success("Schedule created successfully! 🌸");
    resetWizard();
    setActiveMainTab("mySchedules");
  };

  // Build step 3 items
  const scheduleProducts = allProducts.filter(
    (p) =>
      p.category === ProductCategory.flowers ||
      p.category === ProductCategory.haar,
  );
  const step3Items: ScheduleItem[] = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([key, qty]) => {
      const product = scheduleProducts.find((p) => p.id.toString() === key);
      return {
        productId: BigInt(key),
        productName: product?.name ?? "Unknown",
        quantity: qty,
        price: product?.price ?? BigInt(0),
        unit: product?.unit ?? "",
      };
    });

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Daily Flower & Haar Schedule
        </h1>
        <p className="font-body text-muted-foreground">
          Set up recurring daily deliveries for your puja flowers and garlands
        </p>
      </div>

      <Tabs
        value={activeMainTab}
        onValueChange={(v) => {
          setActiveMainTab(v);
          if (v === "create") resetWizard();
        }}
      >
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-cream-dark p-1 rounded-xl">
          <TabsTrigger
            value="create"
            className="font-body data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg"
            data-ocid="schedule.create.tab"
          >
            Create Schedule
          </TabsTrigger>
          <TabsTrigger
            value="mySchedules"
            className="font-body data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg"
            data-ocid="schedule.mySchedules.tab"
          >
            My Schedules
            {schedules.filter((s) => s.status === "active").length > 0 && (
              <Badge className="ml-2 bg-saffron text-white text-xs h-5 w-5 p-0 flex items-center justify-center rounded-full">
                {schedules.filter((s) => s.status === "active").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card className="bg-card border-border shadow-card">
            <CardContent className="p-6">
              <StepIndicator step={step} />
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Step1
                      quantities={quantities}
                      onQuantityChange={(id, qty) =>
                        setQuantities((prev) => ({ ...prev, [id]: qty }))
                      }
                      onNext={() => setStep(2)}
                    />
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Step2
                      timeSlotId={timeSlotId}
                      days={selectedDays}
                      startDate={startDate}
                      endDate={endDate}
                      noEndDate={noEndDate}
                      onTimeSlotChange={setTimeSlotId}
                      onDaysChange={setSelectedDays}
                      onStartDateChange={setStartDate}
                      onEndDateChange={setEndDate}
                      onNoEndDateChange={setNoEndDate}
                      onBack={() => setStep(1)}
                      onNext={() => setStep(3)}
                    />
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Step3
                      items={step3Items}
                      timeSlotId={timeSlotId}
                      days={selectedDays}
                      startDate={startDate}
                      endDate={endDate}
                      noEndDate={noEndDate}
                      onBack={() => setStep(2)}
                      onConfirm={handleConfirm}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mySchedules">
          <ScrollArea className="h-auto">
            <MySchedules
              schedules={schedules}
              onPause={pauseSchedule}
              onResume={resumeSchedule}
              onCancel={cancelSchedule}
              onCreateNew={() => {
                resetWizard();
                setActiveMainTab("create");
              }}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
