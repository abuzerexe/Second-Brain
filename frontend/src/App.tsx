
import { useState } from 'react'
import './App.css'
import AddContentModal from './components/AddContentModal'
import Button from './components/Button'
import Card from './components/Card'
import AddContentIcon from './icons/AddContentIcon'
import ShareBrain from './icons/ShareBrainIcon'


function App() {

  const [addContentModal, setAddContentModal] = useState(false);

  return (
    <>
    <AddContentModal open={addContentModal} onClose={()=>{
      setAddContentModal(false)
    }}/>
    <div className='flex justify-end pt-2 pr-2'>

    <Button text='Share Brain' variant='secondary' startIcon={<ShareBrain/>}></Button>
    <div onClick={()=>setAddContentModal(true)}>

    <Button text='Add Content' variant='primary' startIcon={<AddContentIcon/>}></Button>
    </div>
    </div>
    <div className='flex'>

    <Card title='Chatgpt' type='x' id='1894527988378550392'/>
    <Card title='Web Dev' type='yt' id='lueXr-LJJA0'/>
    <Card title='Calculus Thougts' type='doc' id="https://docs.google.com/document/d/1-pl_KS4EtsoB0VkJjgDF4t8N9rsB1xG8xL49i1_Do9Y/preview?tab=t.0"/>
    <Card title='DSA Project Proposal' type='doc' id="https://docs.google.com/document/d/1FKTw9woRidKYeZaQpv2U_lDCIpqt8b09/preview?tab=t.0"/>
    </div>
    </>
  )
}

export default App
