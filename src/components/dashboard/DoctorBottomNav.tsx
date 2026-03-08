import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  ShoppingBag,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/doctor" },
  { icon: Users, label: "Patients", path: "/dashboard/doctor/patients" },
  { icon: Calendar, label: "Appointments", path: "/dashboard/doctor/appointments" },
  { icon: FileText, label: "Prescriptions", path: "/dashboard/doctor/prescriptions" },
  { icon: ShoppingBag, label: "Products", path: "/products" },
];

const DoctorBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-1 safe-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 rounded-lg transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "drop-shadow-sm")} />
              <span className={cn(
                "text-[10px] leading-tight",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DoctorBottomNav;
