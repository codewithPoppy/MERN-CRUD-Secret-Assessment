import React from "react";
import axios from "axios";
import {
  TextField,
  Container,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

export default function AddSecretForm() {
  const [secretText, setSecretText] = React.useState("");
  const [expireAfter, setExpireAfter] = React.useState("");

  const [errors, setErrors] = React.useState({});

  const [fetching, setFetching] = React.useState(false);
  const [showSecretModal, setShowSecretModal] = React.useState(false);
  const [fetchedSecret, setFetchedSecret] = React.useState({});

  const validator = (secretText, expireAfter) => {
    const res = {};

    if (secretText === "") res.secretText = "Text cannot be an empty string";
    if (expireAfter <= 0)
      res.expireAfter = "Expiration time should be greater than zero";

    return res;
  };

  const handleSubmit = () => {
    const errors = validator(secretText, expireAfter);
    setErrors(errors);

    if (!errors.secretText && !errors.expireAfter) {
      setFetching(true);
      axios
        .post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/secret`, {
          secret: secretText,
          expireAfter: expireAfter,
        })
        .then((res) => {
          setFetching(false);
          setShowSecretModal(true);
          setFetchedSecret(res.data);
        });
    }
  };

  return (
    <>
      <Container sx={{ mt: 3, position: "relative" }}>
        <Box>
          <TextField
            name="secret"
            error={!!errors.secretText}
            label="Type the secret text"
            value={secretText}
            onChange={(e) => setSecretText(e.target.value)}
            helperText={errors.secretText}
            variant="outlined"
            sx={{ width: "400px" }}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="expireAfter"
            type="number"
            error={!!errors.expireAfter}
            label="Type the expiration time(seconds)"
            value={expireAfter}
            onChange={(e) => setExpireAfter(e.target.value)}
            helperText={errors.expireAfter}
            variant="outlined"
            sx={{ width: "400px" }}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ py: 2, px: 4 }}
            onClick={handleSubmit}
            disabled={fetching}
          >
            Submit
            {fetching && (
              <CircularProgress
                size={34}
                thickness={8}
                sx={{
                  color: "#226644",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-17px",
                  marginLeft: "-17px",
                }}
              />
            )}
          </Button>
        </Box>
        <Dialog
          open={showSecretModal}
          onClose={() => setShowSecretModal(false)}
        >
          <DialogTitle>{"Secret saved successfully"}</DialogTitle>
          <DialogContent>
            <Link href={`/secret/${fetchedSecret.hash}`}>
              <a>Click here to see the secret you created</a>
            </Link>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSecretModal(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
