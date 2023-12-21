import Navbar from './components/Navbar';
import './globals.css'
import SessionProvider from './SessionProvider';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-200">
      <body className="h-full">
      <SessionProvider>
        <Navbar/>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}