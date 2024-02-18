"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Card, Container, Avatar, Box, Grid, CardContent, TextField } from "@mui/material";

function ProfileCard({ name, profilePic, email, profession, contactNumber }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        background: "linear-gradient(145deg, #6e48aa, #9d50bb)",
        borderRadius: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "auto",
        marginBottom: "20px", // Adds bottom margin to each card
      }}
    >
      <CardContent sx={{ textAlign: "center", color: "#FFFFFF" }}>
        <Avatar alt={name} src={profilePic} sx={{ width: 56, height: 56, margin: "0 auto 10px" }} />
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profession}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
          {contactNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  };

  return (
    <Box display="flex" justifyContent="center" padding={2}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginRight: 1 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
  );
}

export default function Home() {
  const [people, setPeople] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('Find People');

  // Function to shuffle the array
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const getData = async () => {
    try {
      const res = await axios.get("https://65d24b62987977636bfc37b2.mockapi.io/api/v1/people");
      const shuffledPeople = shuffleArray(res.data);
      setPeople(shuffledPeople.slice(0, 10)); // Set only 10 random people
      setButtonTitle("Refresh");
    } catch (err) {
      console.log(err);
    }
  }


  const onClickHandler = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <Box>
      <AppBar position="static" sx={{ marginBottom: "20px" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Networking and Opportunity Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <Container >
        <Box sx={{display:"flex",justifyContent:"center", alignItems:"center" }}>
        <Button variant="contained" onClick={onClickHandler} sx={{ marginBottom: "20px" }}>
          {buttonTitle}
        </Button>
        <SearchBox />
        </Box>
        <Grid container spacing={2}>
          {people.map((ele) => (
            <Grid item xs={12} key={ele.id}>
              <ProfileCard
                name={ele.name}
                profilePic={ele.image}
                email={ele.email}
                profession={ele.profession}
                contactNumber={ele.contactNumber} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
