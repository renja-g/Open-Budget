import { BudgetForm, type BudgetFormProps } from "~/components/budget/budgetForm";



const Budget = () => {
  const handleSubmit = (formData: BudgetFormProps) => {
    // Add your logic here for handling form submission
    console.log('Form data:', formData);
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Budget
      </h1>
      <div className="[&:not(:first-child)]:mt-6">
      <BudgetForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Budget;
