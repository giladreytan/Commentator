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

homeTeam.textContent = 'מארחת'
awayTeam.textContent = 'אורחת'
agoals.textContent = '9'
hgoals.textContent = '8'
hballPoss.textContent = '40%'
aballPoss.textContent = '60%'
aattempts.textContent = '7'
hattempts.textContent = '6'
aonTarget.textContent = '5'
honTarget.textContent = '4'
acorner.textContent = '3'
hcorner.textContent = '2'
aoffside.textContent = '1'
hoffside.textContent = '0'
afoul.textContent = '11'
hfoul.textContent = '10'
ayellow.textContent = '13'
hyellow.textContent = '12'
ared.textContent = '15'
hred.textContent = '14'

const loop = false;
var gameID = ""

gameForm.addEventListener('submit', (e) => {
    e.preventDefault()


    gameID = gameIDQuery.value;


    console.log(gameID)

    setInterval(ReadLiveStats, 3000)

})



const ReadLiveStats = async function ()  {
    
    try{
    fetch('http://football.bamboo-video.com/api/football/fastdata/' + gameID + '?format=json&tvStats=true ').then((response) => {//MATCH_INSTAT_ID
        response.json().then((data) => {
            
            if (data.error) {
                console.log('Error in JSON')
            } else {
                homeTeam.textContent = data.data.homeTeam.hebrewName
                awayTeam.textContent = data.data.awayTeam.hebrewName
            }
            
            //*********Goals */
            if (data.data.gameStatsHome.GoalRegular) {
                
                hgoals.textContent = data.data.gameStatsHome.GoalRegular
            } else {
                hgoals.textContent = 0
            }
            
            if (data.data.gameStatsAway.GoalRegular) {
                agoals.textContent = data.data.gameStatsAway.GoalRegular
            } else {
                agoals.textContent = 0
            }
            
            //*********Ball Possession */

            const homeposs = Math.round((data.data.ballTimeHome) * 100 / (data.data.ballTimeHome + data.data.ballTimeAway))
            hballPoss.textContent = homeposs + '%'
            aballPoss.textContent = (100 - homeposs) + '%'
            
            //*********attempts on goal */
            if (data.data.gameStatsHome.AttemptonGoal) {
                hattempts.textContent = data.data.gameStatsHome.AttemptonGoal
            } else {
                hattempts.textContent = 0
            }
            
            if (data.data.gameStatsAway.AttemptonGoal) {
                aattempts.textContent = data.data.gameStatsAway.AttemptonGoal
            } else {
                aattempts.textContent = 0
            }
            
            //*********attempts on target */
            if (data.data.gameStatsHome.OnTarget) {
                honTarget.textContent = data.data.gameStatsHome.OnTarget
            } else {
                honTarget.textContent = 0
            }
            
            if (data.data.gameStatsAway.OnTarget) {
                aonTarget.textContent = data.data.gameStatsAway.OnTarget
            } else {
                aonTarget.textContent = 0
            }
           
            //*********Corners */
            if (data.data.gameStatsHome.Corner) {
                hcorner.textContent = data.data.gameStatsHome.Corner
            } else {
                hcorner.textContent = 0
            }
            
            if (data.data.gameStatsAway.Corner) {
                acorner.textContent = data.data.gameStatsAway.Corner
            } else {
                acorner.textContent = 0
            }
            
            //*********Offsides */
            if (data.data.gameStatsHome.Offside) {
                hoffside.textContent = data.data.gameStatsHome.Offside
            } else {
                hoffside.textContent = 0
            }
            
            if (data.data.gameStatsAway.Offside) {
                aoffside.textContent = data.data.gameStatsAway.Offside
            } else {
                aoffside.textContent = 0
            }
            
            //*********Fouls */
            if (data.data.gameStatsHome.foul) {
                hfoul.textContent = data.data.gameStatsHome.foul
            } else {
                hfoul.textContent = 0
            }
            
            if (data.data.gameStatsAway.foul) {
                afoul.textContent = data.data.gameStatsAway.foul
            } else {
                afoul.textContent = 0
            }
            
            //*********Yellow Cards */
            if (data.data.gameStatsHome.YellowCard) {
                hyellow.textContent = data.data.gameStatsHome.YellowCard
            } else {
                hyellow.textContent = 0
            }

            if (data.data.gameStatsAway.YellowCard) {
                ayellow.textContent = data.data.gameStatsAway.YellowCard
            } else {
                ayellow.textContent = 0
            }

            //*********Red Cards */
            if (data.data.gameStatsHome.RedCard) {
                hred.textContent = data.data.gameStatsHome.RedCard
            } else {
                hred.textContent = 0
            }
            if (data.data.gameStatsAway.RedCard) {
                ared.textContent = data.data.gameStatsAway.RedCard
            } else {
                ared.textContent = 0
            }
            //console.log(data.data.gameStatsHome.GoalRegular,homeposs,data.data.gameStatsHome.AttemptonGoal,data.data.gameStatsHome.OnTarget,data.data.gameStatsHome.Corner,data.data.gameStatsHome.Offside,data.data.gameStatsHome.foul,data.data.gameStatsHome.YellowCard,data.data.gameStatsHome.RedCard)
        })
        

    })
}catch(e){
    console.log(e.message)
}

}
