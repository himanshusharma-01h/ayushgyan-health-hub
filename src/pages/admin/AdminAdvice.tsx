import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Pencil, Trash2, FileText } from "lucide-react";

interface Advice {
  id: string;
  title: string;
  title_hi: string | null;
  description: string;
  description_hi: string | null;
  category: string;
  doctor_name: string;
  doctor_avatar: string | null;
  is_published: boolean;
  created_at: string;
}

const categories = ["general", "digestion", "immunity", "stress", "sleep", "skin", "detox", "energy"];

const emptyForm = {
  title: "", title_hi: "", description: "", description_hi: "",
  category: "general", doctor_name: "", doctor_avatar: "", is_published: true,
};

const AdminAdvice = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Advice[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchAdvice = async () => {
    const { data, error } = await supabase.from("vaidya_advice").select("*").order("created_at", { ascending: false });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAdvice(); }, []);

  useEffect(() => {
    const channel = supabase
      .channel("advice-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "vaidya_advice" }, () => fetchAdvice())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setDialogOpen(true); };

  const openEdit = (a: Advice) => {
    setEditingId(a.id);
    setForm({
      title: a.title, title_hi: a.title_hi || "", description: a.description,
      description_hi: a.description_hi || "", category: a.category,
      doctor_name: a.doctor_name, doctor_avatar: a.doctor_avatar || "",
      is_published: a.is_published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title, title_hi: form.title_hi || null,
      description: form.description, description_hi: form.description_hi || null,
      category: form.category, doctor_name: form.doctor_name,
      doctor_avatar: form.doctor_avatar || null, is_published: form.is_published,
    };

    if (editingId) {
      const { error } = await supabase.from("vaidya_advice").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Advice updated" });
    } else {
      const { error } = await supabase.from("vaidya_advice").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Advice published" });
    }
    setDialogOpen(false);
    fetchAdvice();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("vaidya_advice").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Advice deleted" });
    fetchAdvice();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border h-14 flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-lg font-display font-semibold">Vaidya Advice</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto rounded-full gap-1" onClick={openCreate}>
              <Plus className="w-4 h-4" /> Add Advice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Advice" : "Add Advice"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Title (English)</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <Label>Title (Hindi)</Label>
                <Input value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} placeholder="Optional" />
              </div>
              <div>
                <Label>Description (English)</Label>
                <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <Label>Description (Hindi)</Label>
                <Textarea rows={4} value={form.description_hi} onChange={(e) => setForm({ ...form, description_hi: e.target.value })} placeholder="Optional" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Doctor Name</Label>
                  <Input value={form.doctor_name} onChange={(e) => setForm({ ...form, doctor_name: e.target.value })} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                Published
              </label>
              <Button className="w-full" onClick={handleSave}>
                {editingId ? "Update" : "Publish"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No advice posts yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((a) => (
              <Card key={a.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px]">{a.category}</Badge>
                    {!a.is_published && <Badge variant="outline" className="text-[10px]">Draft</Badge>}
                  </div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{a.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{a.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Dr. {a.doctor_name}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(a)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(a.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
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

export default AdminAdvice;
