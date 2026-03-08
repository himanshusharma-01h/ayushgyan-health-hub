import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, Download, Mail } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminSubscribers = () => {
  const { toast } = useToast();
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("notify_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      setSubs(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const exportCSV = () => {
    const csv = "Email,Subscribed At\n" + subs.map((s) => `${s.email},${s.created_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notify-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border h-14 flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-lg font-display font-semibold">Notify Subscribers</h1>
        <span className="text-sm text-muted-foreground ml-2">({subs.length})</span>
        <Button size="sm" variant="outline" className="ml-auto rounded-full gap-1.5" onClick={exportCSV} disabled={subs.length === 0}>
          <Download className="w-3.5 h-3.5" /> Export CSV
        </Button>
      </header>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : subs.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No subscribers yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {subs.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{s.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString()} · {new Date(s.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;
