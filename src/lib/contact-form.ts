// Shared types/constants for the contact form. Kept in a plain module (not the
// 'use server' actions file, which may only export async Server Functions).

export type ContactFieldName =
  | 'name'
  | 'phone'
  | 'email'
  | 'service'
  | 'address'
  | 'message';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors: Partial<Record<ContactFieldName, string>>;
  values: Partial<Record<ContactFieldName, string>>;
};

export const initialContactState: ContactFormState = {
  status: 'idle',
  message: '',
  errors: {},
  values: {},
};

// Compact "quick quote" form used in the Hero section.
export type QuickFieldName = 'firstName' | 'lastName' | 'phone' | 'email' | 'service';

export type QuickEnquiryState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors: Partial<Record<QuickFieldName, string>>;
  values: Partial<Record<QuickFieldName, string>>;
};

export const initialQuickState: QuickEnquiryState = {
  status: 'idle',
  message: '',
  errors: {},
  values: {},
};
