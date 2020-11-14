import React, { useState } from 'react';

export const Test = () => {
  const [message, setMessage] = useState("");

  const handleClickAddressBook = () => {
    var api = (navigator.contacts || navigator.mozContacts);
      
    if (api && !!api.select) { // new Chrome API
      api.select(['name', 'email'], {multiple: false})
        .then(function (contacts) {
          setMessage('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            setMessage('First contact: ' + contacts[0].name + ' (' + contacts[0].tel + ')');
          }
        })
        .catch(function (err) {
          setMessage('Fetching contacts failed: ' + err.name);
        });
        
    } else if (api && !!api.find) { // old Firefox OS API
      var criteria = {
        sortBy: 'familyName',
        sortOrder: 'ascending'
      };
  
      api.find(criteria)
        .then(function (contacts) {
          setMessage('Found ' + contacts.length + ' contacts.');
          if (contacts.length) {
            setMessage('First contact: ' + contacts[0].givenName[0] + ' ' + contacts[0].familyName[0]);
          }
        })
        .catch(function (err) {
          setMessage('Fetching contacts failed: ' + err.name);
        });
        
    } else {
      setMessage('Contacts API not supported.');
    }
  }

  return (
    <div>
      <h2>Test</h2>
      <button onClick={handleClickAddressBook}>Click</button>
      <p>{message}</p>
    </div>
  )
}