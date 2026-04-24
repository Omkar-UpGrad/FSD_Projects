import { useState } from "react";

function HSeperator() {
  return <hr className="border-gray-300" />;
}

function TextAnalyzerForm({ text, setText }) {
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="">
      <h1 className="p-4 text-center text-2xl font-bold text-gray-800">
        TEXT ANALYZER
      </h1>

      <HSeperator />

      <div>
        <textarea
          className="w-full border border-gray-300 p-4"
          value={text}
          onChange={handleTextChange}
          rows={8}
        ></textarea>
      </div>
    </div>
  );
}

function countCharacters(text) {
  const charArray = text.split("");
  const characterCount = charArray.reduce((a, v) => {
    if ([" \n\r\t"].includes(v)) {
      return a;
    }

    return a + 1;
  }, 0);

  return characterCount;
}

function countWords(text) {
  console.log(text.split(" "));
  return text.split(" ").filter(Boolean).length;
}

function countSpecialCharacters(text) {
  const specialCharacters = "!@#$%^&*()_-+={}[];:'\"<,>.?/`";

  return text.split("").filter((x) => specialCharacters.includes(x)).length;
}

function countLines(text) {
  return text
    .split(/(\r|\n|\r\n)/)
    .map((x) => x.trim())
    .filter(Boolean).length;
}

function TextAnalyzer({ text }) {
  const characterCount = countCharacters(text);
  const wordsCount = countWords(text);
  const specialCharactersCount = countSpecialCharacters(text);
  const linesCount = countLines(text);

  const [transformedText, setTransformedText] = useState("");
  const [times, setTimes] = useState(2);

  function transformInput(mode) {
    switch (mode) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "split":
        return text.split("").join(" ");
      case "duplicate":
        return text.repeat(times || 1);
    }
  }

  const transformOperation = (mode) => () => {
    const output = transformInput(mode);
    setTransformedText(output);
  };

  const handleChangeTimes = (e) => {
    setTimes(Number(e.target.value));
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h3 className="font-semibold">Analysis</h3>

        <div className="flex gap-2">
          <h4 className="">Character Count: </h4>
          <p>{characterCount}</p>
        </div>

        <div className="flex gap-2">
          <h4 className="">Words Count: </h4>
          <p>{wordsCount}</p>
        </div>

        <div className="flex gap-2">
          <h4 className="">Special Character Count: </h4>
          <p>{specialCharactersCount}</p>
        </div>

        <div className="flex gap-2">
          <h4 className="">Lines Count: </h4>
          <p>{linesCount}</p>
        </div>
      </div>

      <HSeperator />
      <div className="flex flex-row flex-wrap">
        <button
          onClick={transformOperation("uppercase")}
          className="p-2 px-4 border border-gray-300 cursor-pointer"
        >
          Uppercase
        </button>
        <button
          onClick={transformOperation("lowercase")}
          className="p-2 px-4 border border-gray-300 cursor-pointer"
        >
          Lowercase
        </button>
        <button
          onClick={transformOperation("split")}
          className="p-2 px-4 border border-gray-300 cursor-pointer"
        >
          Split
        </button>
        <div className="border border-gray-300 flex items-center gap-1">
          <button
            onClick={transformOperation("duplicate", times)}
            className="p-2 border-r border-r-gray-200 cursor-pointer"
          >
            Duplicate
          </button>
          <input
            type="number"
            className="w-16 border-b outline-0 ml-1"
            defaultValue={2}
            onChange={handleChangeTimes}
          />
          <span className="px-2">times</span>
        </div>
      </div>
      <HSeperator />

      <div>
        <textarea
          className="w-full border border-gray-300 p-4"
          value={transformedText}
          rows={8}
        ></textarea>
      </div>
    </div>
  );
}

function TextAnalyzerApp() {
  const [text, setText] = useState("");

  return (
    <main className="flex flex-col">
      <div className="w-full max-w-lg mx-auto my-8 shadow-md border border-gray-300">
        <TextAnalyzerForm text={text} setText={setText} />
        <TextAnalyzer text={text} />
      </div>
    </main>
  );
}

export default TextAnalyzerApp;
