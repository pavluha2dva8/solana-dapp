import type { WalletProviderProps } from '@solana/wallet-adapter-react'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { useCallback } from 'react'
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletError } from '@solana/wallet-adapter-base'

export function ClientWalletProvider({ wallets, children }: WalletProviderProps): JSX.Element {
  const onError = useCallback((error: WalletError) => {
    console.error(error)
  }, [])

  return (
    <WalletProvider wallets={wallets} autoConnect onError={onError}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  )
}

export default ClientWalletProvider
