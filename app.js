const searchText = () => {
    const searchText = document.getElementById('input-feild').value;
    document.getElementById('input-feild').value = '';
    const url = `https://api.lyrics.ovh/suggest/${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayShow(data.data))
}

const displayShow = songs => {
    const songsDiv = document.getElementById('song-container');
    songsDiv.innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";

        songDiv.innerHTML = `
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
            </audio> 

            <div class="col-md-3 text-md-right text-center ml-auto">
                <button onclick="getLirics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songsDiv.appendChild(songDiv);
    });
}

const getLirics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDisplayLyrics(data.lyrics))
}

const showDisplayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById('lyrics-div');
    lyricsDiv.innerText = lyrics;
}