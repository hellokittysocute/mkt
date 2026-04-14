import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Users, 
  Calendar, 
  Phone, 
  Files, 
  MoreHorizontal, 
  Search, 
  Settings, 
  Video, 
  Info, 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon, 
  Type, 
  Bot,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  isBot: boolean;
  type: 'card' | 'text';
  content: any;
}

// --- Components ---

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: '코스맥스 품질검사관리',
      avatar: 'CQ',
      time: '2026-04-13 19:44',
      isBot: true,
      type: 'card',
      content: {
        title: '🚨 [COSMAX] 벌크 부적합 안내',
        details: [
          { label: '검사파트', value: '벌크검사파트' },
          { label: '시험번호', value: '26B031328' },
          { label: '품목코드', value: '3GDI00105110' },
          { label: '품목명', value: '(자)구다이글로벌조선미녀컴포트프로택선바디선크림(무향)(수출용)' },
          { label: '관리유형', value: '선로션(무기)' },
          { label: '공급업체', value: '기초제조실(기초화성/유화믹서 1톤 11호기(PS-821))' },
          { label: '입고일자', value: '2026-04-09 19:44' },
          { label: '공급업체 롯트번호', value: '26R018/SDB' },
          { label: '입고수량', value: '730,000' },
          { label: '판정결과', value: '부적합', isAlert: true },
          { label: '판정일자', value: '2026-04-13' },
          { label: '고객사', value: '구다이글로벌' },
          { label: '마케터(CIS)', value: '안세진, 최윤호' },
        ],
        actions: [
          { id: 'schedule', label: '재생일정 확인' },
          { id: 'manager', label: '판정 담당자 확인' }
        ]
      }
    }
  ]);

  const [clickedActions, setClickedActions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAction = (actionId: string) => {
    if (clickedActions.includes(actionId)) return;

    setClickedActions(prev => [...prev, actionId]);

    if (actionId === 'schedule') {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: '코스맥스 품질검사관리',
        avatar: 'CQ',
        time: '2026-04-13 19:45',
        isBot: true,
        type: 'card',
        content: {
          title: '📋 재생 일정 안내',
          details: [
            { label: '품목명', value: '(자)구다이글로벌조선미녀컴포트프로택선바디선크림(무향)(수출용)' },
            { label: '재생일정', value: '2026-04-20' },
          ]
        }
      };
      setMessages(prev => [...prev, newMessage]);
    } else if (actionId === 'manager') {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: '코스맥스 품질검사관리',
        avatar: 'CQ',
        time: '2026-04-13 19:45',
        isBot: true,
        type: 'card',
        content: {
          title: '👤 판정 담당자 안내',
          details: [
            { label: '품목명', value: '(자)구다이글로벌조선미녀컴포트프로택선바디선크림(무향)(수출용)' },
            { label: '판정 담당자', value: '김효정, 박성수, 송영훈, 박연선, 김은서, 조준희, 김민지' },
          ]
        }
      };
      setMessages(prev => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F5F5] text-[#242424] font-sans overflow-hidden">
      {/* --- Left Sidebar (App Rail) --- */}
      <aside className="w-[68px] bg-[#EBEBEB] flex flex-col items-center py-4 space-y-6 border-r border-gray-300 shrink-0">
        <SidebarIcon icon={<Bell size={24} />} label="활동" />
        <SidebarIcon icon={<MessageSquare size={24} />} label="채팅" active />
        <SidebarIcon icon={<Users size={24} />} label="팀" />
        <SidebarIcon icon={<Calendar size={24} />} label="일정" />
        <SidebarIcon icon={<Phone size={24} />} label="통화" />
        <SidebarIcon icon={<Files size={24} />} label="파일" />
        <div className="flex-grow" />
        <SidebarIcon icon={<MoreHorizontal size={24} />} label="" />
        <SidebarIcon icon={<Settings size={24} />} label="설정" />
      </aside>

      {/* --- Channel/Chat List Sidebar --- */}
      <aside className="w-80 bg-white border-r border-gray-300 flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">채팅</h1>
          <div className="flex space-y-0 space-x-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-md"><Search size={18} /></button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          <ChatItem 
            name="코스맥스 품질검사관리" 
            lastMsg="🚨 [COSMAX] 벌크 부적합 안내" 
            time="오후 7:44" 
            active 
            isBot
          />
          <ChatItem name="품질보증팀" lastMsg="검사 결과 확인 부탁드립니다." time="오후 6:30" />
          <ChatItem name="생산관리팀" lastMsg="입고 일정이 변경되었습니다." time="오후 5:12" />
          <ChatItem name="연구소" lastMsg="샘플 발송 완료했습니다." time="어제" />
        </div>
      </aside>

      {/* --- Main Chat Area --- */}
      <main className="flex-grow flex flex-col bg-white relative">
        {/* Header */}
        <header className="h-14 border-b border-gray-300 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#6264A7] flex items-center justify-center text-white text-xs font-bold">
              CQ
            </div>
            <div>
              <h2 className="font-bold text-sm">코스맥스 품질검사관리</h2>
              <p className="text-[10px] text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> 온라인
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <Video size={20} className="cursor-pointer hover:text-[#6264A7]" />
            <Phone size={18} className="cursor-pointer hover:text-[#6264A7]" />
            <Info size={20} className="cursor-pointer hover:text-[#6264A7]" />
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#F5F5F5]">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#6264A7] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
                  {msg.avatar}
                </div>
                <div className="flex flex-col space-y-1 max-w-[90%] md:max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{msg.sender}</span>
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                  </div>
                  
                  {msg.type === 'card' && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      {/* Red bar for alert cards */}
                      {msg.content.title.includes('🚨') && (
                        <div className="h-1.5 bg-[#C4314B]" />
                      )}
                      
                      <div className="p-4 space-y-4">
                        <h3 className="font-bold text-base text-[#242424]">{msg.content.title}</h3>
                        
                        <div className="space-y-2">
                          {msg.content.details.map((detail: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-3 gap-2 text-sm">
                              <span className="text-gray-500 font-medium">{detail.label}</span>
                              <span className={`col-span-2 font-semibold ${detail.isAlert ? 'text-[#C4314B]' : 'text-[#242424]'}`}>
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {msg.content.actions && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {msg.content.actions.map((action: any) => (
                              <button
                                key={action.id}
                                onClick={() => handleAction(action.id)}
                                disabled={clickedActions.includes(action.id)}
                                className={`px-4 py-1.5 rounded text-sm font-semibold transition-colors
                                  ${clickedActions.includes(action.id) 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-white border border-gray-300 text-[#6264A7] hover:bg-gray-50 active:bg-gray-100'
                                  }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <footer className="p-4 bg-white border-t border-gray-300 shrink-0">
          <div className="bg-[#F0F0F0] rounded-lg p-2 flex flex-col">
            <div className="flex items-center space-x-3 px-2 py-1 text-gray-500">
              <Type size={18} className="cursor-pointer hover:text-[#6264A7]" />
              <Paperclip size={18} className="cursor-pointer hover:text-[#6264A7]" />
              <Smile size={18} className="cursor-pointer hover:text-[#6264A7]" />
              <ImageIcon size={18} className="cursor-pointer hover:text-[#6264A7]" />
              <div className="flex-grow" />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <input 
                type="text" 
                placeholder="새 메시지를 입력하세요." 
                className="flex-grow bg-transparent border-none focus:ring-0 text-sm px-2 py-1"
              />
              <button className="p-1.5 text-gray-400 hover:text-[#6264A7]">
                <Send size={18} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// --- Helper Components ---

function SidebarIcon({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center cursor-pointer group relative w-full ${active ? 'text-[#6264A7]' : 'text-gray-600'}`}>
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#6264A7] rounded-r-full" />}
      <div className={`p-2 rounded-md transition-colors ${active ? 'bg-white shadow-sm' : 'group-hover:bg-gray-200'}`}>
        {icon}
      </div>
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </div>
  );
}

function ChatItem({ name, lastMsg, time, active = false, isBot = false }: { name: string, lastMsg: string, time: string, active?: boolean, isBot?: boolean }) {
  return (
    <div className={`flex items-center p-3 cursor-pointer border-l-4 transition-colors ${active ? 'bg-[#F0F0F0] border-[#6264A7]' : 'hover:bg-gray-50 border-transparent'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${isBot ? 'bg-[#6264A7]' : 'bg-gray-400'}`}>
        {name.substring(0, 2)}
      </div>
      <div className="ml-3 flex-grow overflow-hidden">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-bold truncate ${active ? 'text-[#242424]' : 'text-gray-700'}`}>{name}</span>
          <span className="text-[10px] text-gray-500 shrink-0">{time}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{lastMsg}</p>
      </div>
    </div>
  );
}
