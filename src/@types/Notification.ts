export type NotifAction =
  | 'PAY_FOR_LABORATORY_TEST'
  | 'PAY_FOR_PRESCRIPTION'
  | 'PAY_FOR_QUICK_LABORATORY_TEST'
  | 'PAY_FOR_QUICK_PRESCRIPTION_TEST'
  | 'CREATE_LABORATORY_TEST'
  | 'CREATE_PRESCRIPTION'
  | 'CREATE_CARD'
  | 'CREATE_QUICK_LABORATORY_TEST'
  | 'CREATE_QUICK_PRESCRIPTION_TEST'
  | 'MARK_CARD_AS_NEW'
  | 'COMPLETE_LABORATORY_TEST'
  | 'COMPLETE_QUICK_LABORATORY_TEST'
  | 'COMPLETE_QUICK_PRESCRIPTION_TEST'
  | 'COMPLETE_PRESCRIPTION';
export type NotifType = 'card' | 'laboratory_test' | 'prescription';
