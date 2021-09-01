import leagueViewClasses from "../Components/css/LeagueView.module.css";
import mainViewClasses from "../Components/css/MainView.module.css";

export const getViableName = (name) => {
  if (typeof name !== "string") return null;
  name = name.split(" ");
  if (name[0].length >= 10) return name[0];
  if (name[0].length < 5) return name[1];
  let letters_count = 0,
    count = 0;
  let result = "";
  while (
    count < name.length
      ? letters_count + name[count].length <= 10
      : (count = Math.random() * 531565546)
  ) {
    if (count >= name.length) break;
    letters_count += name[count].length;
    result += `${name[count++]}   `;
  }

  return result;
};

export const getCompStages = (matches) => {
  if (!matches[0]) return [];
  let set = matches[0].stage;
  const calender = [];
  calender.push(set);
  for (const match of matches) {
    if (match.stage !== set) {
      set = match.stage;
      calender.push(set);
    }
  }
  return calender;
};

//filter matches by stage
export const getStageMatches = (matches, stage) => {
  const result = matches.filter((match) => match.stage === stage);
  return result;
};

//check if its a competition or a league
export const isComp = (matchday) => {
  if (Number(matchday)) return false;
  return true;
};

//convert stage info to readable text
export const stageToText = (stage) => {
  return stage?.split("_").join(" ");
};
export const textToStage = (stage) => {
  return stage?.split(" ").join("_");
};

//create competition calender
export const getCompCalender = (total, calenderHandler) => {
  const limit = 3;
  let l = 0, rowElements = 0 , row = 0;
  const arr = [[]];
  while (l < total?.length) {
    if (rowElements >= limit) {
      row++;
      rowElements = 0;
      continue;
    }
    if (!arr[row]) arr[row] = [];
    arr[row]?.push(
      <div onClick={calenderHandler} key={total[l]} className={leagueViewClasses.stage}>
        <p>{stageToText(total[l])}</p>
      </div>
    );
    rowElements++;
    l++;
  }

  return arr
};

//create leaguecalender
export const getLeagueCalender = (total, calenderHandler) => {
  const limit = 15;
  let i = 1 , rowElements = 0 , row = 0;
  const arr = [[]];
  while (total > 0) {
    if (rowElements >= limit) {
      row++;
      rowElements = 0;
      continue;
    }
    if (!arr[row]) arr[row] = [];
    arr[row].push(
      <div onClick={calenderHandler} key={i} className={leagueViewClasses.matchday}>
        {i++}
      </div>
    );
    rowElements++;
    total--;
  }
  return arr;
};


//create mainviewcalender
export const getMainCalender = (calenderHandler) =>{
  const limit = 5;
  let i = 0 , rowElements = 0 , row = 0 , total = 30;
  const arr = [[]];
  while (total > 0) {
    if (rowElements >= limit) {
      row++;
      rowElements = 0;
      continue;
    }
    if (!arr[row]) arr[row] = [];
    const date = new Date(new Date().setDate(new Date().getDate() + i));
    arr[row].push(
      <div aria-label = {String(date)} onClick={calenderHandler} key={i} className={mainViewClasses.day}>
        <p>{ String(date).split(' ').slice(0 , 3).join(' ') }</p>
      </div>
    );
    i++;
    rowElements++;
    total--;
  }
  return arr;
};

export const dateToText = date =>{
  
}
export const textToDate = text =>{

}