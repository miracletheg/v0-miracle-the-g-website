"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, RotateCcw, X, ChevronLeft, ChevronRight } from "lucide-react"
import { soundManager } from "@/lib/sounds"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const questions = [
  {
    id: 1,
    question: "What brings you here today?",
    options: [
      { text: "Physical pain or discomfort", points: { healer: 3, shaman: 1, oracle: 0, teacher: 0 } },
      { text: "Emotional healing or trauma", points: { healer: 2, shaman: 3, oracle: 1, teacher: 0 } },
      { text: "Seeking guidance or clarity", points: { healer: 0, shaman: 1, oracle: 3, teacher: 1 } },
      { text: "Spiritual growth & learning", points: { healer: 1, shaman: 1, oracle: 1, teacher: 3 } },
    ],
  },
  {
    id: 2,
    question: "How do you prefer to experience healing?",
    options: [
      { text: "Hands-on, in-person sessions", points: { healer: 3, shaman: 2, oracle: 0, teacher: 1 } },
      { text: "Deep, transformative ceremonies", points: { healer: 1, shaman: 3, oracle: 1, teacher: 0 } },
      { text: "Intuitive readings & messages", points: { healer: 0, shaman: 1, oracle: 3, teacher: 1 } },
      { text: "Learning to heal myself & others", points: { healer: 1, shaman: 0, oracle: 1, teacher: 3 } },
    ],
  },
  {
    id: 3,
    question: "What resonates most with your soul?",
    options: [
      { text: "Energy flow and chakra balance", points: { healer: 3, shaman: 1, oracle: 1, teacher: 2 } },
      { text: "Ancient plant wisdom & rituals", points: { healer: 0, shaman: 3, oracle: 1, teacher: 0 } },
      { text: "Messages from spirit & beyond", points: { healer: 0, shaman: 1, oracle: 3, teacher: 0 } },
      { text: "Mastering spiritual practices", points: { healer: 1, shaman: 0, oracle: 0, teacher: 3 } },
    ],
  },
  {
    id: 4,
    question: "Where are you on your spiritual journey?",
    options: [
      { text: "Just beginning, need gentle support", points: { healer: 3, shaman: 0, oracle: 2, teacher: 1 } },
      { text: "Ready for profound transformation", points: { healer: 1, shaman: 3, oracle: 1, teacher: 1 } },
      { text: "Seeking specific answers or direction", points: { healer: 0, shaman: 1, oracle: 3, teacher: 0 } },
      { text: "Want to deepen & share my gifts", points: { healer: 1, shaman: 1, oracle: 0, teacher: 3 } },
    ],
  },
]

const results = {
  healer: {
    title: "THE HEALER",
    subtitle: "The Path of Restoration",
    description:
      "Your energy calls for gentle, nurturing restoration. The Healer's path offers in-person Reiki sessions and energy work to release blockages, ease physical discomfort, and restore balance to your being.",
    image: "/images/snake-healer1.jpg",
    href: "/services/healer",
    color: "#8B5CF6",
    animal: "Snake",
  },
  shaman: {
    title: "THE SHAMAN",
    subtitle: "The Path of Transformation",
    description:
      "Your soul yearns for deep, transformative experiences. The Shaman's path offers sacred plant medicine ceremonies and shamanic rituals that facilitate profound healing and spiritual breakthroughs.",
    image: "/images/jaguar-shaman1.jpg",
    href: "/services/shaman",
    color: "#6366F1",
    animal: "Jaguar",
  },
  oracle: {
    title: "THE ORACLE",
    subtitle: "The Path of Insight",
    description:
      "You seek clarity and divine guidance. The Oracle's path offers psychic readings, tarot consultations, and intuitive messages to illuminate your journey and help you make empowered decisions.",
    image: "/images/peacock-oracle1.jpg",
    href: "/services/oracle",
    color: "#EC4899",
    animal: "Peacock",
  },
  teacher: {
    title: "THE TEACHER",
    subtitle: "The Path of Mastery",
    description:
      "Your spirit is ready to learn and share healing gifts. The Teacher's path offers Reiki certification training and spiritual education to awaken and develop your own abilities.",
    image: "/images/fox-teacher1.jpg",
    href: "/services/teacher",
    color: "#F59E0B",
    animal: "Fox",
  },
}

