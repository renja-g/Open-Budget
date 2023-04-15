import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { type DepositType } from '~/types';

export interface DepositFormProps {
  name?: string;
  description?: string;
  balance?: number;
  depositType?: DepositType;
  onSubmit?: (formData: DepositFormProps) => void;
}

export function DepositForm(props: DepositFormProps) {
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [balance, setBalance] = useState(props.balance || 0);
  const [depositType, setDepositType] = useState(
    props.depositType || 'CURRENT'
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit?.({
      name,
      description,
      balance,
      depositType,
    });
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setBalance(0);
    setDepositType('CURRENT');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    const value =
      inputValue !== '' && !isNaN(Number(inputValue))
        ? parseInt(inputValue, 10)
        : 0;
    setBalance(value);
  };

  const handleDepositTypeChange = (
    value: string
    ) => {
    setDepositType(value as DepositType);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Deposit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>Create a new deposit.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Deposit name"
                className="col-span-3"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Deposit description"
                className="col-span-3"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">
                Balance
              </Label>
              <Input
                id="balance"
                placeholder="Deposit balance"
                className="col-span-3"
                value={balance}
                onChange={handleBalanceChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="depositType" className="text-right">
                Deposit Type
              </Label>
              <Select value={depositType} onValueChange={handleDepositTypeChange} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="CASH">Cash</SelectItem>
                  <SelectItem value="CREDIT">Credit</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
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
