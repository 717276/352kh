import {Routes, Route} from 'react-router-dom'
import ChatRoomList from './chat/ChatRoomList';
import ChatRoom from './chat/ChatRoom';
import Faq from './FAQ';
import FaqContent from './FAQContent';
import FAQEdit from './FAQEdit';
import FAQWrite from './FAQWrite';
const Csr=()=>{
    return(
        <Routes>
            <Route path="faq" element={<Faq />} />
            <Route paht="faq/:faqId" element={<FaqContent />}/>
            <Route paht="faqedit/:faqId" element={<FAQEdit />}/>
            <Route paht="faqwrite" element={<FAQWrite />}/>

            <Route path="chat" element={<ChatRoomList />}/>
            <Route path="chat/room/:roomId" element={<ChatRoom/>}/>
        </Routes>
    );
}
export default Csr;