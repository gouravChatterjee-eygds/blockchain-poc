import React, { useState, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const { closeHandler, showCloseButton = true } = props;

  const renderCloseButton = () => {
    return (
      <>
        {typeof closeHandler === "function" ? (
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={closeHandler}
          >
            Close
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        )}
      </>
    );
  };
  useImperativeHandle(ref, () => {
    return {
      setShowModal,
    };
  });
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center max-h-100 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="border-b border-solid border-blueGray-200 p-1 rounded-t">
                  <h3 className="text-lg text-center font-semibold">
                    {props.title}
                  </h3>
                  <p className="text-lg">{props.subTitle}</p>
                </div>

                {/*body*/}
                <div className="relative p-6 pt-3 flex-auto">
                  {/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed"> */}
                  {props.children}
                  {/* </p> */}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b">
                  {!!props.actionButtonText && (
                    <div className="">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={props.actionHandler}
                      >
                        {props.actionButtonText}
                      </button>
                    </div>
                  )}
                  <div className="ml-2">
                    {showCloseButton && renderCloseButton()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
});

export default Modal;
