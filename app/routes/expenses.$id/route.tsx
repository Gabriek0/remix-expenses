// Components
import { Modal } from "~/components/Util";
import { ExpenseForm } from "~/components/Expenses";

export default function ExpensesDynamicPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
