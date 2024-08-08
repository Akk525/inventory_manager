'use client'
import Image from "next/image";
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, Toolbar, Tooltip, Typography, CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material/';
import React, { useEffect } from "react";
import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; 
import NavigateNextIcon from "@mui/icons-material/NavigateNext"; 
import Slide from "@mui/material/Slide";
import CardMedia from '@mui/material/CardMedia';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const pages = ['Dashboard'];
const settings = ['Profile', 'Dashboard', 'Logout'];

let totalItems = 0;
let lowStock = 0;
let totalSales = 0;

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function Carousel() {
    const [cards, setCards] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState("left");

    const cardPerPage = 3;
    const duplicateCards = Array.from({ length: 20 }, (_, i) => (
      <Card sx={{ maxWidth: 345 }} key={i}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            sx={{objectFit: "contain"}}
            image="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              Apple
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Quantity: 0
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));

    const handleNextPage = () => {
      setSlideDirection("left");
      setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(duplicateCards.length / cardPerPage) - 1));
    };

    const handlePrevPage = () => {
      setSlideDirection("right");
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    useEffect(() => {
      setCards(duplicateCards);
    }, []);

    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
            <NavigateBeforeIcon />
          </IconButton>

          <Box sx={{ display: "flex", flexDirection: "row", overflow: "hidden", width: "100%"}}>
            <Slide direction={slideDirection} in={true} mountOnEnter unmountOnExit>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {cards.slice(currentPage * cardPerPage, (currentPage + 1) * cardPerPage)}
              </Box>
            </Slide>
          </Box>

          <IconButton onClick={handleNextPage} disabled={currentPage >= Math.ceil(duplicateCards.length / cardPerPage) - 1}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <><Box overflow="hidden">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Inventory
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Inventory
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
    <Box bgcolor="white" display="flex" padding="3rem" height="40vh" justifyContent="space-evenly">
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
        <Typography variant="h1" textAlign="center" component="div">
            { totalItems }
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h4" textAlign="center" component="div">
            Total Items
          </Typography>
        </CardContent>  
      </Card>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
        <Typography variant="h1" textAlign="center" component="div">
            { lowStock }
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h4" textAlign="center" component="div">
            Low Stock
          </Typography>
        </CardContent>  
      </Card>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
        <Typography variant="h1" textAlign="center" component="div">
            { totalSales }
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h4" textAlign="center" component="div">
            Total Sales
          </Typography>
        </CardContent>  
      </Card>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent maxWidth="100%">
          <Button variant="contained" size="large" fullWidth onClick={handleClickOpen}><AddIcon /></Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new item to the inventory.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="image_link"
            label="Image Link"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
    <Box bgcolor="white" height="55vh" marginTop={5}>
      <Carousel />
    </Box>
    </>
  );
}

export default ResponsiveAppBar;