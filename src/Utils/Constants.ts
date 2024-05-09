export interface Groups {
  memorable?: string;
  numbers?: string;
  symbols?: string;
}

export const GROUPS: Groups = {
  memorable: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '!@#$%^&()_+~`|}{[]:;?><,./-='
};
