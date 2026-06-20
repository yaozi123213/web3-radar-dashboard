export type TrackedWallet = {
  label: string;
  address: string;
  chain: string;
  note: string;
  risk: string;
  lastAction: string;
  token: string;
  signal: string;
  source: string;
};

export const trackedWallets: TrackedWallet[] = [
  {
    label: "Vitalik / Public Scientist Wallet",
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    chain: "Ethereum / Base / OP",
    note: "DeBank observed: ~$401K total, Ethereum-heavy, Base exposure, DeFi protocol spread",
    risk: "Watch",
    lastAction: "Portfolio observation",
    token: "ETH / multi-chain assets",
    signal: "Research sample, not trade signal",
    source: "DeBank",
  },
  {
    label: "Hayden / Uniswap Public Wallet",
    address: "0x50EC05ADe8280758E2077fcBC08D878D4aef79C3",
    chain: "Ethereum",
    note: "DeBank observed: ~$90K total, Ethereum-heavy, Uniswap V3 exposure, UNI / DAI / SOCKS / ENS holdings",
    risk: "Watch",
    lastAction: "Portfolio observation",
    token: "UNI / DAI / SOCKS / ENS",
    signal: "Uniswap ecosystem research sample, not trade signal",
    source: "DeBank / ENS",
  },
];
