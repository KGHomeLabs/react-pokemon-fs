import { Outlet } from 'react-router-dom'
import { Header } from '../blox/features/header/Header'
import { getAppEnv } from '../../config/env-switch'
import EnvLabel from '../blox/features/env-label/EnvLabel'

export default function TopLayout() {
    const computedEnv = getAppEnv()
    return (
        <div>
            <EnvLabel computedEnv={computedEnv}></EnvLabel>
            <Header />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    )
}