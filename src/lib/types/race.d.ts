export interface RaceRoot {
    race: Race
    todays_cls: TodaysCls
    distance: Distance
    dist_unit: DistUnit
    course_id: CourseId
    surface: Surface
    stkorclm: Stkorclm
    purse: Purse
    claimamt: Claimamt
    age_restr: AgeRestr
    bet_opt: BetOpt
    track: Track
    send_track: SendTrack
    raceord: Raceord
    partim: Partim
    dist_disp: DistDisp
    breed_type: BreedType
    post_time: PostTime
    race_date: RaceDate
    race_text: RaceText
    stk_clm_md: StkClmMd
    country: Country
    horsedata: Horsedaum[]
  }
  
  export interface Race {
    _text: string
  }
  
  export interface TodaysCls {
    _text: string
  }
  
  export interface Distance {
    _text: string
  }
  
  export interface DistUnit {
    _text: string
  }
  
  export interface CourseId {
    _text: string
  }
  
  export interface Surface {
    _text: string
  }
  
  export interface Stkorclm {
    _text: string
  }
  
  export interface Purse {
    _text: string
  }
  
  export interface Claimamt {
    _text: string
  }
  
  export interface AgeRestr {
    _text: string
  }
  
  export interface BetOpt {
    _text: string
  }
  
  export interface Track {
    _text: string
  }
  
  export interface SendTrack {
    _text: string
  }
  
  export interface Raceord {
    _text: string
  }
  
  export interface Partim {
    _text: string
  }
  
  export interface DistDisp {
    _text: string
  }
  
  export interface BreedType {
    _text: string
  }
  
  export interface PostTime {
    _text: string
  }
  
  export interface RaceDate {
    _text: string
  }
  
  export interface RaceText {
    _cdata: string
  }
  
  export interface StkClmMd {
    _text: string
  }
  
  export interface Country {
    _text: string
  }
  
  export interface Horsedaum {
    horse_name: HorseName
    owner_name: OwnerName
    program: Program
    pp: Pp
    weight: Weight
    sex: Sex
    med: Med
    equip: Equip
    morn_odds: MornOdds
    breeder: Breeder
    wh_foaled: WhFoaled
    ae_flag: AeFlag
    color: Color
    breed_type: BreedType2
    claimprice: Claimprice
    stats_data: StatsData
    sire: Sire
    dam: Dam
    jockey: Jockey
    trainer: Trainer
    workoutdata: Workoutdaum[]
    ppdata: any
  }
  
  export interface HorseName {
    _text: string
  }
  
  export interface OwnerName {
    _text: string
  }
  
  export interface Program {
    _text: string
  }
  
  export interface Pp {
    _text: string
  }
  
  export interface Weight {
    _text: string
  }
  
  export interface Sex {
    _text: string
  }
  
  export interface Med {
    _text?: string
  }
  
  export interface Equip {
    _text?: string
  }
  
  export interface MornOdds {
    _text: string
  }
  
  export interface Breeder {
    _text: string
  }
  
  export interface WhFoaled {
    _text: string
  }
  
  export interface AeFlag {
    _text?: string
  }
  
  export interface Color {
    _text: string
  }
  
  export interface BreedType2 {
    _text: string
  }
  
  export interface Claimprice {
    _text: string
  }
  
  export interface StatsData {
    stat: Stat[]
  }
  
  export interface Stat {
    _attributes: Attributes
    starts: Starts
    wins: Wins
    places: Places
    shows: Shows
    earnings: Earnings
    paid: Paid
    roi: Roi
  }
  
  export interface Attributes {
    type: string
  }
  
  export interface Starts {
    _text: string
  }
  
  export interface Wins {
    _text: string
  }
  
  export interface Places {
    _text: string
  }
  
  export interface Shows {
    _text: string
  }
  
  export interface Earnings {
    _text: string
  }
  
  export interface Paid {
    _text: string
  }
  
  export interface Roi {
    _text?: string
  }
  
  export interface Sire {
    sirename: Sirename
    tmmark: Tmmark
    stud_fee: StudFee
  }
  
  export interface Sirename {
    _text: string
  }
  
  export interface Tmmark {
    _text?: string
  }
  
  export interface StudFee {
    _text: string
  }
  
  export interface Dam {
    damname: Damname
    damsire: Damsire
  }
  
  export interface Damname {
    _text: string
  }
  
  export interface Damsire {
    _text: string
  }
  
  export interface Jockey {
    stat_breed: StatBreed
    jock_disp: JockDisp
    stats_data: StatsData2
  }
  
  export interface StatBreed {
    _text: string
  }
  
  export interface JockDisp {
    _text: string
  }
  
  export interface StatsData2 {
    stat: Stat2
  }
  
  export interface Stat2 {
    _attributes: Attributes2
    starts: Starts2
    wins: Wins2
    places: Places2
    shows: Shows2
    earnings: Earnings2
    paid: Paid2
    roi: Roi2
  }
  
  export interface Attributes2 {
    type: string
  }
  
  export interface Starts2 {
    _text: string
  }
  
  export interface Wins2 {
    _text: string
  }
  
  export interface Places2 {
    _text: string
  }
  
  export interface Shows2 {
    _text: string
  }
  
  export interface Earnings2 {}
  
  export interface Paid2 {
    _text: string
  }
  
  export interface Roi2 {
    _text?: string
  }
  
  export interface Trainer {
    stat_breed: StatBreed2
    tran_disp: TranDisp
    stats_data: StatsData3
  }
  
  export interface StatBreed2 {
    _text: string
  }
  
  export interface TranDisp {
    _text: string
  }
  
  export interface StatsData3 {
    stat: Stat3
  }
  
  export interface Stat3 {
    _attributes: Attributes3
    starts: Starts3
    wins: Wins3
    places: Places3
    shows: Shows3
    earnings: Earnings3
    paid: Paid3
    roi: Roi3
  }
  
  export interface Attributes3 {
    type: string
  }
  
  export interface Starts3 {
    _text: string
  }
  
  export interface Wins3 {
    _text: string
  }
  
  export interface Places3 {
    _text: string
  }
  
  export interface Shows3 {
    _text: string
  }
  
  export interface Earnings3 {}
  
  export interface Paid3 {
    _text: string
  }
  
  export interface Roi3 {
    _text: string
  }
  
  export interface Workoutdaum {
    worknum: Worknum
    days_back: DaysBack
    worktext: Worktext
    ranking: Ranking
    rank_group: RankGroup
  }
  
  export interface Worknum {
    _text: string
  }
  
  export interface DaysBack {
    _text: string
  }
  
  export interface Worktext {
    _text: string
  }
  
  export interface Ranking {
    _text: string
  }
  
  export interface RankGroup {
    _text: string
  }
  