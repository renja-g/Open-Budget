import { LabelForm } from '~/components/label/labelForm';

const Deposit = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Label
      </h1>
      <div className="[&:not(:first-child)]:mt-6">
        <LabelForm />
      </div>
    </div>
  );
};

export default Deposit;
