import { BudgetForm } from "~/components/budget/budgetForm";

const Budget = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Budget
      </h1>
      <div className="[&:not(:first-child)]:mt-6">
        <BudgetForm />
      </div>
    </div>
  );
};

export default Budget;
