import { DepositForm } from '~/components/deposit/depositForm';

const Deposit = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Deposit
      </h1>
      <div className="[&:not(:first-child)]:mt-6">
        <DepositForm />
      </div>
    </div>
  );
};

export default Deposit;
