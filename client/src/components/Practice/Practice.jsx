import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FaCaretSquareRight } from "react-icons/fa";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";
import { MdMemory } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./Practice.css";

export default function Practice() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("c_cpp");
  const [theme, setTheme] = useState("github");
  const [compiling, setCompiling] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/user/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.user) {
            localStorage.removeItem("token");
            navigate("/");
          } else {
            setName(data.user.name);
          }
        });
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate]);

  const handleCodeCompile = () => {
    setCompiling(true);
    let newInput;
    if (input === "") {
      newInput = null;
    } else {
      newInput = input;
    }
    let languageCode;
    if (language === "c_cpp") {
      languageCode = 76;
    } else if (language === "python") {
      languageCode = 71;
    } else if (language === "javascript") {
      languageCode = 63;
    } else if (language === "golang") {
      languageCode = 60;
    } else if (language === "java") {
      languageCode = 62;
    } else if (language === "ruby") {
      languageCode = 72;
    } else if (language === "php") {
      languageCode = 68;
    } else if (language === "csharp") {
      languageCode = 51;
    } else if (language === "typescript") {
      languageCode = 74;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: languageCode,
        input: newInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompiling(false);
        if (data.output.stderr) {
          setError(true);
          setErrorMessage(data.output.stderr);
        }else{
          setError(false);
          setErrorMessage("");
          setOutput(data.output.stdout);
          setTime(data.output.time);
          setMemory(data.output.memory);
        }
      });
  };

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          {/* main heading */}
          <div className="practice container">
            <h2>Hello {name}</h2>
            <div className="editor">
              <h3>Practice Below in the Editor</h3>
              <Row xs={2} md={4} lg={6}>
                <Col>
                  <Form.Label>Select Language</Form.Label>
                  <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="c_cpp">C/C++</option>
                    <option value="golang">Go</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="ruby">Ruby</option>
                    <option value="php">PHP</option>
                    <option value="csharp">C#</option>
                    <option value="typescript">TypeScript</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Select Theme</Form.Label>
                  <Form.Select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="github">Github</option>
                    <option value="monokai">Monokai</option>
                    <option value="tomorrow">Tomorrow</option>
                    <option value="twilight">Twilight</option>
                    <option value="xcode">XCode</option>
                    <option value="terminal">Terminal</option>
                    <option value="textmate">Textmate</option>
                  </Form.Select>
                </Col>
              </Row>
              <AceEditor
                placeholder="Enter Code Here"
                mode={language}
                theme={theme}
                onChange={(newValue) => {
                  setCode(newValue);
                }}
                fontSize={16}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={code}
                style={{ width: "60rem" }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 4,
                }}
              />
              <Form.Label>Enter Input</Form.Label>
              <Form.Control
                className="input"
                as="textarea"
                rows="3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                variant="success"
                className="run-button"
                disabled={compiling}
                onClick={handleCodeCompile}
              >
                <FaCaretSquareRight /> Run Code
              </Button>
              <div>
                {compiling ? (
                  <Spinner animation="border" variant="primary" />
                ) : null}
                {output !== "" && !error ? (
                  <div className="output-window">
                    <h3>Output</h3>
                    <div className="output">{output}</div>
                    <div className="time-memory">
                      <div className="time">
                        <FaClock /> Time: {time} seconds
                      </div>
                      <div className="memory">
                        <MdMemory /> Memory: {memory} KB
                      </div>
                    </div>
                  </div>
                ) : null}
                {error ? (
                  <div className="error-window">
                    <h3>Error</h3>
                    <div className="error">{errorMessage}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
