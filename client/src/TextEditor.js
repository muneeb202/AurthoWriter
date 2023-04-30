import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import { Configuration, OpenAIApi } from "openai";

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

  const [urlValue, setUrlValue] = useState("");

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
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

  const exportPdf = async () => {
    const delta = quill.getContents();

    const blob = await pdfExporter.generatePdf(delta);

    saveAs(blob, "pdf-export.pdf");
  };

  function imageHandler() {
    console.log("image handler called");
    var range = this.quill.getSelection();

    // var value = result;
    console.log(result);

    if (result) {
      this.quill.insertEmbed(range.index, "image", result, Quill.sources.USER);
    }
  }
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: {
          container: TOOLBAR_OPTIONS,
          handlers: {
            image: imageHandler,
          },
        },
      },
    });
    setQuill(q);

    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  function Side() {
    const configuration = new Configuration({
      apiKey: "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",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    const openai = new OpenAIApi(configuration);

    const genrateImage = async () => {
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
        //prompt
        //n 1 - 10
        //size 1024 x 1024 default $0.02
        //respose_format
        //user
      });

      setResult(res.data.data[0].url);
      console.log("result done");
      console.log(result);
    };

    // const putImage = async () => {
    //   console.log("place image ");
    // };

    return (
      <div className="no">
        <h2>genrate image</h2>
        <br />
        <textarea
          placeholder="lets genrate image"
          onChange={(e) => setPrompt(e.target.value)}
        />

        <br />
        <button onClick={genrateImage}>genrateimage</button>
        <hr />

        <img
          className="created_image"
          src={result}
          alt={result}
          width="100"
          height="100"
        />
        {/* <button onClick={putImage}>place</button> */}
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div ref={wrapperRef} />
        {Side()}
        {/* <SideBar /> */}
        <button onClick={exportPdf}>Export PDF</button>
      </div>
    </>
  );
}
