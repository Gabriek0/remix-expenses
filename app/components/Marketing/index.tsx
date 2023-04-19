import { useMemo } from "react";

// Models
import { Plan } from "~/models/Plan";

interface Props {
  plan: Plan;
}

export function PricingPlan({ plan }: Props) {
  const Icon = useMemo(() => plan.icon, [plan.icon]);

  return (
    <article>
      <header>
        <div className="icon">
          <Icon />
        </div>
        <h2>{plan.title}</h2>
        <p>{plan.price}</p>
      </header>
      <div className="plan-content">
        <ol>
          {plan.perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ol>
        <div className="actions">
          <a href="/not-implemented">Learn More</a>
        </div>
      </div>
    </article>
  );
}
