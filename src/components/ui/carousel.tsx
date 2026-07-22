'use client';

import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';

import { useT } from '../foundations/i18n';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from './icons';
import { Button, type ButtonProps } from './button';

import styles from './carousel.module.css';

export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = CarouselParameters[0];
export type CarouselPlugin = CarouselParameters[1];
export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: CarouselOrientation;
  setApi?: (api: CarouselApi) => void;
}

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: CarouselOrientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnapCount: number;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ');
}

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('Carousel components must be rendered inside <Carousel>.');
  }
  return context;
}

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function Carousel({
  opts,
  plugins,
  orientation = 'horizontal',
  setApi,
  className,
  onKeyDown,
  role = 'region',
  'aria-roledescription': ariaRoleDescription = 'carousel',
  tabIndex,
  ...props
}: CarouselProps) {
  const axis = orientation === 'horizontal' ? 'x' : 'y';
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis }, plugins);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnapCount, setScrollSnapCount] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  const updateState = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnapCount(emblaApi.scrollSnapList().length);
  }, []);

  React.useEffect(() => {
    if (!api) return undefined;

    setApi?.(api);
    api.on('select', updateState);
    api.on('reInit', updateState);
    let active = true;
    queueMicrotask(() => {
      if (active) updateState(api);
    });

    return () => {
      active = false;
      api.off('select', updateState);
      api.off('reInit', updateState);
    };
  }, [api, setApi, updateState]);

  React.useEffect(() => {
    if (!prefersReducedMotion) return;
    for (const plugin of plugins ?? []) {
      (plugin as { stop?: () => void }).stop?.();
    }
  }, [plugins, prefersReducedMotion]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const target = event.target as HTMLElement;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target.isContentEditable
    ) {
      return;
    }

    const previousKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (event.key === previousKey) {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  const contextValue = React.useMemo<CarouselContextValue>(
    () => ({
      carouselRef,
      api,
      orientation,
      scrollPrev: () => api?.scrollPrev(),
      scrollNext: () => api?.scrollNext(),
      canScrollPrev,
      canScrollNext,
      selectedIndex,
      scrollSnapCount,
    }),
    [api, canScrollNext, canScrollPrev, carouselRef, orientation, selectedIndex, scrollSnapCount],
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        {...props}
        role={role}
        aria-roledescription={ariaRoleDescription}
        tabIndex={tabIndex ?? 0}
        data-slot="carousel"
        data-orientation={orientation}
        className={joinClasses(styles.carousel, className)}
        onKeyDown={handleKeyDown}
      />
    </CarouselContext.Provider>
  );
}

export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div
        ref={(node) => {
          carouselRef(node);
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-slot="carousel-viewport"
        className={styles.viewport}
      >
        <div
          {...props}
          data-slot="carousel-content"
          data-orientation={orientation}
          className={joinClasses(
            styles.track,
            orientation === 'vertical' ? styles.verticalTrack : undefined,
            className,
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);

CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, role = 'group', 'aria-roledescription': ariaRoleDescription = 'slide', ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      role={role}
      aria-roledescription={ariaRoleDescription}
      data-slot="carousel-item"
      className={joinClasses(styles.item, className)}
    />
  ),
);

CarouselItem.displayName = 'CarouselItem';

export type CarouselPreviousProps = ButtonProps;

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, variant = 'outline', size = 'icon-lg', onClick, disabled, 'aria-label': ariaLabel, ...props }, ref) => {
    const t = useT();
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        {...props}
        data-slot="carousel-previous"
        variant={variant}
        size={size}
        className={joinClasses(
          styles.control,
          orientation === 'horizontal' ? styles.previousHorizontal : styles.previousVertical,
          className,
        )}
        disabled={!canScrollPrev || disabled}
        aria-label={ariaLabel ?? t('Previous slide')}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) scrollPrev();
        }}
      >
        {orientation === 'horizontal' ? (
          <ChevronLeftIcon aria-hidden="true" />
        ) : (
          <ChevronUpIcon aria-hidden="true" />
        )}
      </Button>
    );
  },
);

CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, variant = 'outline', size = 'icon-lg', onClick, disabled, 'aria-label': ariaLabel, ...props }, ref) => {
    const t = useT();
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        {...props}
        data-slot="carousel-next"
        variant={variant}
        size={size}
        className={joinClasses(
          styles.control,
          orientation === 'horizontal' ? styles.nextHorizontal : styles.nextVertical,
          className,
        )}
        disabled={!canScrollNext || disabled}
        aria-label={ariaLabel ?? t('Next slide')}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) scrollNext();
        }}
      >
        {orientation === 'horizontal' ? (
          <ChevronRightIcon aria-hidden="true" />
        ) : (
          <ChevronDownIcon aria-hidden="true" />
        )}
      </Button>
    );
  },
);

CarouselNext.displayName = 'CarouselNext';

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  getLabel?: (index: number) => string;
}

export const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, getLabel, ...props }, ref) => {
    const t = useT();
    const { api, selectedIndex, scrollSnapCount } = useCarousel();
    const resolvedGetLabel = getLabel ?? ((index: number) => `${t('Go to slide')} ${index + 1}`);
    if (!scrollSnapCount) return null;

    return (
      <div
        ref={ref}
        {...props}
        role="group"
        aria-label={t('Slide navigation')}
        data-slot="carousel-dots"
        className={joinClasses(styles.dots, className)}
      >
        {Array.from({ length: scrollSnapCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={resolvedGetLabel(index)}
            aria-current={index === selectedIndex ? 'true' : undefined}
            data-selected={index === selectedIndex ? 'true' : 'false'}
            className={styles.dotButton}
            onClick={() => api?.scrollTo(index)}
          >
            <span aria-hidden="true" className={styles.dot} />
          </button>
        ))}
      </div>
    );
  },
);

CarouselDots.displayName = 'CarouselDots';

export { useCarousel };
