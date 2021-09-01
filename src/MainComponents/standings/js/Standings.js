import "../../../MainHelper.css";
import classes from "../css/Standings.module.css";
import { Message, Standing, Pagination } from "../../index";
function Standings({
  leagueType ,
  standings,
  page,
  onNext,
  onPrev,
  leagueID,
  loading,
  err,
}) {


  function nextHandler() {
    onNext();
  }

  function prevHandler() {
    onPrev();
  }

  function standingToJSX(standing) {
    if (!standing || !standing?.group === "FINAL_STAGE") return null;
    return (
      <Standing
        leagueID={leagueID}
        key={standing?.team?.id}
        standing={standing}
        loading = {loading}
      />
    );
  }

  function standingsToJSX(standings) {
    if (!standings) return null;
    return standings.map(standingToJSX);
  }

  

  let desc =( (!loading && !err) || (standings[0]?.length) ) && (
    <div
      className={`container ${standings[0] && "slideIn"} ${classes.descRoot}`}
    >
      <div className={`col-4 `} />

      <div className={`container col-6 ${classes.info}`}>
        <div className="col-3">
          <p>P</p>
        </div>

        <div className="col-3">
          <p>W</p>
        </div>

        <div className="col-3">
          <p>D</p>
        </div>

        <div className="col-3">
          <p>L</p>
        </div>
      </div>
    </div>
  );
  desc = !standings[0]?.table ? <div className = {classes.nogroups}><p>Groups Not Determined Yet</p></div> : desc;
  return (
    <div className={`${classes.root}`}>
      {leagueType === 'c' && <div className = {classes.group}><p>{standings[page - 1]?.group?.split('_').join(' ')}</p></div>}
      {desc}

      <div className={`${classes.standingsRoot}`}>
        <div className={standings[page - 1] && "fadeIn"}>
          {standingsToJSX(standings[page - 1]?.table)}
        </div>
        {err && <Message msg={err} />}
        {loading && <Message loading msg="retrieving data" />}
      </div>
      <div className = {`${classes.pagination} ${( standings?.length < 2)  && 'hide'}`}>
        <Pagination disabled = {err || loading} onNext={nextHandler} onPrev={prevHandler} page={page} />
      </div>
    </div>
  );
}

export default Standings;
