
import './App.css'
import Button from './components/Button'
import AddContentIcon from './icons/AddContentIcon'
import ShareBrain from './icons/ShareBrainIcon'

function App() {

  return (
    <>
    <Button text='Add Content' variant='primary' startIcon={<AddContentIcon/>}></Button>
    <Button text='Share Brain' variant='secondary' startIcon={<ShareBrain/>}></Button>
    </>
  )
}

export default App
