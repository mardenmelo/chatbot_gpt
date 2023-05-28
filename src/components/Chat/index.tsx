import { useEffect, useState } from "react";
import axios from 'axios';

export function Chat() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>('');

  useEffect(() => {
    // Função para enviar mensagem ao ChatGPT
    const sendMessage = async () => {
      if (input !== '') {
        const messageObject = {
          role: 'user',
          content: input
        };

        // Envia a mensagem para a API do ChatGPT
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          messages: [...messages, messageObject]
        }, {
          headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
          }
        });

        const newMessage = {
          role: 'assistant',
          content: response.data.choices[0].message.content
        };

        // Atualiza o estado das mensagens com a resposta do ChatGPT
        setMessages([...messages, messageObject, newMessage]);
        setInput('');
      }
    };

    // Chama a função de envio de mensagem ao pressionar a tecla Enter
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
    <div>
      <div>
        {messages.map((message:any, index:any) => (
          <div key={index}>
            {message.role === 'user' && <p>User: {message.content}</p>}
            {message.role === 'assistant' && <p>Assistant: {message.content}</p>}
          </div>
        ))}
      </div>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
