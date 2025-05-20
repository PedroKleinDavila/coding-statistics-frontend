import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAccount from './routes/CreateAccount.tsx'
import Stats from './routes/Stats.tsx'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/:email" element={<Stats />} />
          <Route path="/:email/:machineId" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </ChakraProvider>,
)
