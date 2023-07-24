/* Components */
import {Counter} from './components/Counter/Counter'

export default function IndexPage() {
    return (
        <>
            <h1>Home page</h1>
            <Counter/>
        </>
    )
}

export const metadata = {
    title: 'Redux Toolkit',
}
