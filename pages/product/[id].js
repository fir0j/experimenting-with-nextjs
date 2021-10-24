import axios from "axios";
import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Divider,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  ListItemIcon,
  styled,
  Avatar,
} from "@mui/material";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Https as HttpsIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Replay as ReplayIcon,
  DeliveryDining as DeliveryDiningIcon,
  Security as SecurityIcon,
  EmailOutlined as EmailOutlinedIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

const productUrl = "https://nepalmartonline.herokuapp.com/api/v1/product";

export async function getStaticPaths() {
  // Return a list of possible value for id
  // the list must be an array of objects with params key contain another object with the id key
  return {
    // paths: {
    //   params: {
    //     id: "firoj",
    //   },
    // },
    paths: [], // no page will be built with data during build time
    fallback: true, // will not affect seo
  };
}

// getStaticProps is called everytime in dev mode but not production
export async function getStaticProps(context) {
  const { params } = context;
  let axiosConfig = {
    method: "get",
    url: `${productUrl}/${params.id}`,
  };
  let ourData = {};
  try {
    const result = await axios(axiosConfig);
    if (!result.data.length > 0) return;
    ourData.itemWithCatalog = result.data[0].itemWithCatalog[0].data[0];
    ourData.size = result.data[0].size;
    ourData.color = result.data[0].color;
    // console.log("result product page", ourData);
    console.log("data fetching suceed");
  } catch (error) {
    console.log("error is", error.message);
  }

  return {
    props: {
      data: ourData,
    },
    revalidate: 10, // update the pre-generated page at most 10 seconds
  };
}

// layout design tip: do using height and width contraints Grid Component, let them be fluid and adapt your content is constrained
export default function Product({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return "Loading...";
  }

  return (
    <div>
      <ExpandLessIcon />
      <h1>{data.itemWithCatalog.name} display page</h1>
    </div>
  );
}
