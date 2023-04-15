import { DepositForm, type DepositFormProps } from '~/components/deposit/depositForm';

const Deposit = () => {
  const handleSubmit = (formData: DepositFormProps) => {
    // Add your logic here for handling form submission
    console.log('Form data:', formData);
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Deposit
      </h1>
      <div className="[&:not(:first-child)]:mt-6">
        <DepositForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Deposit;
