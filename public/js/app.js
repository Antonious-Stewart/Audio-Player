const song = new Audio();
// tracklist
const tracks = [
  {
    name:'Talk',
    length:song.duration / 60,
    artist:"Khalid",
    year:2019,
    file:"../../audio/Khalid - Talk (Lyrics).mp3"
  },
  {
    name:'Middle Child',
    length:song.duration / 60,
    artist:"J.Cole",
    year:2019,
    file:"../../audio/J. Cole - Middle Child (Clean).mp3"
  },
  {
    name:'Wow',
    length:song.duration / 60,
    artist:"Post Malone",
    year:2019,
    file:"../../audio/Post Malone - Wow. [Clean Version] - Clean Muzic.mp3"
  },
  {
    name:'Girls Like You ft. Cardi B',
    length:song.duration / 60 ,
    artist:"Maroon 5",
    year:2019,
    file:"../../audio/Maroon 5 - Girls Like You (Clean - Lyrics) ft. Cardi B.mp3"
  },
  {
    name:'Goin\' Bad ft.Drake',
    length:song.currentTime / 60,
    artist:"Meek Mill",
    year:2019,
    file:"../../audio/Meek Mil - Going Bad (Clean) ft. Drake.mp3"
  },{
    name:'Undecided',
    length:'0:00',
    artist:"Chris Brown",
    year:2019,
    file:"../../audio/Chris Brown - Undecided (Official Lyrics).mp3"
  },{
    name:'Happier ft Bastille',
    length:'0:00',
    artist:"Marshmello",
    year:2019,
    file:"../../audio/Marshmello ft. Bastille - Happier (Official Music Video).mp3"
  },{
    name:'Alot ft J.Cole',
    length:'0:00',
    artist:"21 Savage",
    year:2019,
    file:"../../audio/21 Savage - a lot (Clean).mp3"
  },{
    name:'7 Years',
    length:'0:00',
    artist:"Lucas Graham",
    year:2019,
    file:"../../audio/Lukas Graham -  7 Years [OFFICIAL MUSIC VIDEO].mp3"
  }
]

// DOM Elements
const trackList = document.querySelector('#mediaTrackList');
const shuffle = document.querySelector("#shuffleButton");
const loop = document.querySelector('#loopButton');
const playButton = document.querySelector("#play")
const reverseButton = document.querySelector("#reverse")
const forwardButton = document.querySelector("#forward");
const fillBar = document.querySelector('#fill');
const handle = document.querySelector('#handle');
let display = document.querySelector("#nowPlaying");

let currentSong = 0;
let repeat; // repeat flag
let random; // shuffle flag

// Play song
const playSong = ()=>{
  if(!random){
    song.src= tracks[currentSong].file;
    display.textContent=`${tracks[currentSong].name} - ${tracks[currentSong].artist}`;
    song.play();
  } else{
    currentSong= rng();
    song.src=tracks[currentSong].file;
    display.textContent=`${tracks[currentSong].name} - ${tracks[currentSong].artist}`;
    song.load();
    song.play();
  }
  
}
// On song end play next track
song.addEventListener('ended',()=>{
  next();
})
// on window load autoplay and populate tracklist
window.onload = ()=>{
  playSong();
  tracks.forEach( track =>{
    let addSong = document.createElement('li');
    addSong.textContent = `${track.name} - ${track.artist}`;
    addSong.classList.add("track");
    if(display.textContent === addSong.textContent){
      addSong.classList.add('playingTrack');
    } else{
      addSong.classList.remove('playingTrack');
    }
    trackList.appendChild(addSong);
  })
}
//UX for current track being played
const nowPlaying = ()=>{
  let track = document.querySelectorAll('li');
  track.forEach( t =>{
    if(t.textContent === display.textContent){
      t.classList.add('playingTrack');
    } else{
      t.classList.remove("playingTrack")
    }
  })
}
// Change icon between play and pause
const playAndPause = ()=>{
  if(song.paused){
    song.play();
    playButton.innerHTML=`<i class="fas fa-pause"></i>`;
    playButton.classList.add('play');
  } else {
    song.pause();
    playButton.innerHTML=`<i class="fas fa-play"></i>`;
    playButton.classList.remove('play');
  }
  // when time changes update fillbar and handle
  song.addEventListener('timeupdate',()=>{
    let position = song.currentTime / song.duration; // current time in secs / songs duration
    fillBar.style.width = `${position * 100}%`; // increase fillbar
    handle.style.left = `${position * 100}%`; //move handle
  })
}
playAndPause();
// Play next song
const next = ()=>{
  if(!random){
    if(currentSong === tracks.length - 1 && !repeat){
      return;
    } else if(currentSong === tracks.length - 1 && repeat){
      currentSong = 0;
      song.load();
      playSong();
      nowPlaying();
    }else{
      currentSong++;
      song.load();
      playSong();
      nowPlaying();
    }
  } else{
    currentSong = rng();
    song.src = tracks[currentSong].file;
    song.load();
    playSong();
    nowPlaying();
  }
  
}
//play previous song
const prev = () =>{
  if(!random){
    if(currentSong === 0 && !repeat){
      return;
    } else if(currentSong === 0 && repeat){
      currentSong = 9;
      currentSong--;
      song.load();
      playSong();
      nowPlaying();
    }else{
      currentSong--;
      song.load();
      playSong();
      nowPlaying();
    }
  } else{
    currentSong = rng();
    song.src = tracks[currentSong].file;
    song.load();
    playSong();
    nowPlaying();
  }
}
// generate random numbers between 0 and 9
const rng = ()=> Math.floor(Math.random() * 9);
//shuffle
shuffle.addEventListener('click',(evt)=>{
  evt.target.classList.toggle('on');
  if(!random){
    random = true;
  } else {
    random = false;
  }
})
//turn loop all songs on 
loop.addEventListener('click',(evt)=>{
  evt.target.classList.toggle('on');
  if(!repeat){
    repeat = true;
  } else {
    repeat = false;
  }
})