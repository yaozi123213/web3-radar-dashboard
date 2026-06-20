export type TrackedWallet = {
  label: string;
  address: string;
  chain: string;
  note: string;
  risk: string;
};

export const trackedWallets: TrackedWallet[] = [
  {
    label: "Vitalik / Public Scientist Wallet",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chain: "Ethereum / Base / OP",
    note: "DeBank observed: ~$401K total, Ethereum-heavy, Base exposure, DeFi protocol spread",
    risk: "Watch",
  },
];
