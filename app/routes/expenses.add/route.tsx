import { Modal } from "~/components/Util";
import { ExpenseForm } from "~/components/Expenses";

export default function ExpensesAddPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
