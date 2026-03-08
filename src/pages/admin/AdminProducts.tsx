import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, Plus, Pencil, Trash2, Package
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  image_emoji: string | null;
  image_url: string | null;
  price: number;
  original_price: number | null;
  category: string;
  benefits: string[];
  dosha_compatibility: string[];
  in_stock: boolean;
  is_published: boolean;
}

const emptyProduct = {
  name: "", description: "", image_emoji: "🌿", image_url: "",
  price: 0, original_price: 0, category: "supplements",
  benefits: "", dosha_compatibility: [] as string[], in_stock: true, is_published: true,
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("products-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => fetchProducts())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description,
      image_emoji: p.image_emoji || "🌿", image_url: p.image_url || "",
      price: p.price, original_price: p.original_price || 0,
      category: p.category, benefits: (p.benefits || []).join(", "),
      dosha_compatibility: p.dosha_compatibility || [],
      in_stock: p.in_stock, is_published: p.is_published,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      image_emoji: form.image_emoji || "🌿",
      image_url: form.image_url || null,
      price: Number(form.price),
      original_price: Number(form.original_price) || null,
      category: form.category,
      benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
      dosha_compatibility: form.dosha_compatibility,
      in_stock: form.in_stock,
      is_published: form.is_published,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product updated" });
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product created" });
    }
    setDialogOpen(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Product deleted" });
    fetchProducts();
  };

  const doshas = ["Vata", "Pitta", "Kapha"];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border h-14 flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/admin"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-lg font-display font-semibold">Products</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto rounded-full gap-1" onClick={openCreate}>
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Price (₹)</Label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Original Price</Label>
                  <Input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: Number(e.target.value) })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Emoji</Label>
                  <Input value={form.image_emoji || ""} onChange={(e) => setForm({ ...form, image_emoji: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="supplements">Supplements</option>
                    <option value="oils">Oils & Care</option>
                    <option value="equipment">Wellness</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Benefits (comma separated)</Label>
                <Input value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
              </div>
              <div>
                <Label>Dosha Compatibility</Label>
                <div className="flex gap-2 mt-1">
                  {doshas.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${form.dosha_compatibility.includes(d) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}
                      onClick={() => setForm({
                        ...form,
                        dosha_compatibility: form.dosha_compatibility.includes(d)
                          ? form.dosha_compatibility.filter((x) => x !== d)
                          : [...form.dosha_compatibility, d],
                      })}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                  Published
                </label>
              </div>
              <Button className="w-full" onClick={handleSave}>
                {editingId ? "Update Product" : "Create Product"}
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
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No products yet. Add your first product.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <Card key={p.id} className="overflow-hidden">
                <div className="h-24 bg-secondary/50 flex items-center justify-center text-4xl">
                  {p.image_emoji || "🌿"}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm line-clamp-1">{p.name}</h3>
                    <div className="flex gap-1 shrink-0">
                      {!p.is_published && <Badge variant="secondary" className="text-[10px]">Draft</Badge>}
                      {!p.in_stock && <Badge variant="destructive" className="text-[10px]">OOS</Badge>}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">₹{p.price}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
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

export default AdminProducts;
