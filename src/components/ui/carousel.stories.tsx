import AutoplayPlugin from 'embla-carousel-autoplay';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { ComponentProps } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Card } from './card';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './carousel';

const meta = {
  title: 'Design System/Components/Carousel',
  component: Carousel,
  tags: ['autodocs', 'source-reui', 'adapted-kura'],
  parameters: {
    layout: 'padded',
    kura: {
      intake: {
        decision: 'CREATE',
        owner: 'src/components/ui',
        evidence:
          'The active Storybook index had no generic carousel primitive. The existing domain CarouselLane was a feature-local horizontal lane without shared keyboard, selection, thumbnail, or responsive contracts.',
      },
      source: {
        vendor: 'ReUI',
        registryItem: 'carousel',
        sourceUrl: 'https://reui.io/components/carousel',
      },
      binding: {
        colors: 'kura-semantic',
        typography: 'kura',
        spacing: 'kura',
        radius: 'kura',
        elevation: 'kura-focus-only',
        icons: 'kura-canonical',
        density: 'kura-root-attribute',
        responsive: 'preserves-task-and-44px-touch-targets',
      },
      exclusions: [
        {
          capability: 'Autoplay as a default behavior',
          reason: 'Automatic movement can hide operational context and is unsafe as a default in clinic workflows.',
          replacement: 'Autoplay is opt-in, stops on interaction, and is stopped for reduced-motion preferences.',
        },
        {
          capability: 'External demo imagery',
          reason: 'ReUI demo imagery does not represent Kura data or clinical workflow meaning.',
          replacement: 'Stories use semantic workflow surfaces and realistic clinic copy.',
        },
      ],
    },
    docs: {
      description: {
        component:
          'A touch-friendly, keyboard-operable carousel for scanning a short sequence of related clinic workflow items. Use it when preserving the user’s place matters; do not hide safety-critical information behind automatic movement.',
      },
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const SLIDES = [
  {
    id: 'identity',
    title: 'Verify patient identity',
    description: 'Confirm identifiers before opening the clinical record.',
    surface: 'bg-primary text-primary-foreground',
  },
  {
    id: 'results',
    title: 'Review latest results',
    description: 'Check abnormal and pending results before the next action.',
    surface: 'bg-secondary text-secondary-foreground',
  },
  {
    id: 'follow-up',
    title: 'Plan follow-up',
    description: 'Record the next step and the responsible care team member.',
    surface: 'bg-accent text-accent-foreground',
  },
  {
    id: 'handoff',
    title: 'Prepare a safe handoff',
    description: 'Keep unresolved risks visible for the next reviewer.',
    surface: 'bg-muted text-foreground',
  },
] as const;

function WorkflowSlide({ index, overlay = false }: { index: number; overlay?: boolean }) {
  const slide = SLIDES[index % SLIDES.length];

  if (overlay) {
    return (
      <div
        role="img"
        aria-label={`Clinical workflow visual: ${slide.title}`}
        className={`relative aspect-video overflow-hidden rounded-lg ${slide.surface}`}
      >
        <div className="absolute inset-x-0 bottom-0 bg-foreground p-4 text-background">
          <p className="text-sm font-semibold">{slide.title}</p>
          <p className="mt-1 text-xs text-background">{slide.description}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="flex min-h-44 flex-col justify-between p-4">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Workflow step {index + 1}
      </span>
      <div>
        <h3 className="text-base font-semibold text-foreground">{slide.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{slide.description}</p>
      </div>
    </Card>
  );
}

function WorkflowCarousel({
  children,
  className,
  ...props
}: ComponentProps<typeof Carousel>) {
  return (
    <Carousel className={`w-full ${className ?? ''}`} {...props}>
      {children}
    </Carousel>
  );
}

export const Basic: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Clinical workflow steps" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} aria-label={`${index + 1} of ${SLIDES.length}`}>
            <WorkflowSlide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('region', { name: 'Clinical workflow steps' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: 'Next slide' })).toBeEnabled();
    await userEvent.tab();
    await expect(canvas.getByRole('region', { name: 'Clinical workflow steps' })).toHaveFocus();
  },
};

export const SingleSlide: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Patient identity reminder" className="max-w-xl">
      <CarouselContent>
        <CarouselItem aria-label="Identity reminder"><WorkflowSlide index={0} /></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Vertical clinical workflow steps" orientation="vertical" className="max-w-xl">
      <CarouselContent className="h-80">
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-1/2" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const MultipleVisibleItems: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Care workflow overview" opts={{ align: 'start' }} className="max-w-4xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-1/3" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const ResponsiveBasis: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Responsive care priorities" opts={{ align: 'start' }} className="max-w-4xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="sm:basis-1/2 lg:basis-1/3" aria-label={slide.title}>
            <WorkflowSlide index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const Autoplay: Story = {
  render: () => {
    const plugins = useMemo(
      () => [AutoplayPlugin({ delay: 4000, stopOnFocusIn: true, stopOnInteraction: true, stopOnMouseEnter: true })],
      [],
    );
    return (
      <WorkflowCarousel aria-label="Timed workflow reminders" plugins={plugins} className="max-w-xl">
        <CarouselContent>
          {SLIDES.map((slide, index) => (
            <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </WorkflowCarousel>
    );
  },
};

export const CenteredSlides: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Centered care priorities" opts={{ align: 'center', loop: true }} className="max-w-2xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-3/4" aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const CustomSpacing: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Spaced workflow steps" className="max-w-xl">
      <CarouselContent className="-ml-2">
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-1/2 pl-2" aria-label={slide.title}><WorkflowSlide index={index} /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const ImageOverlays: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Clinical workflow visuals" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} overlay /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

function SynchronizedThumbnailCarousel({ overlay = false }: { overlay?: boolean }) {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMainSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbnailApi?.scrollTo(index);
  }, [mainApi, thumbnailApi]);

  useEffect(() => {
    if (!mainApi) return undefined;
    queueMicrotask(handleMainSelect);
    mainApi.on('select', handleMainSelect);
    mainApi.on('reInit', handleMainSelect);
    return () => {
      mainApi.off('select', handleMainSelect);
      mainApi.off('reInit', handleMainSelect);
    };
  }, [handleMainSelect, mainApi]);

  const thumbnailStrip = (
    <Carousel aria-label="Workflow step thumbnails" setApi={setThumbnailApi} opts={{ containScroll: 'keepSnaps', dragFree: true }}>
      <CarouselContent className="-ml-2">
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} className="basis-1/4 pl-2 sm:basis-1/5">
            <button
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className="block min-h-11 w-full rounded-md border border-transparent p-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => mainApi?.scrollTo(index)}
            >
              <span aria-hidden="true" className={`block aspect-video rounded-sm border-2 ${index === selectedIndex ? 'border-primary' : 'border-transparent'} ${slide.surface}`} />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );

  return (
    <div className="w-full max-w-2xl">
      <Carousel aria-label="Clinical workflow gallery" setApi={setMainApi}>
        <CarouselContent>
          {SLIDES.map((slide, index) => (
            <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} overlay={overlay} /></CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className={overlay ? 'relative z-10 -mt-20 bg-foreground p-3' : 'mt-3'}>{thumbnailStrip}</div>
    </div>
  );
}

export const ThumbnailNavigation: Story = { render: () => <SynchronizedThumbnailCarousel /> };
export const OverlayThumbnailNavigation: Story = { render: () => <SynchronizedThumbnailCarousel overlay /> };

export const DotsNavigation: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Workflow reminders with dots" className="max-w-xl">
      <CarouselContent>
        {SLIDES.map((slide, index) => (
          <CarouselItem key={slide.id} aria-label={slide.title}><WorkflowSlide index={index} overlay /></CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </WorkflowCarousel>
  ),
};

export const LongOperationalContent: Story = {
  render: () => (
    <WorkflowCarousel aria-label="Long clinical workflow labels" className="max-w-xl">
      <CarouselContent>
        {[
          'Kết quả xét nghiệm cần bác sĩ xác nhận trước khi trả lời bệnh nhân',
          'Lịch sử điều trị và thuốc đang dùng cần được đối chiếu với hồ sơ hiện tại',
          'Hướng dẫn theo dõi sau tư vấn cần giữ nguyên thông tin liên hệ khẩn cấp',
        ].map((label, index) => (
          <CarouselItem key={label} aria-label={label}>
            <Card className="min-h-44 p-4"><p className="text-sm font-semibold leading-6 text-foreground">{label}</p><p className="mt-3 text-xs text-muted-foreground">Workflow item {index + 1}</p></Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </WorkflowCarousel>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="w-full max-w-xl" role="status" aria-label="Loading workflow items">
      <div className="flex gap-4">
        {Array.from({ length: 2 }, (_, index) => <div key={index} className="min-h-44 flex-1 rounded-lg border border-border bg-muted p-4"><div className="h-3 w-1/3 rounded-sm bg-muted-foreground" /><div className="mt-20 h-3 w-2/3 rounded-sm bg-muted-foreground" /></div>)}
      </div>
      <span className="sr-only">Loading clinical workflow items</span>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-full max-w-xl rounded-lg border border-dashed border-border p-6 text-center" role="status">
      <p className="text-sm font-medium text-foreground">No workflow items available</p>
      <p className="mt-1 text-sm text-muted-foreground">New clinical reminders will appear here when the record has an active next step.</p>
    </div>
  ),
};
