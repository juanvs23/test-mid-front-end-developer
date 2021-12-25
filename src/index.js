import React, { useState } from "react";
import ReactDOM from "react-dom";

const languages = ["JavaScript", "Python", "ruby", "php", "C#"];

const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguages] = useState(languages);
  const [currentLanguage, setcurrentLanguage] = useState(0);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguages, currentLanguage, setcurrentLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

const useHooks = () => {
  const { language, setLanguages, currentLanguage, setcurrentLanguage } =
    React.useContext(LanguageContext);
  return { language, setLanguages, currentLanguage, setcurrentLanguage };
};

const WrapperComponent = (Component) => {
  return function Wrapper(props) {
    const hooks = useHooks();
    console.log(hooks);
    return (
      <Component
        {...props}
        language={hooks.language}
        setLanguages={hooks.setLanguages}
        currentLanguage={hooks.currentLanguage}
        setcurrentLanguage={hooks.setcurrentLanguage}
      />
    );
  };
};
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // implement Context here so can be used in child components
      <LanguageProvider>
        <NewComponent />
      </LanguageProvider>
    );
  }
}

class MainSection extends React.Component {
  handlerClick = () => {
    console.log(this.props.language.length);
    if (this.props.currentLanguage < this.props.language.length - 1) {
      this.props.setcurrentLanguage(this.props.currentLanguage + 1);
    } else {
      this.props.setcurrentLanguage(0);
    }
  };
  render() {
    return (
      <div>
        <p id="favoriteLanguage">
          Favorite programing language:{" "}
          {this.props.language[this.props.currentLanguage]}
        </p>
        <button id="changeFavorite" onClick={this.handlerClick}>
          Toggle language
        </button>
      </div>
    );
  }
}

const NewComponent = WrapperComponent(MainSection);

ReactDOM.render(<App />, document.getElementById("root"));
