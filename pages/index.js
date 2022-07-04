import Head from "next/head";
import Image from "next/image";
import DropFileInput from "../src/components/UploadFile";
import styles from "../styles/Home.module.css";

export default function Home() {
  const onFileChange = (files) => {
    console.log(files);
}
  return (
    <div className={styles.container}>
     <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
    </div>
  );
}
