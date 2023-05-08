import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import { SideBar } from "./Header";
import "./styles.css";

const SAVE_INTERVAL_MS = 2000;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, [{ list: "bullet" }]],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["image", "bloackqoute", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const { id: documentid } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentid);
  }, [socket, quill, documentid]);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, [SAVE_INTERVAL_MS]);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      quill.off("receive-changes", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);

    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  const exportPdf = async () => {
    const delta = quill.getContents();

    const blob = await pdfExporter.generatePdf(delta);
    saveAs(blob, window.location.pathname.split("/").pop() + ".pdf");
  };

  const [readEnable, setReadEnable] = useState(false);
  const reader = async () => {
    if (buttonDisabled) {
      console.log("reader mode on ");
    } else {
      window.location.reload();
    }
    quill.enable(readEnable);
    setButtonDisabled(false);
    const toolbar = quill.getModule("toolbar");
    if (toolbar) {
      toolbar.container.style.display = readEnable ? "block" : "none";
    }

    setReadEnable(readEnable);
  };

  const [urlValue, setUrlValue] = useState("");
  const insertLink = async () => {};

  return (
    <>
      <div className="container">
        <div ref={wrapperRef} />
        {buttonDisabled && <SideBar />}
        <div className="button-container pdf">
          {buttonDisabled && (
            <button className="side-button pdf" onClick={exportPdf}>
              Export PDF
            </button>
          )}
		  <button className="side-button reader" onClick={reader}>
            Reader Mode
          </button>
          <button disabled={buttonDisabled}></button>
        </div>
      </div>
    </>
  );
}
