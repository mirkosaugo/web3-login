import { useEffect, useState, useCallback } from "react";
import { hooks, metaMask as connector } from './connectors/metaMask'
import { ethers } from "ethers";
import { CHAINS, getAddChainParameters } from './chains'

import './App.css'

import { UserCircleIcon } from '@heroicons/react/solid'
import Wrapper from "./components/Wrapper";
import Button from './components/Button'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks


function useBalances(
  provider,
  accounts
) {
  const [balances, setBalances] = useState()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}


const App = () => {
  const iconClass = `text-gray-800 h-52 w-52`

  const isLogged = false

  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const balances = useBalances(provider, accounts)
  

  console.log('chainId', chainId)
  console.log('accounts', accounts)
  console.log('error', error)
  console.log('isActivating', isActivating)
  console.log('isActive', isActive)
  console.log('provider', provider)
  console.log('ENSNames', ENSNames)



  const chainIds = Object.keys(CHAINS).map((chainId) => Number(chainId))
  const printBalance = (balance) => parseFloat(ethers.utils.formatEther(balance)).toFixed(4).toString()  

  // default ehtereum chain 
  const [desiredChainId, setDesiredChainId] = useState(chainIds[0])

  const switchChain = useCallback(
    async (desiredChainId) => {
      setDesiredChainId(desiredChainId)
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) return
      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) return

      console.log('desiredChainId', getAddChainParameters(desiredChainId))

      await connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
    },
    [connector, chainId]
  )

  return (
    <Wrapper>
      <UserCircleIcon className={iconClass} />
      {
      !isActive ? 
        ( <Button onClick={() => connector.activate(desiredChainId)} disabled={isActivating} text="connect to Web3 👽" />)
        :
        (
          <>
            <h1 className="mb-2 text-2xl font-bold">Welcome</h1>
            <h2 className="mb-4">{accounts[0]}</h2>
            <p className="mb-2">{ balances && `Ξ${printBalance(balances[0])} ${CHAINS[desiredChainId]?.nativeCurrency?.symbol}` }</p>
            
            <Button theme="secondary" size="secondary" onClick={() => connector.deactivate()} text="Disconnect 👋" />
            
            <button className="mt-4 underline underline-offset-2" onClick={() => switchChain(desiredChainId === 1 ? 137 : 1)}>switch</button>
          </>
        )
      }
    </Wrapper>
  )
}

export default App