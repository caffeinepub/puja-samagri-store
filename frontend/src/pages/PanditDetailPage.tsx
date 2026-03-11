import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { PANDITS } from "../data/pandits";
import { PANDIT_IMAGES } from "../data/productImages";

const PANDIT_TESTIMONIALS: Record<
  string,
  Array<{ name: string; rating: number; comment: string; ceremony: string }>
> = {
  p1: [
    {
      name: "Meera Kulkarni",
      rating: 5,
      comment:
        "Pandit Rajesh ji performed the Griha Pravesh puja for our new flat in Andheri. His recitations were crystal clear and the entire ceremony was completed in the most auspicious manner. Highly recommended!",
      ceremony: "Griha Pravesh",
    },
    {
      name: "Ramesh Desai",
      rating: 5,
      comment:
        "We have been calling Pandit Rajesh Sharma for our Navratri puja for the past 5 years. His knowledge of the Navratri vrat katha is unmatched and he always makes time to explain the significance of each ritual.",
      ceremony: "Navratri Puja",
    },
    {
      name: "Sunita Patil",
      rating: 5,
      comment:
        "Excellent pandit! Performed Satyanarayan Katha at our home. He was punctual, well-prepared, and made the entire family feel spiritually uplifted. Will definitely call him again.",
      ceremony: "Satyanarayan Katha",
    },
  ],
  p2: [
    {
      name: "Hiraben Shah",
      rating: 5,
      comment:
        "Pandit Suresh Joshi performed the Vastu Shanti puja for our new office. He performed the puja in Gujarati which made my entire family comfortable. Very knowledgeable and humble.",
      ceremony: "Vastu Shanti",
    },
    {
      name: "Dhruv Mehta",
      rating: 5,
      comment:
        "Best Ganesh Chaturthi puja experience we have had in years! Pandit ji explained every step in simple language. My children were also very engaged. Thoroughly professional.",
      ceremony: "Ganesh Puja",
    },
    {
      name: "Priya Jain",
      rating: 4,
      comment:
        "Very good pandit for Diwali puja. He was on time and the puja was performed methodically. Will book him again for our next ceremony.",
      ceremony: "Diwali Puja",
    },
  ],
  p3: [
    {
      name: "Anjali Tripathi",
      rating: 5,
      comment:
        "Pandit Vikram Mishra ji performed our daughter's wedding ceremony. Every single ritual was performed perfectly. His mastery over Sanskrit mantras gave the entire wedding a divine atmosphere.",
      ceremony: "Vivah Sanskar",
    },
    {
      name: "Sanjay Yadav",
      rating: 5,
      comment:
        "We called Pandit ji for our son's Mundan ceremony. He explained the significance of every step to our family, making it a truly memorable occasion. His expertise in Samskaras is extraordinary.",
      ceremony: "Mundan",
    },
    {
      name: "Kavita Singh",
      rating: 5,
      comment:
        "Pandit Vikram ji is a legend in Dadar. He has performed Namkaran and Annaprashana for both my children. His calm demeanor and deep knowledge make every ceremony special.",
      ceremony: "Namkaran",
    },
  ],
  p4: [
    {
      name: "Tanushree Roy",
      rating: 5,
      comment:
        "Pandit Anand Tripathi conducted the most authentic Durga Puja I have seen outside Bengal. Every ritual was done exactly as per the Bengali tradition. We were transported to Kolkata for those moments!",
      ceremony: "Durga Puja",
    },
    {
      name: "Radheshyam Ghosh",
      rating: 5,
      comment:
        "Outstanding Navratri puja. Pandit ji's knowledge of Shakti traditions is truly deep. He performed the puja with such devotion that everyone in attendance felt the divine presence.",
      ceremony: "Navratri",
    },
    {
      name: "Mridula Das",
      rating: 4,
      comment:
        "Good experience for Kali Puja. Pandit ji was well-versed in both tantric and vedic approaches. A rare combination. Would recommend for all Shakti-related ceremonies.",
      ceremony: "Kali Puja",
    },
  ],
  p5: [
    {
      name: "Vijay Shastri",
      rating: 5,
      comment:
        "Pandit Deepak Acharya performed Rudrabhishek at our home in Thane. The power of the mantras was palpable throughout the ceremony. His training from Kashi is evident in every chant.",
      ceremony: "Rudrabhishek",
    },
    {
      name: "Madhuri Iyer",
      rating: 5,
      comment:
        "The Mrityunjaya Havan conducted by Pandit Deepak ji was a deeply moving experience. He explained the healing significance of every herb offered in the havan. Absolutely exceptional.",
      ceremony: "Mrityunjaya Havan",
    },
    {
      name: "Kishor Nair",
      rating: 5,
      comment:
        "Shiv Puja by Pandit Deepak Acharya was extraordinary. His knowledge of Shaivite traditions and his ability to recite complex Shiva Stotras flawlessly is something we had never witnessed before.",
      ceremony: "Shiv Puja",
    },
  ],
  p6: [
    {
      name: "Bharati Vyas",
      rating: 5,
      comment:
        "Pandit Mohan Vyas performed Satyanarayan Katha at our home. His voice is so melodious that the entire 3-hour katha felt like just a few minutes. The family was in tears by the end.",
      ceremony: "Satyanarayan Katha",
    },
    {
      name: "Suresh Agarwal",
      rating: 5,
      comment:
        "Best Sunderkand recitation we have ever witnessed. Pandit ji's Rajasthani-style bhajan at the end was the highlight. He has a gift for creating a deeply devotional atmosphere.",
      ceremony: "Sunderkand",
    },
    {
      name: "Nalini Sharma",
      rating: 4,
      comment:
        "Ramayan Path was conducted beautifully over 3 days. Pandit Mohan Vyas is very accommodating and adjusted the timings to suit our family schedule. Very satisfied.",
      ceremony: "Ramayan Path",
    },
  ],
};

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeCls = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeCls} ${
            star <= rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-amber-300"
          }`}
        />
      ))}
    </div>
  );
}

export function PanditDetailPage() {
  const params = useParams({ from: "/pandit/$id" });
  const navigate = useNavigate();
  const panditId = params.id;

  const pandit = PANDITS.find((p) => p.id === panditId);
  const testimonials = PANDIT_TESTIMONIALS[panditId] ?? [];

  if (!pandit) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 gap-4">
        <div className="text-6xl">🔍</div>
        <h2 className="font-display text-2xl font-bold text-foreground">Pandit Not Found</h2>
        <p className="font-body text-muted-foreground">This pandit profile does not exist.</p>
        <Button
          onClick={() => navigate({ to: "/book-pandit" })}
          className="bg-saffron hover:bg-saffron-dark text-white font-body mt-2"
          data-ocid="pandit.back.button"
        >
          Browse Pandits
        </Button>
      </div>
    );
  }

  const panditImage = PANDIT_IMAGES[pandit.id];

  return (
    <div className="min-h-screen py-8 container mx-auto px-4 max-w-5xl">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6" data-ocid="pandit.breadcrumb.panel">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" data-ocid="pandit.home.link" className="font-body text-sm">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/book-pandit" data-ocid="pandit.bookpandit.link" className="font-body text-sm">Book a Pandit</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-body text-sm font-semibold">{pandit.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate({ to: "/book-pandit" })}
        className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-saffron transition-colors mb-6"
        data-ocid="pandit.back.button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Pandits
      </button>

      {/* Main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Left — Photo & badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-100 aspect-square flex items-center justify-center shadow-card">
            {panditImage ? (
              <motion.img
                src={panditImage}
                alt={pandit.name}
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : (
              <div className="text-[9rem] leading-none select-none">{pandit.emoji}</div>
            )}
            {/* Availability badge overlay */}
            <div className="absolute top-3 left-3">
              <Badge
                className={
                  pandit.available
                    ? "bg-green-500/90 text-white border-0 text-xs font-body"
                    : "bg-red-500/90 text-white border-0 text-xs font-body"
                }
              >
                {pandit.available ? "✓ Available" : "Currently Busy"}
              </Badge>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: <ShieldCheck className="w-4 h-4" />, text: "Verified Pandit" },
              { icon: <Award className="w-4 h-4" />, text: `${pandit.completedPoojas}+ Poojas` },
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Trusted" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-cream-dark/70 text-center"
              >
                <span className="text-saffron">{item.icon}</span>
                <span className="font-body text-xs text-muted-foreground leading-tight">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Specialization badges */}
          <div className="mt-4">
            <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Specializations</p>
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
          </div>
        </motion.div>

        {/* Right — Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <div>
            <p className="font-body text-sm text-saffron font-semibold tracking-wide uppercase mb-1">Vedic Pandit</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {pandit.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarDisplay rating={Math.round(pandit.rating)} size="md" />
            <span className="font-body text-lg font-bold text-foreground">{pandit.rating.toFixed(1)}</span>
            <span className="font-body text-sm text-muted-foreground">({pandit.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-saffron">₹{pandit.pricePerPooja.toLocaleString()}</span>
            <span className="font-body text-base text-muted-foreground">/ pooja</span>
          </div>

          <Separator />

          {/* Bio */}
          <p className="font-body text-base text-foreground/80 leading-relaxed">{pandit.bio}</p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs font-semibold text-amber-900">Experience</span>
              </div>
              <p className="font-display text-lg font-bold text-foreground">{pandit.experience} years</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs font-semibold text-amber-900">Poojas Done</span>
              </div>
              <p className="font-display text-lg font-bold text-foreground">{pandit.completedPoojas}+</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <User className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs font-semibold text-amber-900">Languages</span>
              </div>
              <p className="font-body text-sm text-foreground">{pandit.languages.join(", ")}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-saffron" />
                <span className="font-body text-xs font-semibold text-amber-900">Area Served</span>
              </div>
              <p className="font-body text-sm text-foreground">{pandit.area}</p>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-saffron" />
              <p className="font-body text-sm font-semibold text-foreground">Certifications & Training</p>
            </div>
            <ul className="space-y-1.5">
              {pandit.certifications.map((cert) => (
                <li key={cert} className="flex items-center gap-2 font-body text-sm text-foreground/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>

          {/* Book CTA */}
          <Link
            to="/book-pandit"
            search={{ pandit: pandit.id } as any}
            data-ocid="pandit.book.primary_button"
          >
            <Button
              size="lg"
              className="w-full h-12 bg-saffron hover:bg-saffron-dark text-white font-body font-semibold text-base"
              disabled={!pandit.available}
            >
              {pandit.available ? (
                <><Phone className="w-5 h-5 mr-2" /> Book This Pandit</>
              ) : (
                "Currently Unavailable"
              )}
            </Button>
          </Link>
        </motion.div>
      </div>

      <Separator className="my-10" />

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        data-ocid="pandit.reviews.section"
      >
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">What Devotees Say</h2>
          <Badge className="bg-saffron/15 text-saffron border-saffron/30 font-body">
            {testimonials.length} reviews
          </Badge>
        </div>

        {/* Rating summary */}
        <Card className="mb-6 bg-amber-50/50 border-amber-200">
          <CardContent className="p-5 flex items-center gap-6">
            <div className="text-center">
              <div className="font-display text-5xl font-bold text-saffron">{pandit.rating.toFixed(1)}</div>
              <StarDisplay rating={Math.round(pandit.rating)} size="md" />
              <p className="font-body text-xs text-muted-foreground mt-1">out of 5</p>
            </div>
            <Separator orientation="vertical" className="h-16" />
            <div className="flex-1">
              <p className="font-body text-sm text-muted-foreground mb-1">Based on {pandit.reviewCount} verified reviews</p>
              <p className="font-body text-sm font-semibold text-foreground">{pandit.completedPoojas}+ ceremonies completed</p>
              <p className="font-body text-xs text-muted-foreground mt-2">Serving {pandit.area}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              data-ocid={`pandit.reviews.item.${idx + 1}`}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">{t.name}</p>
                  <StarDisplay rating={t.rating} size="sm" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className="text-xs border-green-300 text-green-700 bg-green-50 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                  <Badge variant="outline" className="text-xs border-saffron/30 text-saffron bg-saffron/5">
                    {t.ceremony}
                  </Badge>
                </div>
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed">{t.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="h-12" />
    </div>
  );
}
