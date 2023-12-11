import React,{useState,useEffect} from 'react';
import { Modal } from "react-bootstrap"
import { addContactCall } from '../apiCalls/userApi';

const AddContactModal = ({ addContact, setAddContact,refetchFn }) => {
    let [newContact, setNewContact] = useState({ mobile: "", user: "" });
  let [showMsg, setShowMsg] = useState({ msg: "", color: "" });

  useEffect(() => {
    setNewContact({ mobile: "", user: "" });
    setShowMsg({ msg: "", color: "" });
  },[])

    let SaveContactFn = (e) => {
        e.preventDefault();

      if (newContact.mobile.length != 10) {
       return setShowMsg({ msg: "Invalid Mobile Number", color: "danger" });
      }

      let temp = {
        mobile: newContact.mobile,
        saveAs:newContact.user
      }
      
      addContactCall(temp).then(res => {
        console.log(res);
        refetchFn();
        setShowMsg({ msg: " Yay! Contact Saved !!", color: "success" });
      
      }).catch(err => {
        console.log(err);
        setShowMsg({ msg:err.response.data.message , color: "danger" });
      })
              
}
    return (
      <Modal
        show={addContact}
        onHide={() => setAddContact(false)}
        centered
        backdrop="static"
        size="sm"
      >
        <Modal.Body style={{fontFamily:"sans"}} className="bg-dark text-white rounded-3 shadow-lg">
          <p className="fst-italic border-bottom text-center">
            +Add New Contact
          </p>

          <form onSubmit={SaveContactFn}>
            <div>
              <label htmlFor="mobile">Mobile Number</label>
                        <input
                            required
                            type="text"
                            id="mobile"
                            className="form-control m-2"
                            value={newContact.mobile}
                            onChange={(e) => {
                                 if (showMsg) {
                                   setShowMsg({msg:"",color:""});
                                 }
                                 if (isNaN(e.target.value)) {
                                   setShowMsg({msg:"please enter a number",color:"danger"});
                                   return;
                                 }
                                setNewContact({ ...newContact, mobile: e.target.value })
                            }}
              />
            </div>
            <div>
              <label htmlFor="saveAs">Saved as</label>
                        <input
                            required
                            type="text"
                            id="saveAs"
                            className="form-control m-2"
                            value={newContact.user}
                            onChange={(e) => {

                                
                                setNewContact({ ...newContact, user: e.target.value })
                            }}
              />
                    </div>
                    
                    <p className={`mx-2 text-${showMsg.color}`}>{showMsg.msg}</p>

            <div className="d-flex justify-content-end">
              <button
                style={{ background: "linear-gradient(40deg,red,orange" }}
                className="btn m-1"
              >
                Add
              </button>
              <button
                type="button"
                style={{ background: "linear-gradient(40deg,green,blue" }}
                onClick={() => setAddContact(false)}
                className="btn text-white m-1"
              >
                Back
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
}

export default AddContactModal