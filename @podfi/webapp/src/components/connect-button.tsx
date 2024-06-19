import { ConnectWallet } from "@thirdweb-dev/react"

export const ConnectButton = () => {
  return (
    <ConnectWallet
      btnTitle="Get Started"
      className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
    />
  )
}
