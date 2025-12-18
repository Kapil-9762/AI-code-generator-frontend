import React, { useEffect, useRef, useState } from 'react'
import './Generate.css';
import Select from 'react-select';
import { BsStars } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import Editor from '@monaco-editor/react';
import { IoCopy } from "react-icons/io5";
import { CiImport } from "react-icons/ci";
import { LuRefreshCcw } from "react-icons/lu";
import { ClipLoader} from "react-spinners";
import axios from 'axios';
import { useSelector } from 'react-redux';

// framework options
const options = [
  { value: 'HTML+CSS', label: 'HTML+CSS' },
  { value: 'HTML+CSS+JS', label: 'HTML+CSS+JS' },
  { value: 'HTML+Tailwind', label: 'HTML+Tailwind' },
  { value: 'HTML+Boostrap', label: 'HTML+Boostrap' },
];
// main Generate component
const Generate = () => {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const [textPrompt, setTextPrompt] = useState("");
  const [selectedOption, setSelectedOption] = useState({ value: "", label: "" })
  const [genCode, setGenCode] = useState(null);
  const [action, setAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef();
//   select option style
  const customStyles = {
    control: (base, state) => ({
     ...base,
     backgroundColor: "rgb(10, 10, 10)",
     borderColor: "rgb(106, 177, 0, 0.4)",
     borderRadius: "8px",
     minHeight: "44px",
    }),
    menu: (base) => ({
     ...base,
     backgroundColor: "#020617",
    }),
    option: (base, state) => ({
     ...base,
     backgroundColor: state.isSelected
      ? "#6366f1"
      : state.isFocused
      ? "#1e293b"
      : "transparent",
     color: "white",
    }),
    singleValue: (base) => ({
     ...base,
      color: "#a8a8a8",
    }),
    placeholder: (base) => ({
     ...base,
     color: "#94a3b8",
    }),
  }

  // user prompts
  const prompt = `
  You are an experienced programmer with expertise in web development and UI/UX design.
  User Requirement: ${textPrompt}
  Framework/Tech to use: ${selectedOption.value}
Generate a complete, production-ready UI component based on the above details.
Requirements:  
-The code must be clean, well-structured, and easy to understand.  
-Optimize for SEO where applicable.  
-Focus on creating a modern, animated, and responsive UI design.  
-Include high-quality hover effects, shadows, animations, colors, and typography.  
-Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- don't add comments only code
-Do NOT include explanations, text, comments, or anything else besides the code.  
-And give the whole code in a single HTML file.`;
  
// scroll page to specified px
   function scrollPage() {
    window.scrollBy({
      top: 300,  
      behavior: "smooth"
    });
  }
  
  // function for generating code
  const handleGenerate = async(e) => {
    e.preventDefault();
    if (textPrompt === "") {
      return toast.info("Firstly, describe your prompts")
    }
    if (selectedOption.value === "") {
      return toast.info("Choose your framework")
    }
    if (!isLoggedin) {
      return toast.info("please login the page.")
    }
    setAction(true);
    setLoading(true);
    scrollPage(); 
    try {
       await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/generate`, {prompt}).then((res) => {
         setGenCode(res.data.data);
         console.log(res);
      })
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
    setTextPrompt("");
  }

  // function to return a language for code editor
  const getLanguage = (framework) => {
    if (framework == "HTML+CSS") return "html";
    if (framework == "HTML+CSS+JS") return "javascript";
    return "html";
  }
  // refresh function to refresh the code editor
  const handleRefresh = () => {
    setAction(false);
    setGenCode("");
  }

  // code editor onMount function
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // copy code from the code Editor
   const handleCopy = async () => {
    const value = editorRef.current.getValue(); 
    await navigator.clipboard.writeText(value);
    toast.success("Code copied successfully.")
  };
  return (
    <div className='generate container flex f-col g-30 al-center jc-center'>
      <ToastContainer/>
      <div className="sub-container flex f-col g-20">
        <div className="title flex f-col g-10 al-center">
            <h1>AI Code Generator</h1>
            <p>Describe your framework and generate AI code.</p>
        </div>
        <div className="flex f-col g-10">
          <h4>Framework</h4>
          <Select 
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          styles={customStyles}
           />
        </div>
        <div className="flex f-col g-10">
            <p style={{color:" rgb(135, 50, 214)"}}>Describe your component</p>
            <textarea name="prompt" id="prompt" rows="4" autoComplete='off' placeholder='Write here about your component...' value={textPrompt} onChange={(e)=>setTextPrompt(e.target.value)} required/>
            <div className="gen-btn flex jc-sb al-center">
                <p>Click on generate button to get your code and you can edit the code</p>
                <button onClick={handleGenerate}><BsStars/> {loading ? "Generating" : "Generate"}</button>
            </div>
        </div>
      </div>
      <div className="sub-container code-container">
        <div className="code-function flex jc-sb al-center">
          <h3>Code Editor</h3>
          <div className="icons flex g-30 al-center">
            <button>Preview</button>
            <IoCopy  className='icon' title='Copy' onClick={handleCopy}/>
            <LuRefreshCcw className='icon' title='Refresh' onClick={handleRefresh}/>
            <CiImport className='icon' title='Import'/>
          </div>
        </div>
        {
          action ?
            <>
              {
                loading ? <ClipLoader color="#dedede" className='clip-loader'/> : <Editor height="74vh" theme='vs-dark' defaultLanguage="html" language={() => getLanguage(selectedOption.value)} value={genCode} onMount={handleEditorDidMount}/>
              }
            </>
            :
            <div className="code-sec flex f-col al-center g-10">
              <FaCode className='icon'/>
              <p>Your code will be appear here.</p>
            </div>
        }
      </div>
    </div>
  )
}

export default Generate
