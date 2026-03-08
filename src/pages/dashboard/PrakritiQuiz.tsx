import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type DoshaType = "vata" | "pitta" | "kapha";

const PrakritiQuiz = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DoshaType>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    category: t(`prakriti.q${i + 1}.category`),
    question: t(`prakriti.q${i + 1}.question`),
    options: [
      { text: t(`prakriti.q${i + 1}.vata`), dosha: "vata" as DoshaType },
      { text: t(`prakriti.q${i + 1}.pitta`), dosha: "pitta" as DoshaType },
      { text: t(`prakriti.q${i + 1}.kapha`), dosha: "kapha" as DoshaType },
    ],
  }));

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (dosha: DoshaType) => {
    setAnswers({ ...answers, [currentQuestion]: dosha });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const calculateResults = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    Object.values(answers).forEach((dosha) => { counts[dosha]++; });
    const total = Object.keys(answers).length || 1;
    return {
      vata: Math.round((counts.vata / total) * 100),
      pitta: Math.round((counts.pitta / total) * 100),
      kapha: Math.round((counts.kapha / total) * 100),
    };
  };

  const getPrimaryDosha = () => {
    const results = calculateResults();
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] - sorted[1][1] < 15) {
      return `${sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1)}-${sorted[1][0].charAt(0).toUpperCase() + sorted[1][0].slice(1)}`;
    }
    return sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1);
  };

  if (showResults) {
    const results = calculateResults();
    const primaryDosha = getPrimaryDosha();

    return (
      <DashboardLayout userName="Priya Sharma" userPrakriti={primaryDosha} pageTitle={t('prakriti.resultsTitle')}>
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden rounded-2xl">
            <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-ayush-gold/20 p-6 sm:p-8 text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                {t('prakriti.yourPrakriti')}: {primaryDosha}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">{t('prakriti.basedOn')}</p>
            </div>

            <CardContent className="p-5 sm:p-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                <div className="text-center p-3 sm:p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-blue-600 mb-1 sm:mb-2">{results.vata}%</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">Vata</div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5">{t('prakriti.airSpace')}</p>
                </div>
                <div className="text-center p-3 sm:p-6 rounded-xl bg-orange-500/10 border border-orange-500/20">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-orange-600 mb-1 sm:mb-2">{results.pitta}%</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">Pitta</div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5">{t('prakriti.fireWater')}</p>
                </div>
                <div className="text-center p-3 sm:p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl sm:text-4xl font-display font-bold text-green-600 mb-1 sm:mb-2">{results.kapha}%</div>
                  <div className="text-sm sm:text-lg font-semibold text-foreground">Kapha</div>
                  <p className="text-[10px] sm:text-sm text-muted-foreground mt-0.5">{t('prakriti.earthWater')}</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">{t('prakriti.whatThisMeans')}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t('prakriti.explanation')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="rounded-xl" onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}); }}>
                  {t('prakriti.retake')}
                </Button>
                <Button className="rounded-xl" onClick={() => navigate("/dashboard/patient")}>
                  {t('prakriti.goDashboard')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const question = questions[currentQuestion];

  return (
    <DashboardLayout userName="Priya Sharma" pageTitle={t('prakriti.pageTitle')}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {t('prakriti.question')} {currentQuestion + 1} {t('prakriti.of')} {questions.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-primary">{question.category}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-6 sm:mb-8 rounded-2xl">
          <CardContent className="p-5 sm:p-8">
            <h2 className="text-lg sm:text-2xl font-display font-semibold text-foreground mb-6 sm:mb-8">
              {question.question}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.dosha)}
                  className={cn(
                    "w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200",
                    answers[currentQuestion] === option.dosha
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-secondary"
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={cn(
                      "w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      answers[currentQuestion] === option.dosha ? "border-primary bg-primary" : "border-muted-foreground"
                    )}>
                      {answers[currentQuestion] === option.dosha && <Check className="w-3 sm:w-4 h-3 sm:h-4 text-primary-foreground" />}
                    </div>
                    <span className="text-sm sm:text-base text-foreground leading-relaxed">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestion === 0} className="gap-2 rounded-xl text-sm">
            <ArrowLeft className="w-4 h-4" />
            {t('prakriti.previous')}
          </Button>
          <Button onClick={handleNext} disabled={answers[currentQuestion] === undefined} className="gap-2 rounded-xl text-sm">
            {currentQuestion === questions.length - 1 ? t('prakriti.seeResults') : t('prakriti.next')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrakritiQuiz;