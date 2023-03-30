import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import useSWR from 'swr'

export function HomeContent() {
  const { publicKey } = useWallet()

  const { data, error } = useSWR(publicKey ? publicKey.toBase58() : null, fetchBalance)

  if (!publicKey) {
    return (
      <div className="card border-2 border-primary mb-5">
        <div className="card-body items-center justify-center flex-1">
          <h2 className="card-title text-center text-primary mb-2">
            Please connect your wallet (Testnet Network)
          </h2>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>Loading balances...</div>
  }

  return (
    <div className="grid grid-cols-1">
      <div className="text-center">
        <div className="card border-2 border-primary mb-5">
          <div className="card-body items-center">
            <h2 className="card-title text-center text-primary mb-2">
              SOL: {data.solBalance / LAMPORTS_PER_SOL ?? 0}
            </h2>
          </div>
        </div>

        {data.nonSolBalances.length > 0 ? (
          data.nonSolBalances.map(({ mint, amount }) => (
            <div key={mint} className="card border-2 border-primary mb-5">
              <div className="card-body items-center">
                <h2 className="card-title text-center text-primary mb-2">
                  Token Address: {mint} Amount: {amount}
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div className="card border-2 border-primary mb-5">
            <div className="card-body items-center">
              <h2 className="card-title text-center text-primary mb-2">
                No other token balances found
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

async function fetchBalance(publicKey: PublicKey) {
  const connection = new Connection('https://api.testnet.solana.com')

  const solBalance = await connection.getBalance(new PublicKey(publicKey))

  const nonSolBalances = await connection
    .getParsedTokenAccountsByOwner(new PublicKey(publicKey), {
      programId: TOKEN_PROGRAM_ID,
    })
    .then(async (accounts) =>
      accounts.value.map(({ account }) => {
        return {
          mint: account.data.parsed.info.mint,
          amount: account.data.parsed.info.tokenAmount.uiAmount,
        }
      }),
    )

  return { solBalance, nonSolBalances }
}
