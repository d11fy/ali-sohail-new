import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type TransitionLifecycle = "IDLE" | "EXIT" | "ROUTE_SWAP" | "ENTER";

export interface NavigateOptions {
  history?: boolean;
  restoreScroll?: number;
  hash?: string;
}

export interface TransitionContextType {
  currentRoute: string;
  lifecycle: TransitionLifecycle;
  isTransitioning: boolean;
  navigate: (to: string, options?: NavigateOptions) => Promise<void>;
  goToHome: () => Promise<void>;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

// Serialized promise queue to prevent concurrency and duplicate navigation
let navigationQueue: Promise<void> = Promise.resolve();

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Normalize initial route from window location
  const getInitialRoute = () => {
    if (typeof window === "undefined") return "/";
    const p = window.location.pathname.replace(/\/$/, "") || "/";
    return ["/process", "/projects", "/about", "/contact"].includes(p) ? p : "/";
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [lifecycle, setLifecycle] = useState<TransitionLifecycle>("IDLE");
  const homeScrollYRef = useRef<number>(0);
  const currentRouteRef = useRef<string>(currentRoute);
  currentRouteRef.current = currentRoute;

  // Title management per route matching portfolio content
  useEffect(() => {
    switch (currentRoute) {
      case "/process":
        document.title = "من الفكرة للكود | الأدوات والتقنيات — علي سهيل الكحلوت";
        break;
      case "/projects":
        document.title = "المشاريع والأعمال الرقمية — علي سهيل الكحلوت";
        break;
      case "/about":
        document.title = "من غزة إلى العالم | عنّي — علي سهيل الكحلوت";
        break;
      case "/contact":
        document.title = "عندك فكرة؟ | تواصل معي — علي سهيل الكحلوت";
        break;
      case "/":
      default:
        document.title = "علي سهيل الكحلوت — Full-Stack & AI";
        break;
    }
  }, [currentRoute]);

  const executeTransition = useCallback(
    async (targetRoute: string, options: NavigateOptions = {}): Promise<void> => {
      const fromRoute = currentRouteRef.current;
      const { history = true, restoreScroll, hash = "" } = options;

      // Same route click: scroll to top smoothly or target hash without transition
      if (targetRoute === fromRoute && !hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Save scroll position when departing homepage
      if (fromRoute === "/") {
        homeScrollYRef.current = window.scrollY;
      }

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // If user prefers reduced motion: instant swap without animations
      if (prefersReduced) {
        if (history) {
          window.history.pushState(null, "", targetRoute + hash);
        }
        setCurrentRoute(targetRoute);
        const targetY =
          targetRoute === "/"
            ? restoreScroll ?? homeScrollYRef.current ?? 0
            : 0;
        window.scrollTo({ top: targetY, behavior: "instant" });
        setTimeout(() => ScrollTrigger.refresh(), 50);
        return;
      }

      // --- PHASE 1: EXIT (Matching RASAS page transition) ---
      setLifecycle("EXIT");

      const activeContainer =
        (document.querySelector(".subpage-container") as HTMLElement | null) ||
        (document.querySelector("main") as HTMLElement | null);

      if (activeContainer) {
        // Collect visible elements in the current viewport to animate them out
        const allElements = activeContainer.querySelectorAll<HTMLElement>(
          "[data-reveal], .subpage-header, .entry-card, .hero-word, h1, h2, p"
        );

        const visibleElements = Array.from(allElements).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });

        const exitTimeline = gsap.timeline();

        if (visibleElements.length > 0) {
          exitTimeline.to(
            visibleElements,
            {
              opacity: 0,
              y: -30,
              duration: 0.38,
              ease: "power2.in",
              overwrite: true,
            },
            0
          );
        }

        exitTimeline.to(
          activeContainer,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.in",
          },
          visibleElements.length > 0 ? 0.05 : 0
        );

        await new Promise<void>((resolve) => {
          exitTimeline.eventCallback("onComplete", () => resolve());
        });
      }

      // --- PHASE 2: ROUTE_SWAP ---
      setLifecycle("ROUTE_SWAP");

      if (history) {
        window.history.pushState(null, "", targetRoute + hash);
      }

      setCurrentRoute(targetRoute);

      // Coordinate with React commit phase
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          setTimeout(resolve, 10);
        });
      });

      // Reset scroll position instantaneously before revealing new page
      const targetY =
        targetRoute === "/"
          ? restoreScroll ?? homeScrollYRef.current ?? 0
          : 0;
      window.scrollTo({ top: targetY, behavior: "instant" });

      // --- PHASE 3: ENTER (Matching RASAS page entrance) ---
      setLifecycle("ENTER");

      const newContainer =
        (document.querySelector(".subpage-container") as HTMLElement | null) ||
        (document.querySelector("main") as HTMLElement | null);

      if (newContainer) {
        gsap.set(newContainer, { opacity: 0, clearProps: "transform" });

        const enterTimeline = gsap.timeline();

        enterTimeline.fromTo(
          newContainer,
          { opacity: 0 },
          { opacity: 1, duration: 0.75, ease: "power2.out" },
          0
        );

        const entranceElements = newContainer.querySelectorAll<HTMLElement>(
          "[data-reveal], .subpage-header, .entry-card, .hero-word"
        );

        const visibleEntrance = Array.from(entranceElements).filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });

        if (visibleEntrance.length > 0) {
          enterTimeline.fromTo(
            visibleEntrance,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              stagger: 0.05,
              clearProps: "transform",
            },
            0.08
          );
        }

        newContainer.focus?.({ preventScroll: true });

        await new Promise<void>((resolve) => {
          enterTimeline.eventCallback("onComplete", () => resolve());
        });
      }

      ScrollTrigger.refresh();
      setLifecycle("IDLE");
    },
    []
  );

  // Serialized navigation dispatcher
  const navigate = useCallback(
    (to: string, options: NavigateOptions = {}): Promise<void> => {
      navigationQueue = navigationQueue
        .catch(() => {})
        .then(() => executeTransition(to, options));
      return navigationQueue;
    },
    [executeTransition]
  );

  const goToHome = useCallback((): Promise<void> => {
    return navigate("/");
  }, [navigate]);

  // Handle browser back and forward actions (popstate)
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      const valid = ["/process", "/projects", "/about", "/contact"].includes(path)
        ? path
        : "/";
      const restoreScroll =
        valid === "/" ? homeScrollYRef.current : (e.state?.scrollY ?? 0);

      navigate(valid, {
        history: false,
        restoreScroll,
        hash: window.location.hash,
      });
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [navigate]);

  return (
    <TransitionContext.Provider
      value={{
        currentRoute,
        lifecycle,
        isTransitioning: lifecycle !== "IDLE",
        navigate,
        goToHome,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageNavigation = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error(
      "usePageNavigation must be used within a TransitionProvider"
    );
  }
  return context;
};
