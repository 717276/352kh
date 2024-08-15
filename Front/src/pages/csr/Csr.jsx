import {Routes, Route} from 'react-router-dom'
import ChatRoom from './chat/ChatRoom';
import Faq from './FAQ';
import FaqContent from './FAQContent';
import FAQEdit from './FAQEdit';
import FAQWrite from './FAQWrite';
const Csr=()=>{
    return(
        <Routes>
            <Route path="/" element={<Faq />} />
            <Route path="faq/:faqId" element={<FaqContent />}/>
            <Route path="faqedit/:faqId" element={<FAQEdit />}/>
            <Route path="faqwrite" element={<FAQWrite />}/>            
            <Route path="chat/room/:roomId" element={<ChatRoom/>}/>
        </Routes>
    );
}
export default Csr;