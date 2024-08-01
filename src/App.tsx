import { useState } from 'react';
import { getMessage } from './API/OpenAI';
import './styles.css';

interface ChatEntry {
  userMessage: string;
}

function App() {
  const [gptMessage, setGPTMessage] = useState<string>('');
  const [chatSearch, setChatSearch] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);

  const handleSubmit = async () => {
    try {
      const message = await getMessage(chatSearch);
      if (message) {
        setGPTMessage(message);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { userMessage: chatSearch },
        ]);
        setChatSearch('');
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  const handleHistory = (index: number) => {
    const selectedEntry = chatHistory[index];
    if (selectedEntry) {
      setChatSearch(selectedEntry.userMessage || '');
    }
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setGPTMessage('');
    setChatSearch('');
  };

  return (
    <>
      <div id="root"></div>
      <div className="body">
        <section className="side-bar">
          <button onClick={handleNewChat}>New Chat</button>
          <div className="chat-history">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className="chat-entry"
                onClick={() => handleHistory(index)}
              >
                <p>{entry.userMessage}</p>
              </div>
            ))}
          </div>
          <nav className="nav">
            <p>Made by Sam</p>
          </nav>
        </section>

        <section className="main">
          <h1>Sam GPT</h1>
          <p id="output">{gptMessage}</p>
          <div className="bottom-section">
            <div className="input-container">
              <input
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
              />
              <div id="submit" onClick={handleSubmit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icon-tabler-send-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                  <path d="M6.5 12h14.5" />
                </svg>
              </div>
            </div>
          </div>
          <p className="info">Chat GPT March 14 Version</p>
        </section>
      </div>
    </>
  );
}

export { App };
