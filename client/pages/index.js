import Head from "next/head";
import Image from "next/image";
import AddSecretForm from "../components/addSecretForm";

import Navbar from "../components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Secret Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <AddSecretForm />
    </>
  );
}
