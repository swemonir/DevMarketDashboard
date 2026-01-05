import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { MOCK_CHATS } from '../utils/mockData';
import { Chat } from '../types';
import { Search, Send, Paperclip, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
export function SupportPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(MOCK_CHATS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const filteredChats = MOCK_CHATS.filter(chat => chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="h-[calc(100vh-8rem)] flex gap-6 animate-in fade-in duration-500">
      {/* Chat List */}
      <div className="w-1/3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-100">Support Inbox</h1>
          <Input placeholder="Search chats..." leftIcon={<Search className="w-4 h-4" />} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          {filteredChats.map(chat => <div key={chat.id} onClick={() => setSelectedChat(chat)} className={cn('p-4 rounded-xl border cursor-pointer transition-all', selectedChat?.id === chat.id ? 'bg-blue-500/10 border-blue-500/30' : 'bg-gray-900 border-gray-800 hover:border-gray-700')}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <Avatar src={chat.user.avatar} size="sm" fallback={chat.user.name} />
                  <div>
                    <p className="font-medium text-gray-200 text-sm">
                      {chat.user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(chat.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                    </p>
                  </div>
                </div>
                {chat.unreadCount > 0 && <Badge variant="info" className="rounded-full px-2">
                    {chat.unreadCount}
                  </Badge>}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">
                {chat.lastMessage}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant={chat.status === 'OPEN' ? 'success' : 'default'} className="text-[10px]">
                  {chat.status}
                </Badge>
                {chat.isPriority && <Badge variant="danger" className="text-[10px]">
                    Priority
                  </Badge>}
              </div>
            </div>)}
        </div>
      </div>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        {selectedChat ? <>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
              <div className="flex items-center gap-3">
                <Avatar src={selectedChat.user.avatar} fallback={selectedChat.user.name} />
                <div>
                  <h3 className="font-bold text-gray-100">
                    {selectedChat.user.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.user.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">
                  Assign to Me
                </Button>
                <Button size="sm" variant="primary" leftIcon={<CheckCircle className="w-4 h-4" />}>
                  Resolve
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-gray-950/50">
              {selectedChat.messages.map(msg => <div key={msg.id} className={cn('flex flex-col max-w-[80%]', msg.sender === 'ADMIN' ? 'ml-auto items-end' : 'items-start')}>
                  <div className={cn('p-4 rounded-2xl text-sm', msg.sender === 'ADMIN' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none')}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </span>
                </div>)}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-800 bg-gray-900">
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input placeholder="Type your reply..." className="flex-1" value={messageInput} onChange={e => setMessageInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && setMessageInput('')} />
                <Button size="icon" onClick={() => setMessageInput('')}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </> : <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>}
      </Card>
    </div>;
}