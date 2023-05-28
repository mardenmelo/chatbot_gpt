import { useEffect, useState } from 'react';
import { LayoutContainer } from './styles'
import axios from 'axios';

export function Home() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>('');

  const sendMessage = async () => {
    if (input !== '') {
      const messageObject = {
        role: 'user',
        content: input
      };

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [...messages, messageObject],
        model: 'gpt-3.5-turbo'
      }, {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        }
      });

      const newMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content
      };

      setMessages([...messages, messageObject, newMessage]);
      setInput('');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [input, messages]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <LayoutContainer>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role === 'user' && <p>User: {message.content}</p>}
            {message.role === 'assistant' && <p>Assistant: {message.content}</p>}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={sendMessage}>Enviar</button>
    </LayoutContainer>
  )
}