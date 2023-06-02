// Components
import { V2_MetaFunction } from "@remix-run/react";
import { PricingPlan } from "~/components/Marketing";
import { pricing_data_mock } from "~/models/Plan";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Pricing | RemixExpenses",
    },
  ];
};

export default function PricingPage() {
  return (
    <main id="pricing">
      <h2>Great Product, Simple Pricing</h2>
      <ol id="pricing-plans">
        {pricing_data_mock.map((plan) => (
          <li key={plan.id} className="plan">
            <PricingPlan plan={plan} />
          </li>
        ))}
      </ol>
    </main>
  );
}
