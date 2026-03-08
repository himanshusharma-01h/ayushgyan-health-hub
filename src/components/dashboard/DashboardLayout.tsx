import { ReactNode, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { Bell, Check, Settings } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  userName: string;
  userPrakriti?: string;
  pageTitle?: string;
}

const typeEmoji: Record<string, string> = {
  prakriti: "🧘",
  ritual: "🙏",
  product: "🛍️",
  doctor: "👨‍⚕️",
  info: "ℹ️",
};

const DashboardLayout = ({
  children,
  userName,
  userPrakriti,
  pageTitle,
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar userName={userName} userPrakriti={userPrakriti} />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8">
            <h1 className="text-lg md:text-xl font-serif font-semibold text-foreground">
              {pageTitle}
            </h1>
            <div className="flex items-center gap-1">
              {/* Notification Bell */}
              <div className="relative" ref={panelRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-destructive text-destructive-foreground rounded-full px-1">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Panel */}
                {open && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[70vh] bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 gap-1"
                          onClick={markAllAsRead}
                        >
                          <Check className="w-3 h-3" /> Mark all read
                        </Button>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-[calc(70vh-56px)]">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                          <p className="text-sm text-muted-foreground">
                            No notifications yet. Updates and health tips will appear here.
                          </p>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => { if (!n.is_read) markAsRead(n.id); }}
                            className={cn(
                              "w-full text-left p-4 border-b border-border last:border-0 transition-colors hover:bg-secondary/50",
                              !n.is_read && "bg-primary/5"
                            )}
                          >
                            <div className="flex gap-3">
                              <span className="text-xl flex-shrink-0 mt-0.5">
                                {typeEmoji[n.type] || typeEmoji.info}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className={cn("text-sm font-medium truncate", !n.is_read ? "text-foreground" : "text-muted-foreground")}>
                                    {n.title}
                                  </p>
                                  {!n.is_read && (
                                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                                <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(n.created_at)}</p>
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Settings Icon */}
              <button
                onClick={() => navigate("/dashboard/patient/settings")}
                className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
};

export default DashboardLayout;
