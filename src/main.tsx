import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/:email/:machineId" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </ChakraProvider>,
)
