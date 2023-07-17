import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [guessedMessage, setGuessedMessage] = useState("");
  const phrases = [
    {
      phrase: "why did the chicken cross the road?",
    },
    {
      phrase: "have you had any water today",
    },
    {
      phrase: "this took you forever to figure out",
    },
  ];

  const [partialPhrase, setPartialPhrase] = useState("");
  const phraseMap = new Map();

  const incorrectMessage = "No!!!!!!! TRY again";
  const successMessage = ["ok i see you", "bruh nice", "think your smart eh?"];

  const respondToUser = (userMessages) => {
    let newResponse = userMessages[0].text;
    setResponse(newResponse);
    console.log(response);
    if (newResponse == "Yes") {
      setStart(true);
      addBotMessage(
        "Begin by guessing the right charcters to reveal the phrase! GO!"
      );
      // set the secret word
      setPartialPhrase(phrases[0].phrase);
      // sent partially guessed word (which is "_____ _____ _____ _____")
      let hiddenMessage = "";
      for (let i = 0; i < phrases[0].phrase.length; i++) {
        if (phrases[0].phrase[i] != " ") {
          hiddenMessage += "_ ";
        } else {
          hiddenMessage += "    ";
        }
      }
      addBotMessage(hiddenMessage);
    } else if (newResponse != "Yes" && start != true) {
      addBotMessage("No rush. When you're ready, type 'Yes'");
    }

    // if game has started and user's message is one letter long
    if (start && newResponse.length == 1) {
      // process that letter as an answer for hangman (call hangman with letter guess)
    }
  };

  const hangMan = (guessedLetter) => {
    // check the guessed letter against secret word
    // update the partially guessed word
    // send user the updated partially guessed word
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
