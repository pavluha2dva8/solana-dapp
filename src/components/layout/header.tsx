import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { ThemeToggle } from '@components/layout/theme-toggle'

export function Header() {
  return (
    <div className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="navbar-start px-2 mx-2">
        <span className="text-sm md:text-lg font-bold">Solana dApp</span>
      </div>

      <div className="navbar-end">
        <WalletMultiButton className="btn" />
        <ThemeToggle />
      </div>
    </div>
  )
}
