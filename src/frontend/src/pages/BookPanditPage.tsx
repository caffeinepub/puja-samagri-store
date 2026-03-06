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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Star,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { PANDITS, type Pandit } from "../data/pandits";
import { type PanditBooking, useBookings } from "../hooks/useBookings";
import { usePanditAvailabilities } from "../hooks/useQueries";

const CEREMONY_TYPES = [
  "Satyanarayan Katha",
  "Griha Pravesh",
  "Ganesh Puja",
  "Navratri Puja",
  "Diwali Puja",
  "Vivah Sanskar",
  "Rudrabhishek",
  "Havan",
  "Other",
];

const TIME_SLOTS = [
  "Morning 6–9 AM",
  "Forenoon 9 AM–12 PM",
  "Afternoon 12–3 PM",
  "Evening 4–7 PM",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function PanditCard({
  pandit,
  index,
  onBookNow,
}: {
  pandit: Pandit;
  index: number;
  onBookNow: (pandit: Pandit) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      data-ocid={`pandits.item.${index + 1}`}
    >
      <Card className="h-full flex flex-col bg-card border-border hover:shadow-card transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
        {/* Saffron accent bar */}
        <div className="h-1.5 gradient-saffron" />
        <CardContent className="p-5 flex-1 flex flex-col gap-4">
          {/* Header row */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-saffron/20 to-maroon/20 flex items-center justify-center text-3xl flex-shrink-0 border border-saffron/20">
              {pandit.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h3 className="font-display text-base font-bold text-foreground leading-tight">
                  {pandit.name}
                </h3>
                <Badge
                  className={
                    pandit.available
                      ? "bg-green-100 text-green-800 border-green-200 text-xs shrink-0"
                      : "bg-red-100 text-red-700 border-red-200 text-xs shrink-0"
                  }
                >
                  {pandit.available ? "Available" : "Busy"}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                <span className="font-body text-xs text-muted-foreground truncate">
                  {pandit.area}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <StarRating rating={pandit.rating} />
                <span className="font-body text-xs font-semibold text-foreground">
                  {pandit.rating.toFixed(1)}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  ({pandit.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {pandit.bio}
          </p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1.5">
            {pandit.specializations.map((spec) => (
              <Badge
                key={spec}
                variant="outline"
                className="text-xs border-saffron/40 text-saffron bg-saffron/5 font-body"
              >
                {spec}
              </Badge>
            ))}
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-body">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-saffron" />
              <span>{pandit.experience} yrs exp.</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <User className="w-3.5 h-3.5 text-saffron" />
              <span>{pandit.languages.join(", ")}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
            <div>
              <span className="font-display text-lg font-bold text-saffron">
                ₹{pandit.pricePerPooja.toLocaleString()}
              </span>
              <span className="font-body text-xs text-muted-foreground ml-1">
                /pooja
              </span>
            </div>
            <Button
              size="sm"
              className="bg-saffron hover:bg-saffron-dark text-white font-body font-semibold disabled:opacity-50"
              disabled={!pandit.available}
              onClick={() => onBookNow(pandit)}
              data-ocid={`pandits.book.button.${index + 1}`}
            >
              {pandit.available ? "Book Now" : "Unavailable"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

type BookingFormData = {
  ceremonyType: string;
  date: string;
  timeSlot: string;
  address: string;
  contactName: string;
  phone: string;
  notes: string;
};

function BookingForm({
  pandit,
  onConfirm,
  onCancel,
}: {
  pandit: Pandit;
  onConfirm: (data: BookingFormData) => void;
  onCancel: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<BookingFormData>({
    ceremonyType: "",
    date: "",
    timeSlot: "",
    address: "",
    contactName: "",
    phone: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  function validate(): boolean {
    const newErrors: Partial<BookingFormData> = {};
    if (!form.ceremonyType)
      newErrors.ceremonyType = "Please select a ceremony type";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.timeSlot) newErrors.timeSlot = "Please select a time slot";
    if (!form.address.trim()) newErrors.address = "Please enter your address";
    if (!form.contactName.trim())
      newErrors.contactName = "Please enter your name";
    if (!form.phone.trim()) newErrors.phone = "Please enter your phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onConfirm(form);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-saffron/30 bg-gradient-to-br from-amber-50/50 to-orange-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-xl text-foreground">
              Book a Pooja
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground"
              data-ocid="booking.form.cancel_button"
            >
              ✕ Cancel
            </Button>
          </div>
          <div className="flex items-center gap-3 bg-saffron/10 rounded-lg px-4 py-3 border border-saffron/20">
            <span className="text-2xl">{pandit.emoji}</span>
            <div>
              <p className="font-display text-sm font-bold text-foreground">
                {pandit.name}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                {pandit.area} · ₹{pandit.pricePerPooja.toLocaleString()}/pooja
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ceremony Type */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Ceremony Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.ceremonyType}
                  onValueChange={(val) =>
                    setForm((p) => ({ ...p, ceremonyType: val }))
                  }
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="booking.ceremonytype.select"
                  >
                    <SelectValue placeholder="Select ceremony" />
                  </SelectTrigger>
                  <SelectContent>
                    {CEREMONY_TYPES.map((ct) => (
                      <SelectItem key={ct} value={ct} className="font-body">
                        {ct}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ceremonyType && (
                  <p
                    className="font-body text-xs text-destructive"
                    data-ocid="booking.ceremonytype.error_state"
                  >
                    {errors.ceremonyType}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                  className="font-body"
                  data-ocid="booking.date.input"
                />
                {errors.date && (
                  <p
                    className="font-body text-xs text-destructive"
                    data-ocid="booking.date.error_state"
                  >
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Time Slot <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.timeSlot}
                  onValueChange={(val) =>
                    setForm((p) => ({ ...p, timeSlot: val }))
                  }
                >
                  <SelectTrigger
                    className="font-body"
                    data-ocid="booking.timeslot.select"
                  >
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot} className="font-body">
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timeSlot && (
                  <p
                    className="font-body text-xs text-destructive"
                    data-ocid="booking.timeslot.error_state"
                  >
                    {errors.timeSlot}
                  </p>
                )}
              </div>

              {/* Contact Name */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Contact Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={form.contactName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, contactName: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="font-body"
                  data-ocid="booking.contactname.input"
                />
                {errors.contactName && (
                  <p
                    className="font-body text-xs text-destructive"
                    data-ocid="booking.contactname.error_state"
                  >
                    {errors.contactName}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label className="font-body text-sm font-medium">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className="font-body"
                  data-ocid="booking.phone.input"
                />
                {errors.phone && (
                  <p
                    className="font-body text-xs text-destructive"
                    data-ocid="booking.phone.error_state"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="Full address where the pooja will be conducted"
                rows={2}
                className="font-body resize-none"
                data-ocid="booking.address.textarea"
              />
              {errors.address && (
                <p
                  className="font-body text-xs text-destructive"
                  data-ocid="booking.address.error_state"
                >
                  {errors.address}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="font-body text-sm font-medium">
                Special Notes{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </Label>
              <Textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Any special requirements or instructions for the pandit"
                rows={2}
                className="font-body resize-none"
                data-ocid="booking.notes.textarea"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-maroon hover:bg-maroon/90 text-white font-body font-semibold"
                data-ocid="booking.form.submit_button"
              >
                Confirm Booking
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="font-body border-border"
                data-ocid="booking.form.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BookingSuccessCard({
  booking,
  pandit,
  onBookAnother,
}: {
  booking: PanditBooking;
  pandit: Pandit;
  onBookAnother: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 max-w-lg mx-auto"
        data-ocid="booking.success_state"
      >
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Booking Confirmed!
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Your pooja has been successfully scheduled. The pandit will contact
            you shortly.
          </p>

          <div className="bg-white/80 rounded-xl p-4 text-left space-y-3 mb-6 border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{pandit.emoji}</span>
              <div>
                <p className="font-display text-sm font-bold text-foreground">
                  {booking.panditName}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  {pandit.area}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-body">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="w-4 h-4 text-saffron" />
                <span>
                  {new Date(booking.date).toLocaleDateString("en-IN", {
                    dateStyle: "long",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-saffron" />
                <span>{booking.timeSlot}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                <MapPin className="w-4 h-4 text-saffron flex-shrink-0" />
                <span className="line-clamp-1">{booking.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4 text-saffron" />
                <span>{booking.contactName}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-saffron" />
                <span>{booking.phone}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-green-100">
              <p className="font-body text-xs font-semibold text-saffron">
                Ceremony: {booking.ceremonyType}
              </p>
              {booking.notes && (
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Notes: {booking.notes}
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={onBookAnother}
            className="w-full bg-saffron hover:bg-saffron-dark text-white font-body font-semibold"
            data-ocid="booking.bookanother.button"
          >
            Book Another Pooja
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function BookingListItem({
  booking,
  index,
  onCancel,
}: {
  booking: PanditBooking;
  index: number;
  onCancel: (id: string) => void;
}) {
  const statusConfig = {
    confirmed: {
      label: "Confirmed",
      class: "bg-green-100 text-green-800 border-green-200",
    },
    pending: {
      label: "Pending",
      class: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    cancelled: {
      label: "Cancelled",
      class: "bg-red-100 text-red-700 border-red-200",
    },
  };
  const config = statusConfig[booking.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`mybookings.item.${index + 1}`}
    >
      <Card className="border-border bg-card hover:shadow-sm transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h4 className="font-display text-sm font-bold text-foreground">
                  {booking.panditName}
                </h4>
                <Badge className={`${config.class} text-xs`}>
                  {config.label}
                </Badge>
              </div>
              <p className="font-body text-xs font-semibold text-saffron mb-2">
                {booking.ceremonyType}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-body text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-saffron" />
                  <span>
                    {new Date(booking.date).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-saffron" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-saffron flex-shrink-0" />
                  <span className="line-clamp-1">{booking.address}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-saffron" />
                  <span>{booking.phone}</span>
                </div>
              </div>
            </div>

            {booking.status === "confirmed" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-body shrink-0"
                    data-ocid={`mybookings.delete_button.${index + 1}`}
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-ocid="mybookings.cancel.dialog">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-display">
                      Cancel Booking?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-body">
                      Are you sure you want to cancel the booking with{" "}
                      <strong>{booking.panditName}</strong> for{" "}
                      <strong>{booking.ceremonyType}</strong> on{" "}
                      <strong>
                        {new Date(booking.date).toLocaleDateString("en-IN", {
                          dateStyle: "medium",
                        })}
                      </strong>
                      ? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="font-body"
                      data-ocid="mybookings.cancel.cancel_button"
                    >
                      Keep Booking
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/90 font-body"
                      onClick={() => onCancel(booking.id)}
                      data-ocid="mybookings.cancel.confirm_button"
                    >
                      Yes, Cancel
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BookPanditPage() {
  const { bookings, addBooking, cancelBooking } = useBookings();
  const { data: availabilities } = usePanditAvailabilities();
  const panditsWithAvailability = PANDITS.map((p) => {
    const backendAvail = availabilities?.find((a) => a.panditId === p.id);
    return backendAvail ? { ...p, available: backendAvail.available } : p;
  });
  const [selectedPandit, setSelectedPandit] = useState<Pandit | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    booking: PanditBooking;
    pandit: Pandit;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("find");
  const formRef = useRef<HTMLDivElement>(null);

  function handleBookNow(pandit: Pandit) {
    setSelectedPandit(pandit);
    setConfirmedBooking(null);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleConfirmBooking(data: {
    ceremonyType: string;
    date: string;
    timeSlot: string;
    address: string;
    contactName: string;
    phone: string;
    notes: string;
  }) {
    if (!selectedPandit) return;
    addBooking({
      panditId: selectedPandit.id,
      panditName: selectedPandit.name,
      ceremonyType: data.ceremonyType,
      date: data.date,
      timeSlot: data.timeSlot,
      address: data.address,
      contactName: data.contactName,
      phone: data.phone,
      notes: data.notes,
    });

    // Build a temporary booking object for display (latest one)
    const tempBooking: PanditBooking = {
      id: "booking-temp",
      panditId: selectedPandit.id,
      panditName: selectedPandit.name,
      ceremonyType: data.ceremonyType,
      date: data.date,
      timeSlot: data.timeSlot,
      address: data.address,
      contactName: data.contactName,
      phone: data.phone,
      notes: data.notes,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    setConfirmedBooking({ booking: tempBooking, pandit: selectedPandit });
    setSelectedPandit(null);
  }

  function handleBookAnother() {
    setConfirmedBooking(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon via-maroon/90 to-amber-900 py-14 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-8 text-6xl">🕉️</div>
          <div className="absolute bottom-4 right-12 text-5xl">🪔</div>
          <div className="absolute top-8 right-1/3 text-4xl">🌸</div>
        </div>
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Badge className="bg-amber-400/20 text-amber-200 border-amber-400/30 mb-4 font-body text-xs tracking-wide px-3 py-1">
              🙏 Verified Pandits
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Book a Pandit for Your{" "}
              <span className="text-amber-300">Puja</span>
            </h1>
            <p className="font-body text-base text-white/80 leading-relaxed">
              Connect with experienced Vedic pandits in your area for
              Satyanarayan Katha, Griha Pravesh, weddings, havans & more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="mb-8 bg-cream-dark p-1 rounded-xl"
            data-ocid="bookpandit.tabs.tab"
          >
            <TabsTrigger
              value="find"
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-5 py-2"
              data-ocid="bookpandit.findpandit.tab"
            >
              🔍 Find a Pandit
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="font-body text-sm data-[state=active]:bg-saffron data-[state=active]:text-white rounded-lg px-5 py-2"
              data-ocid="bookpandit.mybookings.tab"
            >
              📋 My Bookings{" "}
              {bookings.length > 0 && (
                <span className="ml-1.5 bg-saffron/20 text-saffron text-xs rounded-full px-1.5 py-0.5">
                  {bookings.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* FIND A PANDIT */}
          <TabsContent value="find">
            <div className="space-y-8">
              {/* Success state */}
              {confirmedBooking && (
                <BookingSuccessCard
                  booking={confirmedBooking.booking}
                  pandit={confirmedBooking.pandit}
                  onBookAnother={handleBookAnother}
                />
              )}

              {/* Pandit grid */}
              {!confirmedBooking && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {panditsWithAvailability.map((pandit, idx) => (
                    <PanditCard
                      key={pandit.id}
                      pandit={pandit}
                      index={idx}
                      onBookNow={handleBookNow}
                    />
                  ))}
                </div>
              )}

              {/* Booking form */}
              {selectedPandit && !confirmedBooking && (
                <div ref={formRef}>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Complete Your Booking
                  </h2>
                  <BookingForm
                    pandit={selectedPandit}
                    onConfirm={handleConfirmBooking}
                    onCancel={() => setSelectedPandit(null)}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          {/* MY BOOKINGS */}
          <TabsContent value="bookings">
            {bookings.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-24 gap-4 text-center"
                data-ocid="mybookings.empty_state"
              >
                <div className="text-6xl">🙏</div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  No bookings yet
                </h3>
                <p className="font-body text-sm text-muted-foreground max-w-xs">
                  Find an experienced pandit and book your first pooja ceremony.
                </p>
                <Button
                  onClick={() => setActiveTab("find")}
                  className="bg-saffron hover:bg-saffron-dark text-white font-body"
                  data-ocid="mybookings.findpandit.button"
                >
                  Find a Pandit
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-2xl">
                <p className="font-body text-sm text-muted-foreground">
                  {bookings.length} booking{bookings.length !== 1 ? "s" : ""}{" "}
                  total ·{" "}
                  {bookings.filter((b) => b.status === "confirmed").length}{" "}
                  active
                </p>
                {[...bookings].reverse().map((booking, idx) => (
                  <BookingListItem
                    key={booking.id}
                    booking={booking}
                    index={idx}
                    onCancel={cancelBooking}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
