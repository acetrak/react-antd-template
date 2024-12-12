import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import Index from '@/pages/index';
import About from '@/pages/about.tsx';
import '@/style/App.css';
import AntdUIProvider from '@/components/antd-ui-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntdUIProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Index />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AntdUIProvider>
  </StrictMode>,
);
