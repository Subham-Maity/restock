/* Components */
import { Providers } from '@/lib/providers'
import { Nav } from './components/Nav'

/* Instruments */

import './globals.css'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
        <Nav />
            <main>{props.children}</main>
        </body>
      </html>
    </Providers>
  )
}
