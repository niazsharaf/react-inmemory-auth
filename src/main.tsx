import ReactDOM from 'react-dom/client'
import { AppProviders } from '@app/providers'
import { App } from '@app/App'
import '@shared/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
)
