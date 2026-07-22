'use client';

import { useT } from '../../components/foundations/i18n';
import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ShoppingCartIcon,
} from '../../components/ui';

import { itemCount } from './logic';
import { OrderCart } from './order-cart';
import type { OrderCartProps } from './order-cart';
import type { OrderCartData, OrderCartPatient } from './types';
import styles from './floating-order-cart.module.css';

type PatientScopedCart = OrderCartData & { patient: OrderCartPatient };

export type FloatingOrderCartProps = Omit<OrderCartProps, 'cart' | 'className'> & {
  /** A floating clinical cart must always identify its patient. */
  cart: PatientScopedCart;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/**
 * Patient-scoped anchored access to the canonical OrderCart. The wrapper owns
 * disclosure and focus return only; cart truth and mutations stay with the
 * existing OrderCart workflow owner.
 */
export function FloatingOrderCart({
  cart,
  defaultOpen,
  onOpenChange,
  open,
  ...orderCartProps
}: FloatingOrderCartProps) {
  const t = useT();
  const count = itemCount(cart.items);
  const countLabel =
    count === 0 ? t('empty') : `${count} ${t(count === 1 ? 'test' : 'tests')}`;

  return (
    <Popover defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger
        render={
          <Button
            aria-label={`${t('Order cart for')} ${cart.patient.name}, ${countLabel}`}
            className={styles.trigger}
            size="sm"
            variant="outline"
          >
            <ShoppingCartIcon aria-hidden="true" size={16} />
            {t('Order cart')}
            {count > 0 ? (
              <Badge
                aria-label={`${count} ${t('tests in cart')}`}
                size="sm"
                variant="secondary"
              >
                {count}
              </Badge>
            ) : null}
          </Button>
        }
      />
      <PopoverContent
        align="end"
        aria-label={`${t('Order cart for')} ${cart.patient.name}`}
        className={styles.content}
        initialFocus={false}
        role="dialog"
        side="bottom"
        sideOffset={8}
      >
        <div className={styles.patientScope} data-slot="floating-order-cart-patient">
          <span className={styles.patientName}>{cart.patient.name}</span>
          <span className={styles.patientMeta}>
            {[cart.patient.demographicLabel, cart.patient.identifier].filter(Boolean).join(' · ')}
          </span>
        </div>
        <OrderCart {...orderCartProps} cart={cart} className={styles.cart} />
      </PopoverContent>
    </Popover>
  );
}
