import '../styles/globals.css'
import Header from '../components/Header'
import SiteFooter from '../components/SiteFooter'

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className="container">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
