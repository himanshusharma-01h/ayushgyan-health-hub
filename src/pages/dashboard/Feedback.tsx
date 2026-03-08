import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, MessageSquareHeart, CheckCircle2 } from "lucide-react";
import { usePrakritiResult } from "@/hooks/usePrakritiResult";

const Feedback = () => {
  const { user, profile } = useAuth();
  const { result: prakriti } = usePrakritiResult();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState<{ rating: number; review: string | null; created_at: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchFeedback = async () => {
      const { data } = await supabase
        .from("feedback" as any)
        .select("rating, review, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setExistingFeedback(data as any);
        setRating((data as any).rating);
        setReview((data as any).review || "");
      }
    };
    fetchFeedback();
  }, [user]);

  const handleSubmit = async () => {
    if (!user || rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("feedback" as any).insert({
      user_id: user.id,
      rating,
      review: review.trim() || null,
    } as any);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Thank you! 🙏", description: "Your feedback has been submitted." });
      setSubmitted(true);
      setExistingFeedback({ rating, review, created_at: new Date().toISOString() });
    }
    setSubmitting(false);
  };

  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <DashboardLayout
      userName={profile?.full_name || "User"}
      userPrakriti={prakriti?.primary_dosha}
      pageTitle="Feedback"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <MessageSquareHeart className="w-12 h-12 mx-auto text-primary mb-3" />
          <h2 className="text-2xl font-serif font-bold text-foreground">Share Your Feedback</h2>
          <p className="text-sm text-muted-foreground mt-1">Help us improve AyushGyaan for everyone</p>
        </div>

        {submitted || existingFeedback ? (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 mx-auto text-primary" />
              <h3 className="text-xl font-serif font-bold text-foreground">Thank You!</h3>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${star <= (existingFeedback?.rating || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                You rated us <span className="font-semibold text-foreground">{ratingLabels[existingFeedback?.rating || rating]}</span>
              </p>
              {(existingFeedback?.review || review) && (
                <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
                  "{existingFeedback?.review || review}"
                </p>
              )}
              <Button
                variant="outline"
                className="rounded-xl mt-4"
                onClick={() => {
                  setSubmitted(false);
                  setExistingFeedback(null);
                  setRating(0);
                  setReview("");
                }}
              >
                Submit New Feedback
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rate Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Star Rating */}
              <div className="text-center space-y-3">
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {(hoveredRating || rating) > 0 && (
                  <p className="text-sm font-medium text-foreground">
                    {ratingLabels[hoveredRating || rating]}
                  </p>
                )}
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Review (optional)</label>
                <Textarea
                  placeholder="Tell us what you liked or what we can improve..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="rounded-xl min-h-[120px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">{review.length}/500</p>
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="w-full rounded-xl h-11 gap-2"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Submit Feedback
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Feedback;