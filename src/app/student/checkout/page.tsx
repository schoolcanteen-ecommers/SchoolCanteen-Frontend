import { CheckoutPageContent } from "@/features/cart/components/checkout-page-content";
import { SiteFooter } from "@/components/layout/site-footer";

export default function StudentCheckoutPage() {
  return (
    <>
      <CheckoutPageContent />

      <div className="-mb-10 hidden lg:block">
        <SiteFooter />
      </div>
    </>
  );
}
