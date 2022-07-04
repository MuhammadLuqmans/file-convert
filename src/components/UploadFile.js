import React, { useRef, useState } from "react";
import styles from "../../styles/dropFile.module.css";
import { ImageConfig } from "./ImageConfig";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  const [checkFiles, setCheckFiles] = useState("none");
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setCheckFiles("block");
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <h2 className={styles.Ready_text} style={{ display: checkFiles }}>
      &quot;Ready Done&ldquo; 
      </h2>
      <div className={styles.wrapper}>
        <div
          ref={wrapperRef}
          className={styles.drop_file_input}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className={styles.drop_file_input__label}>
            <img src="/assets/cloud-upload-regular-240.png" alt="" />
            <p className={styles.upload_text}>Upload to start</p>
          </div>
          <input type="file" value="" onChange={onFileDrop} />
        </div>
        {fileList.length > 0 ? (
          <div style={{ display: "none" }}>
            <p>Ready to upload</p>
            {fileList.map((item, index) => {
              console.log(
                ' ImageConfig[item.type.split("/")[1]]',
                item.type.split("/")[1],
                ImageConfig["pdf"]
              );
              return (
                <div key={index} >
                  <img
                    src={
                      ImageConfig[item.type.split("/")[1]] ||
                      ImageConfig["default"]
                    }
                    alt=""
                    className="bg-blue-400"
                  />

                  <div>
                    <p>{item.name}</p>
                    <p> file Size {item.size / 1000} KB</p>
                  </div>
                  <span onClick={() => fileRemove(item)}>x</span>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

// DropFileInput.propTypes = {
//   onFileChange: PropTypes.func,
// };

export default DropFileInput;
