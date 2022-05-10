import React, { KeyboardEvent } from "react";
import { Backspace, Clock } from "phosphor-react";
import { useState } from "react";

type ButtonType = {
  label: string;
  isAction?: boolean;
  full?: boolean;
};

type HistoryType = {
  expression: string;
  result: string;
};

export function App() {
  const leftButtons = [
    {
      label: "C",
      isAction: true,
    },
    {
      label: "(",
      isAction: true,
    },
    {
      label: ")",
      isAction: true,
    },
    {
      label: "√",
      isAction: true,
    },
    {
      label: "%",
      isAction: true,
    },
    {
      label: "+/-",
      isAction: true,
    },
    {
      label: "7",
    },
    {
      label: "8",
    },
    {
      label: "9",
    },
    {
      label: "4",
    },
    {
      label: "5",
    },
    {
      label: "6",
    },
    {
      label: "1",
    },
    {
      label: "2",
    },
    {
      label: "3",
    },
    {
      label: "0",
      full: true,
    },
    {
      label: ".",
    },
  ] as ButtonType[];

  const rightButtons = [
    {
      label: "÷",
      isAction: true,
    },
    {
      label: "*",
      isAction: true,
    },
    {
      label: "-",
      isAction: true,
    },
    {
      label: "+",
      isAction: true,
    },
    {
      label: "=",
      full: true,
      isAction: true,
    },
  ] as ButtonType[];
  const [showHistory, setShowHistory] = useState(false);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<HistoryType[]>([] as HistoryType[]);
  const [expression, setExpression] = useState("");

  const calculate = (str: string): string => {
    const result = eval(str);
    setHistory([...history, { expression: str, result: result }]);
    return result;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key.toString().toLowerCase()) {
      case "backspace":
        backspace();
        break;
      case "=":
        setExpression(calculate(expression));
        break;
      case "enter":
        setExpression(calculate(expression));
        break;
      default:
        if (
          leftButtons.find(
            (button) =>
              button.label.toString().toLowerCase() ===
              event.key.toString().toLowerCase()
          )
        ) {
          console.log("teste");
          setExpression(expression + event.key);
        }
        break;
    }
  };
  const onClick = (button: ButtonType) => {
    switch (button.label.toString().toLowerCase()) {
      case "=":
        const result = calculate(expression);
        setResult(result);
        setExpression("");
        break;
      case "c":
        setResult("0");
        setHistory([]);
        setExpression("");
        break;
      default:
        setExpression(expression + `${button.label}`);
        break;
    }
  };

  const backspace = () => {
    setExpression(expression.substring(0, expression.length - 1));
  };

  return (
    <>
      <main
        onKeyDown={onKeyDown}
        className="min-h-screen w-screen bg-[#ddd] flex items-center justify-center"
      >
        <div className="w-[26.75rem] h-[57.87rem] bg-black-4 rounded-3xl p-6 flex flex-col">
          <div id="display" className="text-black-3 text-right h3 ">
            <div id="history" className="min-h-[128px] h-32 max-h-[128px]">
              {history
                .map((item) => item)
                .reverse()
                .map((item, index) => {
                  if (index >= 3) {
                    return null;
                  }
                  return (
                    <span className="history-item">{item.expression}</span>
                  );
                })
                .reverse()}
            </div>
            <div id="result" className="-my-1">
              <span className="mr-1">=</span>
              <span className="h1 text-black-0">{expression || result}</span>
            </div>
            <div id="actions" className="flex justify-between items-center">
              <button
                onClick={() => setShowHistory(showHistory ? false : true)}
                title="Ver histórico"
                className="action"
              >
                <Clock weight="bold" />
              </button>
              <button onClick={backspace} title="Apagar" className="action">
                <Backspace weight="fill" />
              </button>
            </div>
            <hr className="border-[#E5E3DD] border-b-2 w-4/5 mx-auto my-3" />
          </div>
          <div
            id="content"
            className="flex-1 flex p-0 overflow-y-scroll flex-row flex-nowrap"
          >
            <aside id="left">
              {showHistory ? (
                <>
                  <div
                    id="history-show"
                    className="w-[17.25rem] overflow-y-scroll p-3 scrollbar-track-transparent scrollbar-thumb-yellow-0 scrollbar-thin h-full text-right self-start text-black-3 animate-slideLeft"
                  >
                    {history.map((item, index) => {
                      if (index >= 30) {
                        return null;
                      }
                      return (
                        <div className="my-2 h4">
                          <p>{item.expression}</p>
                          <p className="font-bold">
                            <span>= </span>
                            <span className="text-yellow-2 h3">
                              {item.result}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    {history.length <= 0 && "Sem histórico"}
                  </div>
                </>
              ) : (
                <div className="flex flex-row h-full flex-wrap items-center w-[17.25rem] gap-[30px]">
                  {leftButtons.map((button) => (
                    <button
                      key={button.label}
                      onClick={() => onClick(button)}
                      className={`calcButton ${button.full && "flex-1"} ${
                        button.isAction
                          ? "bg-yellow-3 hover:ring-2 focus:ring-2 outline-none ring-yellow-0 "
                          : "black-de"
                      }`}
                    >
                      {button.label}
                    </button>
                  ))}
                </div>
              )}
            </aside>
            <section
              id="right"
              className="flex-1 flex flex-row flex-wrap ml-[30px] justify-center items-center gap-[30px]"
            >
              {rightButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={() => onClick(button)}
                  className={`calcButton ${
                    button.isAction ? "yellow-de" : "black-de"
                  } ${button.full && "h-[181.5px]"}`}
                >
                  {button.label}
                </button>
              ))}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
