const songs = [

];

let current = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const playBtn = document.getElementById('playBtn');
const playlist = document.getElementById('playlist');

function loadSong(index) {
  const song = songs[index];
  audio.src = `music/${song.name}`;
  title.textContent = song.title;
  audio.play();
  playBtn.textContent = '⏸️';
}

function nextSong() {
  current = (current + 1) % songs.length;
  loadSong(current);
}
function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
}

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playBtn.textContent = '▶️';
  }
});

// Playlist display
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = song.title;
  li.onclick = () => {
    current = index;
    loadSong(index);
  };
  playlist.appendChild(li);
});

// Upload
document.getElementById('upload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    songs.push({ name: url, title: file.name });
    const li = document.createElement('li');
    li.textContent = file.name;
    li.onclick = () => {
      current = songs.length - 1;
      audio.src = url;
      title.textContent = file.name;
      audio.play();
      playBtn.textContent = '⏸️';
    };
    playlist.appendChild(li);

    showToast("✅ Song uploaded!");
  }
});

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2000);
}


document.getElementById('upload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const titleText = file.name.replace(/\.[^/.]+$/, ""); // remove extension

    // Generate local cover image
    const coverUrl = generateLocalCover(titleText);

    songs.push({ name: url, title: titleText, cover: coverUrl });

    const li = document.createElement('li');
    li.textContent = titleText;
    li.onclick = () => {
      current = songs.length - 1;
      audio.src = url;
      title.textContent = titleText;
      document.getElementById("cover").src = coverUrl;
      audio.play();
      playBtn.textContent = '⏸️';
    };
    playlist.appendChild(li);

    showToast("✅ Song uploaded!");
  }
});

function generateLocalCover(title) {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');

  // Random background
  const bgColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Song title initials
  const initials = title.slice(0, 2).toUpperCase();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL('image/png');
}
