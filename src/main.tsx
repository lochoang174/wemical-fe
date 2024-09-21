import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from './contexts/WalletProvider.tsx'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <WalletProvider>
    <Provider store={store}>
    <App />
    </Provider>
      

  </WalletProvider>
)
