import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.tsx'
import Layout from './components/Layouts/Layout.tsx'
import MeComponent from './components/Pages/MeSectionComponents/MeComponent.tsx'
import RegistationForm from './components/RegistationForm.tsx'
import DetailInformationForm from './components/DetailInformationForm.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route element={<Layout />}>
                    <Route path="profile" element={<MeComponent />}>
                        <Route path="edit-basic-info" element={<RegistationForm />} />
                        <Route path="edit-detail-info" element={<DetailInformationForm />} />
                    </Route>
                    <Route path="diary" element={<div>Diario</div>} />
                    <Route path="reports" element={<div>Informes</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
