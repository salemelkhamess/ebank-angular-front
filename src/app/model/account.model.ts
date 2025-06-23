export interface AccountDetail {
  accountId:            string;
  balance:              number;
  currentPages:         number;
  totalPages:           number;
  size:                 number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount:        number;
  description:   string;
  operationType: string;
}
