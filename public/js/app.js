console.log('in JS file')

const gameForm = document.querySelector('form')
const gameIDQuery = document.querySelector('input')
const homeTeam = document.querySelector('#homeName')
const awayTeam = document.querySelector('#awayName')
const hgoals = document.querySelector('#hgoals')
const agoals = document.querySelector('#agoals')
const hballPoss = document.querySelector('#hballPoss')
const aballPoss = document.querySelector('#aballPoss')
const hattempts = document.querySelector('#hattempts')
const aattempts = document.querySelector('#aattempts')
const honTarget = document.querySelector('#honTarget')
const aonTarget = document.querySelector('#aonTarget')
const hcorner = document.querySelector('#hcorner')
const acorner = document.querySelector('#acorner')
const hoffside = document.querySelector('#hoffside')
const aoffside = document.querySelector('#aoffside')
const hfoul = document.querySelector('#hfoul')
const afoul = document.querySelector('#afoul')
const hyellow = document.querySelector('#hyellow')
const ayellow = document.querySelector('#ayellow')
const hred = document.querySelector('#hred')
const ared = document.querySelector('#ared')
const hpass = document.querySelector('#hpass')
const apass = document.querySelector('#apass')
const hkeypass = document.querySelector('#hkeypass')
const akeypass = document.querySelector('#akeypass')
const hattackpass = document.querySelector('#hattackpass')
const aattackpass = document.querySelector('#aattackpass')
const awayTeamLogo = document.querySelector('#awayTeamLogo')
const homeTeamLogo = document.querySelector('#homeTeamLogo')

homeTeam.textContent = 'מארחת'
awayTeam.textContent = 'אורחת'
agoals.textContent = '-'
hgoals.textContent = '-'
hballPoss.textContent = '-%'
aballPoss.textContent = '-%'
aattempts.textContent = '-'
hattempts.textContent = '-'
aonTarget.textContent = '-'
honTarget.textContent = '-'
acorner.textContent = '-'
hcorner.textContent = '-'
aoffside.textContent = '-'
hoffside.textContent = '-'
afoul.textContent = '-'
hfoul.textContent = '-'
ayellow.textContent = '-'
hyellow.textContent = '-'
ared.textContent = '-'
hred.textContent = '-'
apass.textContent = '-/-'
hpass.textContent = '-/-'
akeypass.textContent = '-/-'
hkeypass.textContent = '-/-'
aattackpass.textContent = '-'
hattackpass.textContent = '-'
aairchallenge.textContent = '-/-'
hairchallenge.textContent = '-/-'
agroundchallenge.textContent = '-/-'
hgroundchallenge.textContent = '-/-'

const loop = false;
var gameID = ""

gameForm.addEventListener('submit', (e) => {
    e.preventDefault()


    gameID = gameIDQuery.value;


    console.log(gameID);
    ReadLiveStats();

    setInterval(ReadLiveStats, 5000);

})



const ReadLiveStats = async function () {

    try {
        let ts = Math.floor(Date.now() / 1000 / 10);
        console.log("time: " + ts);
        fetch('https://cdnapi.bamboo-video.com/api/football/fastdata/' + gameID + '?format=json&iid=573881b7181f46ae4c8b4567&tvStats=true&timestamp=' + ts).then((response) => {//MATCH_INSTAT_ID
            response.json().then((data) => {

                if (data.error) {
                    console.log('Error in JSON');
                } else {
                    setValues(homeTeam,data.data.homeTeam.hebrewName)
                    setValues(awayTeam,data.data.awayTeam.hebrewName)
                    setImgSRC(homeTeamLogo, data.data.homeTeam.logoUrl)
                    setImgSRC(awayTeamLogo, data.data.awayTeam.logoUrl)
                }

                //*********Goals */
                setValues(hgoals,data.data.gameStatsHome.GoalRegular)
                setValues(agoals,data.data.gameStatsAway.GoalRegular)
                
                //*********Ball Possession */

                const homeposs = Math.round((data.data.ballTimeHome) * 100 / (data.data.ballTimeHome + data.data.ballTimeAway))
                hballPoss.textContent = homeposs + '%'
                aballPoss.textContent = (100 - homeposs) + '%'

                //*********attempts on goal */
                setValues(hattempts,data.data.gameStatsHome.AttemptonGoal)
                setValues(aattempts,data.data.gameStatsAway.AttemptonGoal)
               
                //*********attempts on target */
                setValues(honTarget, data.data.gameStatsHome.OnTarget)
                setValues(aonTarget,data.data.gameStatsAway.OnTarget)
          
                //*********Corners */
                setValues(hcorner,data.data.gameStatsHome.Corner)
                setValues(acorner,data.data.gameStatsAway.Corner)

                //*********Offsides */
                
                setValues(hoffside,data.data.gameStatsHome.Offside)
                setValues(aoffside,data.data.gameStatsAway.Offside)

                //*********Fouls */
                setValues(hfoul,data.data.gameStatsHome.foul)
                setValues(afoul,data.data.gameStatsAway.foul)

                //*********Yellow Cards */
                setValues(hyellow,data.data.gameStatsHome.YellowCard)
                setValues(ayellow,data.data.gameStatsAway.YellowCard)

                //*********Red Cards */
                setValues(hred,data.data.gameStatsHome.RedCard)
                setValues(ared,data.data.gameStatsAway.RedCard)

                //*********Passes */
                setDoubleValues(hpass, data.data.gameStatsHome.accuratePasses, data.data.gameStatsHome.passes)
                setDoubleValues(apass, data.data.gameStatsAway.accuratePasses, data.data.gameStatsAway.passes)

                //*********Key Passes */
                setDoubleValues(hkeypass,data.data.gameStatsHome.accurateKeyPasses,data.data.gameStatsHome.keyPasses)
                setDoubleValues(akeypass,data.data.gameStatsAway.accurateKeyPasses,data.data.gameStatsAway.keyPasses)

                //*********attacking Passes */
                setValues(hattackpass,data.data.gameStatsHome.attackingPasses)
                setValues(aattackpass,data.data.gameStatsAway.attackingPasses)

                //*********air challenges */
                setDoubleValues(hairchallenge,data.data.gameStatsHome.wonAirChallenge,data.data.gameStatsHome.airChallenge)
                setDoubleValues(aairchallenge,data.data.gameStatsAway.wonAirChallenge,data.data.gameStatsAway.airChallenge)

                //*********ground challenges */
                setDoubleValues(hgroundchallenge,data.data.gameStatsHome.wonGroundChallenge,data.data.gameStatsHome.groundChallenge)
                setDoubleValues(agroundchallenge,data.data.gameStatsAway.wonGroundChallenge,data.data.gameStatsAway.groundChallenge)

                
            })


        })
    } catch (e) {
        console.log(e.message)
    }

}

const setValues = function (_fieldStat, statVal) {
    //console.log('value: ' + statVal);
    if (statVal) {
        _fieldStat.textContent = statVal;
    } else {_fieldStat.textContent = 0;}
}

const setImgSRC = function (elem, imgSRC) {
    if(elem && elem.src && imgSRC)
        elem.src = imgSRC;
}

const setDoubleValues = function (_fieldStat, statValA, statValB) {
    //console.log('value: ' + statValA + ' value: ' + statValB);
    if (statValB) {
        _fieldStat.textContent = statValA + '/' + statValB;
    } else {_fieldStat.textContent = '0/0';}

}