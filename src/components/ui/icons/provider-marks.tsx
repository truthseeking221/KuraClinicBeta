import SiTelegram from '@icons-pack/react-simple-icons/icons/SiTelegram.mjs';
import { forwardRef } from 'react';
import type {
  ComponentPropsWithoutRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';

/** Provider marks available to configured identity-provider UI only. */
export type IdentityProviderBrand = 'google' | 'telegram';

/**
 * Provider marks retain their approved brand treatment. They are decorative
 * whenever the provider name is already visible in the associated control.
 */
export type ProviderMarkProps = Omit<
  ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  size?: string | number;
};

export type ProviderMarkComponent = ForwardRefExoticComponent<
  ProviderMarkProps & RefAttributes<HTMLSpanElement>
>;

function createProviderMark(
  brand: IdentityProviderBrand,
  displayName: string,
  renderMark: () => ReactNode,
): ProviderMarkComponent {
  const ProviderMark = forwardRef<HTMLSpanElement, ProviderMarkProps>(
    function ProviderMark(
      {
        'aria-hidden': ariaHidden = true,
        'aria-label': ariaLabel,
        size = '1em',
        style,
        ...props
      },
      ref,
    ) {
      const isDecorative = ariaHidden !== false && ariaHidden !== 'false';
      const accessibleName = ariaLabel ?? (isDecorative ? undefined : `${displayName} logo`);

      return (
        <span
          {...props}
          ref={ref}
          aria-hidden={accessibleName ? undefined : true}
          aria-label={accessibleName}
          data-kura-provider-mark={brand}
          role={accessibleName ? 'img' : undefined}
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flex: '0 0 auto',
            height: size,
            justifyContent: 'center',
            width: size,
            ...style,
          }}
        >
          {renderMark()}
        </span>
      );
    },
  );

  ProviderMark.displayName = `${displayName}ProviderMark`;
  return ProviderMark;
}

/** Canonical Kura wrapper for Google's approved standard-colour gradient Super G. */
export const GoogleProviderMark = createProviderMark('google', 'Google', () => (
  <span
    aria-hidden="true"
    data-provider-mark-treatment="official-standard-color"
    style={{
      backgroundImage: 'url("/brand/providers/google-g.png")',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      display: 'block',
      height: '100%',
      width: '100%',
    }}
  />
));

/** Canonical Kura wrapper for the approved Telegram provider mark. */
export const TelegramProviderMark = createProviderMark('telegram', 'Telegram', () => (
  <SiTelegram
    aria-hidden="true"
    color="currentColor"
    focusable="false"
    size="100%"
    title=""
  />
));

/** The auth owner selects one of these explicit canonical marks from configuration. */
export const IDENTITY_PROVIDER_MARKS: Record<
  IdentityProviderBrand,
  ProviderMarkComponent
> = {
  google: GoogleProviderMark,
  telegram: TelegramProviderMark,
};

export function getIdentityProviderMark(brand: IdentityProviderBrand) {
  return IDENTITY_PROVIDER_MARKS[brand];
}
