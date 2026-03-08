import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, ShieldCheck, User } from "lucide-react";

interface UserProfile {
  user_id: string;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
  roles: string[];
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data: profiles, error } = await supabase.from("profiles").select("*");
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }

    const { data: allRoles } = await supabase.from("user_roles").select("*");

    const enriched = (profiles || []).map((p) => ({
      user_id: p.user_id,
      full_name: p.full_name,
      avatar_url: p.avatar_url,
      created_at: p.created_at,
      roles: (allRoles || []).filter((r) => r.user_id === p.user_id).map((r) => r.role),
    }));

    setUsers(enriched);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleRole = async (userId: string, role: string, hasRole: boolean) => {
    if (hasRole) {
      await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role);
    } else {
      await supabase.from("user_roles").insert({ user_id: userId, role });
    }
    toast({ title: `Role ${hasRole ? "removed" : "added"}` });
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border h-14 flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-lg font-display font-semibold">Users & Roles</h1>
      </header>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No users found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((u) => (
              <Card key={u.user_id}>
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{u.full_name || "Unnamed"}</p>
                      <p className="text-xs text-muted-foreground">ID: {u.user_id.slice(0, 8)}...</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {u.roles.map((r) => (
                      <Badge key={r} variant={r === "admin" ? "default" : "secondary"} className="text-xs">
                        {r === "admin" && <ShieldCheck className="w-3 h-3 mr-1" />}
                        {r}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant={u.roles.includes("admin") ? "destructive" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => toggleRole(u.user_id, "admin", u.roles.includes("admin"))}
                    >
                      {u.roles.includes("admin") ? "Remove Admin" : "Make Admin"}
                    </Button>
                    <Button
                      variant={u.roles.includes("doctor") ? "destructive" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => toggleRole(u.user_id, "doctor", u.roles.includes("doctor"))}
                    >
                      {u.roles.includes("doctor") ? "Remove Doctor" : "Make Doctor"}
                    </Button>
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

export default AdminUsers;
