import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from 'components/message/message';

export default function Chat() {
    const user = useSelector((state) => state.auth.user);
    const [currentChat, setCurrentChat] = useState(null);

    return (
        <div>
            <h1>Top bar blocks</h1>
            <div className="chatBox">
                {
                    currentChat
                        ? (
                            <div className="chatMessages">
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                                <Message />
                            </div>
                        )
                        : <p>Open a chat</p>
                }
                <div>
                    <textarea className="chatInput" />
                    <button type="submit">Send</button>
                </div>
            </div>
        </div>
    );
}
