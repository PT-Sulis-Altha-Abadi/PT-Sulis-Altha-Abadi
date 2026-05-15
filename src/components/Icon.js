import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Code2,
  Component,
  DatabaseZap,
  ExternalLink,
  Gauge,
  GraduationCap,
  Globe2,
  Handshake,
  HardHat,
  Home,
  Layers3,
  LayoutDashboard,
  Leaf,
  LifeBuoy,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  PanelsTopLeft,
  Phone,
  RadioTower,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Timer,
  Users2,
  Workflow,
  X,
  Zap,
  ClipboardCheck,
} from "lucide-react";

const icons = {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  ClipboardCheck,
  Code2,
  Component,
  DatabaseZap,
  ExternalLink,
  Gauge,
  GraduationCap,
  Globe2,
  Handshake,
  HardHat,
  Home,
  Layers3,
  LayoutDashboard,
  Leaf,
  LifeBuoy,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  PanelsTopLeft,
  Phone,
  RadioTower,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Sprout,
  Timer,
  Users2,
  Workflow,
  X,
  Zap,
};

export default function Icon({ name, className, strokeWidth = 1.8, ...props }) {
  if (name === "LinkedIn") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className={className}
        aria-hidden="true"
        {...props}
      >
        <path
          fill="currentColor"
          d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"
        />
      </svg>
    );
  }

  const LucideIcon = icons[name] ?? Sparkles;

  return <LucideIcon className={className} strokeWidth={strokeWidth} {...props} />;
}
