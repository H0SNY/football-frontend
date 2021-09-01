import axios from "axios";

//backend domain
const root = process.env.REACT_APP_BACKEND || `http://h0sny.us-east-2.elasticbeanstalk.com`;

//function to get all leagues info
export async function getAllLeagues(){
  try{
    
    const res = await axios.get(`${root}/league/all`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.leagues;
  }catch(err){
     console.error( err.message , ` getFootball/getAllLeagues`);
     return null;
    }
  }
  
  export async function getLeague(id){
    try{
        const res = await axios.get(`${root}/league?leagueID=${id}`);
        if(res.data.err) throw new Error(res.data.err);
        return res.data.league;
    }catch(err){
      console.error(err.message ,` getFootball/getLeague`);
      return null;
  }
}

export async function getLeagueStandings(id){
  try{
      const res = await axios.get(`${root}/standing?leagueID=${id}`);
      if(res.data.err)throw new Error(res.data.err);
      return  res.data.standings;
  }catch(err){
         console.error(`${err.message} getFootball/getLeagueStandings`)
         return null;
  }
}

export async function getLeagueMatches(id){
  try{
        const res = await axios.get(`${root}/match?leagueID=${id}`);
      if(res.data.err)throw new Error(res.data.err);
        return res.data.matches;
  }catch(err){
        console.error(`${err.message} getFootball/getLeagueMatches`)
        return null;
  }
}

export async function getLeagueScorers(id){
try{
        const res = await axios.get(`${root}/scorers?leagueID=${id}`);
        if(res.data.err) throw new Error(res.data.err);
        return res.data.scorers;
}catch(err){
     console.error(`${err.message} getFootball/getLeagueScorers`)
    return null;
}
}


export async function getTeam(teamID){
  try{
    const res = await axios.get(`${root}/team?teamID=${teamID}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.team;
  }catch(err){
         console.error( err.message, 'getFootball/getTeam');
          return null;
  }
}

export async function getMatchesByMatchday(leagueID , matchday){
  try{
    const res = await axios.get(`${root}/match/matchday?leagueID=${leagueID}&matchday=${matchday}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches;
  }catch(err){
    console.error( err.message, 'getFootball/getMatchesByMatchDay');
    return null;
  }
}

export async function getMatchesByStage(leagueID , stage){
  try{
    const res = await axios.get(`${root}/match/stage?leagueID=${leagueID}&stage=${stage}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches;
  }catch(err){
    console.error( err.message, 'getFootball/getMatchesByStage');
    return null;
  }
}

export async function getMatchesByDate(date){
  try{
    const res = await axios.get(`${root}/match/date?date=${date}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches;
  }catch(err){
    console.error( err.message, 'getFootball/getTotalMatchdays');
    return null;
  }
}

export async function getCurrentMatchday(id){
  try{
    const res = await axios.get(`${root}/league?leagueID=${id}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.league?.currentSeason?.currentMatchday;
  }catch(err){
    console.error( err.message, 'getFootball/getTotalMatchdays');
    return null;
  }
}

export async function getTotalMatchdays(id){
  try{
    const res = await axios.get(`${root}/match?leagueID=${id}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches[res.data.matches.length - 1].matchday;
  }catch(err){
    console.error( err.message, 'getFootball/getTotalMatchdays');
    return null;
  }
}

export async function getTotalStages(id){
  try{
    const res = await axios.get(`${root}/match?leagueID=${id}`);
    if(res.data.err) throw new Error(res.data.err);
    const arr = [];
    for(const league of res.data.matches){
      if(arr.includes(league.stage)) continue;
      else arr.push(league.stage);
    }
    return arr;
  }catch(err){
    console.error( err.message, 'getFootball/getTotalMatchdays');
    return null;
  }
}

export async function isCompetition(id){
  try{
    const res = await axios.get(`${root}/match?leagueID=${id}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches[0]?.stage === "REGULAR_SEASON" ? false : true;
  }catch(err){
    console.error( err.message, 'getFootball/getTotalMatchdays');
    return null;
  }
}


export async function getTeamImg(teamID){
  try{
    const res = await axios.get(`${root}/team?teamID=${teamID}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.team?.crestUrl;
  }catch(err){
    console.error( err.message, 'getFootball/getteamImg');
    return null;
  }
}

export async function getTeamMatches(teamID){
  try{
    const res = await axios.get(`${root}/match/team?teamID=${teamID}`);
    if(res.data.err) throw new Error(res.data.err);
    return res.data.matches;
  }catch(err){
    console.error( err.message, 'getFootball/getteammatches');
    return null;
  }
}