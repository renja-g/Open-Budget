import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

export interface BudgetFormProps {
  name?: string;
  description?: string;
  amount?: number;
  onSubmit?: (formData: BudgetFormProps) => void;
}

export function BudgetForm(props: BudgetFormProps) {
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [amount, setAmount] = useState(props.amount || 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit?.({
      name,
      description,
      amount,
    });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setAmount(0);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    const value = inputValue !== '' && !isNaN(Number(inputValue)) ? parseInt(inputValue, 10) : 0;
    setAmount(value);
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Budget</DialogTitle>
          <DialogDescription>Create a new budget.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Budget name"
                className="col-span-3"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Budget description"
                className="col-span-3"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                placeholder="Budget amount"
                className="col-span-3"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}