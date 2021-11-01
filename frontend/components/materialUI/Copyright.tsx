import { Typography } from "@mui/material";
import MuiLink from '@mui/material/Link'
import Link from 'next/link'
export default function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link href="/" passHref>
          <MuiLink color="inherit">Bookshop</MuiLink>
        </Link>
        {` `}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }