import React,{useState} from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginCall, registerToPlatform } from "../apiCalls/authApi";


let emptyOTP = {
  first1: "",
  first2: "",
  first3: "",
  first4: "",
  first5: "",
};

const LoginPage = () => {
    let [showVerify, setShowVerify] = useState(false);
    let [credentials, setCredentials] = useState({ email: "", mobile: "" })
    let [msg, setMsg] = useState("");

    let handleSubmit = (e) => {
      e.preventDefault();
      
      if (credentials.mobile.length!=10) {
        return setMsg("Invalid Mobile Number")
      }

      if (credentials.mobile == "8888888888") {
        setShowVerify(true)
        return;
      }

      registerToPlatform({ email: credentials.email })
        .then(res => {
          localStorage.setItem("otp", res.data.otp);
          localStorage.setItem("time",JSON.stringify(res.data.time))
        setShowVerify(true);
     }).catch(err=>console.log(err))
       
        
    }

  return (
    <div style={{height:"100vh"}}  className="bg-dark login d-flex align-items-center ">
      <div className="d-flex flex-wrap justify-content-around w-100">
        <div >
          <img
          
            width="35%"
            src="/chat-app-logo.png"
            alt="appLogo"
          />
          <span className="mx-3 text-white display-5">Chit-Chat</span>
        </div>
        <div className="p-4 m-2 mt-5 border rounded-4">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-1">
              <input
                required
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
                          <input
                required
                type="text"
                className="form-control"
                id="floatingNumber"
                placeholder="Password"
                value={credentials.mobile}
                onChange={(e) => {
             
                  if (msg) {
                    setMsg("");
                  }
                  if (isNaN(e.target.value)) {
                    setMsg("Please enter a number");
                    return
                  }
                 
                  setCredentials({ ...credentials, mobile: e.target.value })
                }}
              />
              <label htmlFor="floatingNumber">Mobile Number</label>
            </div>
            <p className="text-danger text-center">{msg}</p>

            <button className="btn btn-warning mx-4 w-75">submit</button>
          </form>
        </div>
      </div>

      <VerificationModal
        showVerify={showVerify}
              setShowVerify={setShowVerify}
        email={credentials.email}
        mobile={credentials.mobile}
      />
    </div>
  );
};


let VerificationModal = ({showVerify,setShowVerify,email,mobile}) => {
  let [otp, setOtp] = useState(emptyOTP);
  let [errMsg, setErrMsg] = useState("");

  let NavigateTo = useNavigate()
  

  let verifyOTP = () => {
    let res=""

    for (let i in otp) {
    if (!otp[i]) {
          return setErrMsg("*Invalid OTP"); 
      }
      res += otp[i];
    }

    // let guest user see the application with dummy data;
    if (res == "88888") {
      localStorage.setItem("userStatus", "guest");
      NavigateTo("/Home");
      return;
     }

    let thresholdTime = Date.now(JSON.parse(localStorage.getItem("time")));
    let currTime = Date.now();

    if ((currTime - thresholdTime) / (1000 * 60) > 5) {
      return alert("SORRY! OTP IS EXPIRED ,TRY AGAIN")
    }
    
    if (res == localStorage.getItem("otp")) {

      loginCall({ email, mobile }).then((res) => {
      
        localStorage.removeItem("userStatus")
        localStorage.setItem("LoggedUser", JSON.stringify(res.data))
        localStorage.setItem("chatToken",res.data.accessToken)
         NavigateTo("/Home")
      }).catch((err) => {
        console.log(err);
      
      })
      localStorage.removeItem("otp");
      localStorage.removeItem("time");
      
    } else {
        setErrMsg("OTP is not correct ,please try again")
     }
    
  }

  let ReadOTP = (e) => {
    if (errMsg) {
      setErrMsg("")
    };

      setOtp({...otp,[e.target.name]:e.target.value});
  }
    return (
      <Modal
        show={showVerify}
        onHide={() => setShowVerify(false)}
        centered
        backdrop="static"
      >
        <Modal.Header className="bg-dark text-white" closeButton>
          Enter 5 digits OTP send to :{" "}
          <span className="text-info">{`${email}`}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-evenly">
            <input
              maxLength="1"
              style={{ width: "2.4em" }}
              name="first1"
              className="form-control  "
              value={otp.first1}
              onChange={(e) => ReadOTP(e)}
            />
            <input
              maxLength="1"
              style={{ width: "2.4em" }}
              name="first2"
              className="form-control"
              value={otp.first2}
              onChange={(e) => ReadOTP(e)}
            />
            <input
              maxLength="1"
              style={{ width: "2.4em" }}
              name="first3"
              className="form-control"
              value={otp.first3}
              onChange={(e) => ReadOTP(e)}
            />
            <input
              maxLength="1"
              style={{ width: "2.4em" }}
              name="first4"
              className="form-control "
              value={otp.first4}
              onChange={(e) => ReadOTP(e)}
            />
            <input
              maxLength="1"
              style={{ width: "2.4em" }}
              name="first5"
              className="form-control "
              value={otp.first5}
              onChange={(e) => ReadOTP(e)}
            />
          </div>
          <p className="text-center text-danger mt-2  ">{errMsg}</p>
          <p className="m-2 fw-bold">*OTP valid for 5 minutes</p>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={verifyOTP} className="btn btn-success w-50">
              Verify
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
}

export default LoginPage;