type ResultKey = keyof typeof results

const cardOrder: ResultKey[] = ["healer", "shaman", "oracle", "teacher"]

interface JourneyQuizProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onClose?: () => void
}

export function JourneyQuiz({ open, onOpenChange, onClose }: JourneyQuizProps) {
  const [mounted, setMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ healer: 0, shaman: 0, oracle: 0, teacher: 0 })
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [recommendedCard, setRecommendedCard] = useState<ResultKey>("oracle")
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const [showAllPaths, setShowAllPaths] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [revealAllCards, setRevealAllCards] = useState(false)

  const handleClose = () => {
    soundManager.play("select")
    document.body.style.overflow = "unset"
    window.dispatchEvent(new CustomEvent("quiz-ended"))
    if (onClose) {
      onClose()
    }
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = "hidden"
    soundManager.initialize()
    window.dispatchEvent(new CustomEvent("quiz-started"))
    return () => {
      document.body.style.overflow = "unset"
      window.dispatchEvent(new CustomEvent("quiz-ended"))
    }
  }, [])

  useEffect(() => {
    if (showResult) {
      window.dispatchEvent(new CustomEvent("quiz-ended"))
    }
  }, [showResult])

  useEffect(() => {
    if (!showResult) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigateCard("prev")
      } else if (e.key === "ArrowRight") {
        navigateCard("next")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showResult, currentCardIndex])

  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      navigateCard("next")
    } else if (isRightSwipe) {
      navigateCard("prev")
    }
  }

  const navigateCard = useCallback((direction: "prev" | "next") => {
    soundManager.play("transition")
    setSlideDirection(direction === "next" ? "right" : "left")
    setCurrentCardIndex((prev) => {
      if (direction === "next") {
        return prev < cardOrder.length - 1 ? prev + 1 : prev
      } else {
        return prev > 0 ? prev - 1 : prev
      }
    })
  }, [])

  const goToCard = (index: number) => {
    soundManager.play("select")
    setSlideDirection(index > currentCardIndex ? "right" : "left")
    setCurrentCardIndex(index)
  }

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return

    soundManager.play("select")
    setSelectedAnswer(optionIndex)

    const option = questions[currentQuestion].options[optionIndex]
    const newScores = {
      healer: scores.healer + option.points.healer,
      shaman: scores.shaman + option.points.shaman,
      oracle: scores.oracle + option.points.oracle,
      teacher: scores.teacher + option.points.teacher,
    }

    setTimeout(() => {
      setScores(newScores)
      setSelectedAnswer(null)

      if (currentQuestion < questions.length - 1) {
        soundManager.play("transition")
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setIsRevealing(true)
        soundManager.play("transition")
        setTimeout(() => {
          const result = getResultFromScores(newScores)
          setRecommendedCard(result)
          const resultIndex = cardOrder.indexOf(result)
          setCurrentCardIndex(resultIndex)
          soundManager.play("reveal")
          setShowResult(true)
          setIsRevealing(false)
        }, 2500)
      }
    }, 600)
  }

  const getResultFromScores = (scoreObj: typeof scores): ResultKey => {
    const entries = Object.entries(scoreObj) as [ResultKey, number][]
    return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
  }

  const getResult = (): ResultKey => {
    return getResultFromScores(scores)
  }

  const getCurrentCard = () => {
    const key = cardOrder[currentCardIndex]
    return results[key]
  }

  const resetQuiz = () => {
    soundManager.play("select")
    setCurrentQuestion(0)
    setScores({ healer: 0, shaman: 0, oracle: 0, teacher: 0 })
    setShowResult(false)
    setSelectedAnswer(null)
    setIsRevealing(false)
    setCurrentCardIndex(0)
    setShowAllPaths(false)
    setRevealAllCards(false)
    window.dispatchEvent(new CustomEvent("quiz-started"))
  }

  const handleExploreAllPaths = () => {
    soundManager.play("select")
    setShowAllPaths(true)
    setRevealAllCards(true)
  }

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  }

  const getRecommendedResult = () => results[recommendedCard]

  if (!mounted) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="fixed inset-0 top-0 left-0 translate-x-0 translate-y-0 w-screen h-screen !max-w-none flex flex-col items-center justify-center bg-background/95 backdrop-blur-md border-0 p-0 rounded-none m-0 z-50"
        style={{
          maxWidth: "100vw",
          width: "100vw",
          height: "100vh",
          transform: "none",
        }}
        onInteractOutside={(e) => {
          if (!showResult && currentQuestion > 0) {
            e.preventDefault()
            if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
              onOpenChange?.(false)
            }
          }
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-[9999] p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          type="button"
          aria-label="Close quiz"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-8">
          {!showResult ? (
            <div className="w-full max-w-4xl">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs tracking-wider text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cream to-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-2 md:gap-3">
                  {questions.map((_, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rotate-45 border transition-all duration-500 ${
                          index < currentQuestion
                            ? "bg-foreground border-foreground"
                            : index === currentQuestion
                              ? "border-foreground bg-foreground/20"
                              : "border-border bg-transparent"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <div className="relative w-full max-w-2xl">
                  <AnimatePresence mode="wait">
                    {isRevealing ? (
                      <motion.div
                        key="revealing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center flex flex-col items-center justify-center py-16 md:py-20"
                      >
                        <motion.div
                          className="relative w-40 aspect-[2/3] mx-auto mb-10"
                          style={{ perspective: "1000px" }}
                        >
                          <motion.div
                            className="relative w-full h-full"
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 180 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div
                              className="absolute inset-0 bg-card border border-border"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <div className="absolute inset-[6px] border border-foreground/10" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 border border-foreground/20 rotate-45" />
                              </div>
                            </div>
                            <div
                              className="absolute inset-0 bg-card border border-border"
                              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                              <div className="absolute inset-[6px] border border-foreground/10" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                  className="font-serif text-3xl text-foreground/60"
                                >
                                  ✦
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
                        >
                          Revealing your path...
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`question-${currentQuestion}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5 }}
                        className="w-full flex flex-col justify-center py-8"
                      >
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12 md:mb-16 leading-tight tracking-tight px-4">
                          {questions[currentQuestion].question}
                        </h2>

                        <div className="space-y-3 md:space-y-4">
                          {questions[currentQuestion].options.map((option, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => handleAnswer(index)}
                              onMouseEnter={() => soundManager.play("hover")}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleAnswer(index)
                                }
                              }}
                              className={`group w-full text-left p-4 md:p-5 lg:p-6 border transition-all duration-300 cursor-pointer ${
                                selectedAnswer === index
                                  ? "bg-foreground border-foreground text-background scale-[1.02]"
                                  : selectedAnswer !== null
                                    ? "opacity-30 border-border pointer-events-none"
                                    : "bg-background/50 border-border hover:border-foreground hover:bg-background/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10"
                              }`}
                            >
                              <div className="flex items-center gap-4 md:gap-5">
                                <span
                                  className={`text-xs tracking-wider transition-colors duration-300 ${
                                    selectedAnswer === index
                                      ? "text-background/60"
                                      : "text-muted-foreground group-hover:text-foreground"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </span>

                                <div
                                  className={`w-px h-4 transition-colors duration-300 ${
                                    selectedAnswer === index ? "bg-background/20" : "bg-border"
                                  }`}
                                />

                                <span
                                  className={`text-sm md:text-base transition-colors duration-300 ${
                                    selectedAnswer === index
                                      ? "text-background"
                                      : "text-foreground/80 group-hover:text-foreground"
                                  }`}
                                >
                                  {option.text}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : !showAllPaths ? (
            <motion.div
              key="result-initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full py-2 md:py-4 flex flex-col items-center justify-center min-h-[420px] md:min-h-[450px]"
            >
              <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase text-center mb-4 md:mb-8">
                Your Spirit Guide Awaits
              </p>

              <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:flex-row lg:gap-12">
                <div
                  className="group relative"
                  style={{ "--card-color": getRecommendedResult().color } as React.CSSProperties}
                  onTouchStart={() => setIsTouchDevice(true)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-40 md:w-48 lg:w-56 aspect-[2/3] flex-shrink-0"
                  >
                    <div className="relative w-full h-full bg-card border-2 border-[var(--card-color)]/50 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform group-hover:border-[var(--card-color)]/80 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-12px_var(--card-color)] group-active:border-[var(--card-color)]/80 group-active:-translate-y-3 group-active:shadow-[0_20px_40px_-12px_var(--card-color)]">
                      <div className="absolute inset-[6px] border border-[var(--card-color)]/30 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:border-[var(--card-color)]/50 group-active:border-[var(--card-color)]/50" />

                      {[
                        "top-2 left-2",
                        "top-2 right-2 -scale-x-100",
                        "bottom-2 left-2 -scale-y-100",
                        "bottom-2 right-2 -scale-100",
                      ].map((pos, i) => (
                        <svg
                          key={i}
                          className={`absolute ${pos} w-3 h-3 text-[var(--card-color)]`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path d="M1 6V1h5" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      ))}

                      <div className="absolute inset-[12px] overflow-hidden bg-muted">
                        <Image
                          src={getRecommendedResult().image || "/placeholder.svg"}
                          alt={`${getRecommendedResult().title} tarot card - your recommended spiritual path`}
                          fill
                          className="object-cover object-center scale-[1.15]"
                        />
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `linear-gradient(to top, ${getRecommendedResult().color}, transparent)`,
                          }}
                        />
                      </div>

                      <div className="absolute bottom-[12px] left-[12px] right-[12px] bg-background/95 py-2 px-2 border-t border-[var(--card-color)]/20">
                        <h3 className="font-serif text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-center uppercase text-[var(--card-color)]">
                          {getRecommendedResult().title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="max-w-sm text-center lg:text-left px-4 md:px-0">
                  <p
                    className="text-[9px] tracking-[0.3em] uppercase mb-1 md:mb-2"
                    style={{ color: getRecommendedResult().color }}
                  >
                    {getRecommendedResult().animal} Medicine
                  </p>

                  <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-1">
                    {getRecommendedResult().title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted-foreground italic mb-3 md:mb-4">
                    {getRecommendedResult().subtitle}
                  </p>

                  <div className="w-12 h-px bg-border mb-3 md:mb-4 mx-auto lg:mx-0" />

                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">
                    {getRecommendedResult().description}
                  </p>

                  <div className="flex flex-col gap-2 md:gap-3">
                    <Button
                      asChild
                      className="bg-foreground text-background hover:bg-foreground/90 px-5 md:px-6 py-3 md:py-4 text-[9px] md:text-[10px] tracking-[0.2em] uppercase w-full sm:w-auto"
                      onClick={() => soundManager.play("select")}
                    >
                      <Link href={getRecommendedResult().href} scroll={true}>
                        Explore This Path
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={resetQuiz}
                      className="text-muted-foreground hover:text-foreground text-[8px] md:text-[9px] tracking-[0.15em] uppercase"
                    >
                      <RotateCcw className="mr-2 h-3 w-3" />
                      Retake Quiz
                    </Button>
                  </div>

                  <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-border/30">
                    <button
                      onClick={handleExploreAllPaths}
                      className="text-[8px] md:text-[9px] tracking-[0.2em] text-muted-foreground/60 hover:text-muted-foreground uppercase transition-colors"
                    >
                      Not your path? Browse all spirit guides →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="all-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full py-2 md:py-4 flex flex-col items-center justify-center gap-6 md:gap-8"
            >
              <div className="absolute top-5 right-5 z-[10001]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-foreground transition-all duration-300"
                    type="button"
                    aria-label="Close quiz"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative w-full max-w-3xl my-auto py-20 md:py-24 border border-dashed border-foreground/20 p-4 md:p-8 lg:p-12 min-h-[500px] md:min-h-[550px]">
                <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:flex-row lg:gap-12">
                  <div
                    className="group relative"
                    style={{ "--card-color": getCurrentCard().color } as React.CSSProperties}
                    onTouchStart={() => setIsTouchDevice(true)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative w-40 md:w-48 lg:w-56 aspect-[2/3] flex-shrink-0"
                    >
                      <div className="relative w-full h-full bg-card border-2 border-[var(--card-color)]/50 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform group-hover:border-[var(--card-color)]/80 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-12px_var(--card-color)] group-active:border-[var(--card-color)]/80 group-active:-translate-y-3 group-active:shadow-[0_20px_40px_-12px_var(--card-color)]">
                        <div className="absolute inset-[6px] border border-[var(--card-color)]/30 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:border-[var(--card-color)]/50 group-active:border-[var(--card-color)]/50" />

                        {[
                          "top-2 left-2",
                          "top-2 right-2 -scale-x-100",
                          "bottom-2 left-2 -scale-y-100",
                          "bottom-2 right-2 -scale-100",
                        ].map((pos, i) => (
                          <svg
                            key={i}
                            className={`absolute ${pos} w-3 h-3 text-[var(--card-color)]`}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path d="M1 6V1h5" stroke="currentColor" strokeWidth="1" />
                          </svg>
                        ))}

                        <div className="absolute inset-[12px] overflow-hidden bg-muted">
                          <Image
                            src={getCurrentCard().image || "/placeholder.svg"}
                            alt={`${getCurrentCard().title} tarot card representing ${getCurrentCard().description}`}
                            fill
                            className="object-cover object-center scale-[1.15]"
                          />
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: `linear-gradient(to top, ${getCurrentCard().color}, transparent)`,
                            }}
                          />
                        </div>

                        <div className="absolute bottom-[12px] left-[12px] right-[12px] bg-background/95 py-1.5 px-2 border-t border-[var(--card-color)]/20">
                          <h3 className="font-serif text-[8px] tracking-[0.2em] text-center uppercase text-[var(--card-color)]">
                            {getCurrentCard().title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="max-w-xs text-center lg:text-left px-4 md:px-0">
                    <p
                      className="text-[9px] tracking-[0.3em] uppercase mb-1 md:mb-2"
                      style={{ color: getCurrentCard().color }}
                    >
                      {getCurrentCard().animal} Medicine
                    </p>

                    <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-1">
                      {getCurrentCard().title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground italic mb-3 md:mb-4">
                      {getCurrentCard().subtitle}
                    </p>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">
                      {getCurrentCard().description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 text-[8px] tracking-[0.2em] uppercase"
                        onClick={() => soundManager.play("select")}
                      >
                        <Link href={getCurrentCard().href} scroll={true}>
                          Explore Path
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetQuiz}
                        className="text-muted-foreground hover:text-foreground text-[8px] tracking-[0.15em] uppercase"
                      >
                        <RotateCcw className="mr-1 h-3 w-3" />
                        Retake
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-full">
                  <button
                    onClick={() => navigateCard("prev")}
                    disabled={currentCardIndex === 0}
                    className={`absolute left-2 md:left-0 lg:-left-4 z-10 p-2 md:p-2.5 border border-border transition-all duration-300 ${
                      currentCardIndex === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:border-foreground hover:bg-background/50 active:scale-95"
                    }`}
                    aria-label="Previous card"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                  </button>

                  <div className="overflow-hidden w-full max-w-xl px-12 md:px-14">
                    <AnimatePresence mode="wait" custom={slideDirection}>
                      <motion.div
                        key={currentCardIndex}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:flex-row lg:gap-8"
                      >
                        <div
                          className="relative w-40 md:w-48 lg:w-56 aspect-[2/3] flex-shrink-0"
                          style={{ "--card-color": getCurrentCard().color } as React.CSSProperties}
                        >
                          {cardOrder[currentCardIndex] === recommendedCard && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-foreground text-background text-[8px] tracking-[0.2em] uppercase whitespace-nowrap">
                              Your Match
                            </div>
                          )}

                          <div className="relative w-full h-full bg-card border-2 border-[var(--card-color)]/50 overflow-hidden">
                            <div className="absolute inset-[6px] border border-[var(--card-color)]/30 pointer-events-none" />

                            {[
                              "top-2 left-2",
                              "top-2 right-2 -scale-x-100",
                              "bottom-2 left-2 -scale-y-100",
                              "bottom-2 right-2 -scale-100",
                            ].map((pos, i) => (
                              <svg
                                key={i}
                                className={`absolute ${pos} w-3 h-3 text-[var(--card-color)]`}
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path d="M1 6V1h5" stroke="currentColor" strokeWidth="1" />
                              </svg>
                            ))}

                            <div className="absolute inset-[10px] overflow-hidden bg-muted">
                              <Image
                                src={getCurrentCard().image || "/placeholder.svg"}
                                alt={`${getCurrentCard().title} tarot card representing ${getCurrentCard().description}`}
                                fill
                                className="object-cover object-center scale-[1.15] grayscale-0 transition-all duration-700"
                              />
                              <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  background: `linear-gradient(to top, ${getCurrentCard().color}, transparent)`,
                                }}
                              />
                            </div>

                            <div className="absolute bottom-[10px] left-[10px] right-[10px] bg-background/95 py-1.5 px-2 border-t border-[var(--card-color)]/20">
                              <h3 className="font-serif text-[8px] tracking-[0.2em] text-center uppercase text-[var(--card-color)]">
                                {getCurrentCard().title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="max-w-xs text-center lg:text-left px-4 md:px-0">
                          <p
                            className="text-[9px] tracking-[0.3em] uppercase mb-1 md:mb-2"
                            style={{ color: getCurrentCard().color }}
                          >
                            {getCurrentCard().animal} Medicine
                          </p>

                          <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-1">
                            {getCurrentCard().title}
                          </h3>

                          <p className="text-xs md:text-sm text-muted-foreground italic mb-3 md:mb-4">
                            {getCurrentCard().subtitle}
                          </p>

                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6 line-clamp-4 md:line-clamp-none">
                            {getCurrentCard().description}
                          </p>

                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <Button
                              asChild
                              size="sm"
                              className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 text-[8px] tracking-[0.2em] uppercase"
                              onClick={() => soundManager.play("select")}
                            >
                              <Link href={getCurrentCard().href} scroll={true}>
                                Explore Path
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Link>
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={resetQuiz}
                              className="text-muted-foreground hover:text-foreground text-[8px] tracking-[0.15em] uppercase"
                            >
                              <RotateCcw className="mr-1 h-3 w-3" />
                              Retake
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={() => navigateCard("next")}
                    disabled={currentCardIndex === cardOrder.length - 1}
                    className={`absolute right-2 md:right-0 lg:-right-4 z-10 p-2 md:p-2.5 border border-border transition-all duration-300 ${
                      currentCardIndex === cardOrder.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:border-foreground hover:bg-background/50 active:scale-95"
                    }`}
                    aria-label="Next card"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                  </button>
                </div>

                <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-muted-foreground/50 uppercase text-center mt-4 lg:hidden">
                  Swipe to explore all paths
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
