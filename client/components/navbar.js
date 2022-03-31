import React from "react";
import Link from "next/link";

import { Box, Typography, Container, Toolbar, AppBar } from "@mui/material";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ pl: "0px !important" }}>
            <Link href="/" passHref>
              <Typography
                variant="h4"
                component="a"
                sx={{ flexGrow: 1, my: 3, textDecoration: "none" }}
              >
                Secret Management
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
