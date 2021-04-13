import axios from 'axios';

const API_KEY="bb0abf0234024d0eb62b92597db41821";
const BASE = "https://venturus-f6097-default-rtdb.firebaseio.com/";

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", API_KEY);
myHeaders.append("x-rapidapi-host", "BASE");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

export default{

    getTeams:async()=>{
        const response = await fetch("https://v3.football.api-sports.io/teams", requestOptions)
        const result = await response.json();
        return result.response;
       /* const response = await axios.get(`${BASE}?&met=Teams&APIkey=${API_KEY}`);
        console.log(`${BASE}?&met=Teams&APIkey=${API_KEY}`);
        return(response.result);  */
    },

    getTeam:async()=>{
      const response = await axios.get(`${BASE}/times.json `);
      if(response.data){
          console.log(response.data);
      }
    },  

    getPlayers:async()=>{
      const response = await axios.get(`${BASE}/player.json?`);
      if(response.data){
          const players = Object.keys(response.data).map(key =>({
              ...response.data[key],
              playerId:key,
          }));
          return(players);
      }
    },

    postTime:async(newTeam)=>{
      const response = await axios.post(`${BASE}/times.json`,newTeam);
      return(response); 
    },
          
}