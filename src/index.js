import React, { useState } from "react";
import ReactDOM from "react-dom";
 
//Styles
const style = {
  general: {
    fontSize: "16px",
    fontFamily: "Arial",
  },
  table: {
    borderCollapse: "collapse",
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
  },
  userAdded: {
    backgroundColor: "lightseagreen",
    color: "#fff",
    minWidth: "300px",
    padding: "5px",
    borderRadius: "10px",
    border: "1px solid #196932",
    marginBottom: "5px",
    position: "fixed",
    right: "20px",
    top: "10px",
    textAlign: "center",
  },
  ulAlert: {
    padding: "0",
    paddingInlineStart: "0",
    position: "fixed",
    right: "20px",
    top: "10px",
  },
  alert: {
    backgroundColor: "#FF2B52",
    color: "#fff",
    padding: "5px",
    borderRadius: "10px",
    border: "1px solid #FF0B00",
    marginBottom: "5px",
    minWidth: "300px",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "lightseagreen",
      fontSize: "14px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  },
};
//end styles

//context
/**
 * Create context
 */
const PhonebookContext = React.createContext();

/**
 *  Create useProvider
 * @param {children} param0
 * @returns Component
 */
const PhonebookProvider = ({ children }) => {
  const [phoneBook, setPhoneBook] = useState([]);
  const [alert, setAlert] = useState([]);
  return (
    <PhonebookContext.Provider
      value={{
        phoneBook,
        setPhoneBook,
        alert,
        setAlert,
      }}
    >
      {children}
    </PhonebookContext.Provider>
  );
};

//end context

//helpers
/**
 * validate data
 * @param {string} info
 * @param {string} type
 * @returns boolean
 */
const checkInfo = (info, type = "text") => {
  if (info === "") {
    return false;
  }

  if (info.length < 3) {
    return false;
  }
  if (type === "tel") {
    let regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (!info.match(regex)) {
      return false;
    }
  }

  return true;
};

//end helpers

//components
//form
function PhoneBookForm({ addEntryToPhoneBook }) {
  let { setPhoneBook, setAlert } = React.useContext(PhonebookContext);
  let initialFirstName='Coder', initialLastName='Byte',initialPhoneName=8885559999
  const [valueFirstName,setvalueFirstName] = React.useState(initialFirstName)
  const [valueLastName,setvalueLastName] = React.useState(initialLastName)
  const [valuePhone,setvaluePhone] = React.useState(initialPhoneName)
   const inputFirstNameRef=React.useRef()
   const inputSecondNameRef=React.useRef()
   const inputPhoneNameRef=React.useRef()

React.useEffect(()=>{
  setvalueFirstName(inputFirstNameRef.current.value)
  setvalueLastName(inputSecondNameRef.current.value)
  setvaluePhone(inputPhoneNameRef.current.value)
},[inputFirstNameRef,inputSecondNameRef,inputPhoneNameRef])

  const handleraddPhone = (e) => {
    e.preventDefault();

    let { userFirstname, userLastname, userPhone } = e.target;
    let validateFirstname = checkInfo(userFirstname.value);
    let validateuserLastname = checkInfo(userLastname.value);
    let validateuserPhone = checkInfo(userPhone.value, "tel");
    console.log(validateFirstname, validateuserLastname, validateuserPhone);
    if (validateFirstname && validateuserLastname && validateuserPhone) {
      let newPhone = {
        firstName: userFirstname.value,
        lastName: userLastname.value,
        phone: userPhone.value,
      };
      
       
      setPhoneBook((phoneBook) =>{
        let newPhoneBook=  [...phoneBook, newPhone]
       
        return  newPhoneBook.sort((a,b)=>{
          if(a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1
          if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1
          return 0
        })
      });
      setAlert([{ value: "user Added" }]);
      e.target.reset()
      setvalueFirstName(initialFirstName)
      setvalueLastName(initialLastName)
      setvaluePhone(initialPhoneName)
    } else {
      let errors = [];
      if (!validateFirstname) {
        console.log(validateFirstname);
        errors.push({ value: "First name must be at least three characters" });
      }
      if (!validateuserLastname) {
        console.log(validateuserLastname);
        errors.push({ value: "First name must be at least three characters" });
      }
      if (!validateuserPhone) {
        console.log(validateuserPhone);
        errors.push({ value: "phone number invalid" });
      }
      setAlert(errors);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleraddPhone(e);
      }}
      style={style.form.container}
    >
      {/* add validate + info */}
      <Alert />
      <label>First name:</label>
      <br />
      


      <input
      ref={inputFirstNameRef}
        style={style.form.inputs}
        defaultValue={valueFirstName}
        className="userFirstname"
        name="userFirstname"
        type="text"
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
      ref={inputSecondNameRef}
      defaultValue={valueLastName}
        style={style.form.inputs}
        className="userLastname"
        name="userLastname"
        type="text"
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
      defaultValue={valuePhone}
      ref={inputPhoneNameRef}
        style={style.form.inputs}
        className="userPhone"
        name="userPhone"
        type="text"
      />
      <br />
      <input
     
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}
//alert
function Alert() {
  const { alert, setAlert } = React.useContext(PhonebookContext);

  if (alert.length > 0) {
    setTimeout(() => {
      setAlert([]);
    }, 3000);
    if (alert[0].value === "user Added") {
      return <div style={style.userAdded}> {alert[0].value} </div>;
    } else {
      return (
        <ul id="alert" style={style.ulAlert}>
          {alert.map((alertInfo, i) => {
            return (
              <li key={i} style={style.alert}>
                {i + 1} - {alertInfo.value}
              </li>
            );
          })}
        </ul>
      );
    }
  } else {
    return null;
  }
}

//table
function InformationTable(props) {
  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      {/* add tbody */}
      <TableBody />
    </table>
  );
}
//info
function TableBody() {
  const { phoneBook } = React.useContext(PhonebookContext);
  return (
    <tbody>
      {phoneBook.map((phoneAdress, index) => {
        const { firstName, lastName, phone } = phoneAdress;
        return (
          <tr key={index}>
            <td style={style.tableCell}> {firstName} </td>
            <td style={style.tableCell}> {lastName} </td>
            <td style={style.tableCell}> {phone} </td>
          </tr>
        );
      })}
    </tbody>
  );
}
//end components

//app
function Application(props) {
  return (
    <section style={style.general}>
      <PhoneBookForm />
      <InformationTable />
    </section>
  );
}
//end app

//index
ReactDOM.render(
  //add useContext as state manager
  <PhonebookProvider>
    <Application />
  </PhonebookProvider>,
  document.getElementById("root")
);
