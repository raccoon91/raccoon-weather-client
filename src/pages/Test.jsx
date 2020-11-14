import React, { useState } from 'react';

export const Test = () => {
  const [message, setMessage] = useState("");

  const handleClickAddressBook = () => {
    var api = (navigator.contacts || navigator.mozContacts);
      
    if (api && !!api.select) {
      api.select(['name', 'tel'])
        .then(function (contacts) {
          setMessage('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            setMessage('First contact: ' + contacts[0].name + ' (' + contacts[0].tel + ')');
          }
        })
        .catch(function (err) {
          setMessage('Fetching contacts failed: ' + err.name);
        });
        
    }

    setMessage('Contacts API not supported.');
  }

  return (
    <div>
      <h2>Test</h2>
      <button onClick={handleClickAddressBook}>Click</button>
      <p>{message}</p>
    </div>
  )
}