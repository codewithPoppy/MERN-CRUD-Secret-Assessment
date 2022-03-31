import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CircularProgress, Container, Button, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";

import Navbar from "../../components/navbar";

export default function Secret() {
  const router = useRouter();
  const { slug } = router.query;

  const [hasFetched, setHasFetched] = React.useState(false);
  const [secret, setSecret] = React.useState({});
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    if (!slug) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/secret/${slug}`)
      .then((res) => {
        setSecret(res.data);
        setHasFetched(true);
      })
      .catch((err) => {
        if (err.response === undefined)
          setError({ error: "Network Error, cannot connect to the server" });
        else setError(err.response.data);
        setHasFetched(true);
      });
  }, [slug]);

  return (
    <>
      <Navbar />
      <Container>
        <Link href="/" passHref>
          <Button variant="contained" sx={{ py: 2, px: 4, mt: 3 }}>
            Add Secret
          </Button>
        </Link>
        {!hasFetched ? (
          <>
            <CircularProgress
              size={50}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-25px",
                marginLeft: "-25px",
              }}
            />
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mt: 3 }}>
              {`Secret for hash "${slug}"`}
            </Typography>
            {error && !!error.error ? (
              <>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  {error.error}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Content: {secret.secretText}
                </Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Created At:{" "}
                  {moment(secret.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Will be expired At:{" "}
                  {moment(secret.expiresAt).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
