import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { clusterApiUrl } from '@solana/web3.js'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import '../styles/globals.css'
import ClientWalletProvider from '@components/context/ClientWalletProvider'
import dynamic from 'next/dynamic'

const ReactUIWalletModalProviderDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalProvider,
  { ssr: false },
)

export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Testnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <ClientWalletProvider wallets={wallets}>
        <ReactUIWalletModalProviderDynamic>
          <Toaster position="bottom-right" reverseOrder={true} />
          <Component {...pageProps} />
        </ReactUIWalletModalProviderDynamic>
      </ClientWalletProvider>
    </ConnectionProvider>
  )
}
