"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  Container,
  Avatar,
  Box,
  Grid,
  CardContent,
  TextField,
} from "@mui/material";

function ProfileCard({ name, profilePic, email, profession, city, contactNumber }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
        borderRadius: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        margin: "auto",
        marginBottom: "20px",
      }}
    >
      <CardContent sx={{ textAlign: "center", color: "#FFFFFF" }}>
        <Avatar
          alt={name}
          src={profilePic}
          sx={{ width: 86, height: 86, margin: "0 auto 10px" }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profession}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city}
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

function SearchBox({ people, setFilteredPeople }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filteredPeople = people.filter((person) => {
      return (
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.profession.toLowerCase().includes(searchTerm.toLowerCase()) || 
        person.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
        person.email.toLowerCase().includes(searchTerm.toLowerCase())
        // Add more conditions for searching by location or other fields if needed
      );
    });
    setFilteredPeople(filteredPeople);
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
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default function Home() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("Find People");

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://65d24b62987977636bfc37b2.mockapi.io/api/v1/people"
      );
      setPeople(res.data);
      const shuffledPeople = shuffleArray(res.data);
      // setPeople(shuffledPeople.slice(0, 10)); // Set only 10 random people
      setFilteredPeople(shuffledPeople.slice(0, 10)); // Set filtered people initially
      setButtonTitle("Refresh");
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <Box>
      <AppBar position="static" >
        <Toolbar sx={{ justifyContent: "center", textAlign: "center" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Networking and Opportunity Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Button
            variant="contained"
            onClick={onClickHandler}
            sx={{ marginBottom: "20px", alignSelf: "center" }}
          >
            {buttonTitle}
          </Button>
          <SearchBox people={people} setFilteredPeople={setFilteredPeople} />
        </Box>
        <Grid container spacing={2}>
          {filteredPeople.map((ele) => (
            <Grid item xs={12} key={ele.id}>
              <ProfileCard
                name={ele.name}
                profilePic={ele.image}
                email={ele.email}
                profession={ele.profession}
                contactNumber={ele.contactNumber}
                city={ele.city}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
