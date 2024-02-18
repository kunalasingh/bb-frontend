"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Ensure correct import path for `Grid
import {  CardContent,  Avatar, Box } from '@mui/material';

function ProfileCard({ name, profilePic, email, profession, contactNumber }) {
  return (
    <Card sx={{ 
        maxWidth: 345, 
        background: 'linear-gradient(145deg, #6e48aa, #9d50bb)', 
        borderRadius: '20px', 
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' 
      }}>
      <CardContent sx={{ textAlign: 'center', color: '#FFFFFF' }}>
        <Avatar
          alt={name}
          src={profilePic}
          sx={{ width: 56, height: 56, margin: '0 auto 10px' }}
        />
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {profession}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
          {email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
          {contactNumber}
        </Typography>
      </CardContent>
    </Card>
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

  // UseEffect to load data initially
  useEffect(() => {
    getData();
  }, []);

  const onClickHandler = (e) => {
    e.preventDefault();
    getData();
  }

  return (
    <Container>
      <Button variant="contained" onClick={onClickHandler}>{buttonTitle}</Button>
      
      <Grid container spacing={2}>
        {people.map((ele) => (
          <Grid tem xs={12} key={ele.id}>
            <ProfileCard
        name={ele.name}
        profilePic={ele.image}
        email={ele.email}
        profession={ele.profession}
        contactNumber={ele.contac}
      />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
