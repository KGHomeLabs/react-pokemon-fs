import { Outlet } from 'react-router-dom'
import { Header } from '../blox/features/header/Header'

export default function TopLayout() {
    return (
        <div>
            <Header />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    )
}