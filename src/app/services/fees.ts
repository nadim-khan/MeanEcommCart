export interface Fees {
  fees: {
    subscription: string;
    description: string;
    fee: number;
  };
}

export interface Payment {
  payment: {
    email: string;
    amount: number;
    description: string;
    year: number;
    month: string;
    updatedBy: string;
  };
}

