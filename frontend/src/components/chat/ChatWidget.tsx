import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react';
import { sendMessage } from '../../services/api';
import { ChatMessage } from '../../types';
import './ChatWidget.css';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: "Hi! I'm Harsh's AI assistant. Ask me anything about his work experience, skills, or projects!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const reply = await sendMessage(userMessage);
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please check if the backend is running!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-widget-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="glass-card chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    >
                        <div className="chat-header">
                            <h3>AI Assistant</h3>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`message-bubble ${msg.role}`}>
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message-bubble assistant loading">
                                    <Loader2 size={16} className="spinner" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chat-input" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Harsh..."
                            />
                            <button type="submit" disabled={isLoading}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="chat-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare size={24} />
            </motion.button>
        </div>
    );
};

export default ChatWidget;
