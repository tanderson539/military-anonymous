import { useContext } from 'react'
import { AppContext } from '../App'
import '../stylesheets/ChatPage.css'
import { AppContextType } from '../types';

const ChatPage = () => {
  const { user } = useContext(AppContext) as AppContextType;
  
  if (user!.publicData === undefined) return <h3>Loading</h3>
  if(user!.publicData.is_anonymous){
    return (
      <div></div>
    )
  }
  return (
    <div></div>
  )
}

export default ChatPage