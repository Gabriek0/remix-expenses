// Components
import { Chart, ExpenseStatistics } from "~/components/Expenses";

// DATA MOCK
import { expenses_data_mock } from "~/models/Expense";

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={expenses_data_mock} />
      <ExpenseStatistics expenses={expenses_data_mock} />
    </main>
  );
}
