import { styled } from "@mui/material/styles";

export const Responsive = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    color: "red",
  },
}));
