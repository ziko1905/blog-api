function ValidateMsgs({ messages = [] }) {
  return (
    <>
      {!!messages.length && (
        <div className="valid-msg-container">
          <ul>
            {messages.map((element, id) => {
              return (
                <li key={id} className="valid-msg">
                  {element}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default ValidateMsgs;
