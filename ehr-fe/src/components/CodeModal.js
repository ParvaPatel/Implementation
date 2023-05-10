import Modal from "react-modal";

const CodeModal = ({code, modalOpen, closeModal, setCode}) => {

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    return (
        <Modal  style={customStyles}
                contentLabel="Example Modal" isOpen={modalOpen} onRequestClose={closeModal}>
            Enter Key 
            <input style={{border:"1px solid black"}}
                type="text"
                value={code}
                size={100}
                onChange={(e) => setCode(e.target.value)}
            />
            <br/>
            <button onClick={closeModal}>Submit</button>
        </Modal>
    );
};
export default CodeModal;