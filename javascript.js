const videos = [];

        fetch('songs.json')
            .then(response => response.json())
            .then(data => {
                videos.push(...data);
                loadVideo();
            })
            .catch(error => console.error('Error cargando las canciones:', error));


    let currentVideoIndex = 0;
    let score = 0;
    const videoPlayer = document.getElementById('videoPlayer');
    const optionsContainer = document.getElementById('optionsContainer');
    const scoreElement = document.getElementById('score');
    const endScreen = document.getElementById('endScreen');
    const finalScore = document.getElementById('finalScore');

    // Crear control de volumen
    const volumeControl = document.createElement('div');
    volumeControl.className = 'volume-control';
    volumeControl.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUgOS42NzR2LjMyN2wtLjYyNC0uMTg2LS4zNzYuMTI1VjkuMDY4bC40MzIuMTQ0TDE1IDkuNjc0ek0xNiAxNWE0IDQgMCAwIDAgNC00aC0xLjM5MmwtLjU5My0uNDg0LS4yNjMtLjIxNUgxNnY0Ljc5OXpNMTYgNS44NTRsLjg0My0uNTQ4IDMuMzgxIDUuMjA3TDMyIDEybC05LjE3NiA2LjY5NCAzLjM4MSA1LjIwNy0uODQzLS41NDhMMTggMTJ6TTAgM3YxOGg2bDkgN1YxNEw2IDEwVjNMMTUgMGw5IDd2MTBoLTJWN2wtNy01djEybC03LTVoNFY1TDcgOGg0VjNIMHoiLz48L3N2Zz4=" class="volume-icon">';
    
    volumeControl.onclick = () => {
        videoPlayer.muted = !videoPlayer.muted;
        volumeControl.querySelector('img').style.opacity = videoPlayer.muted ? '0.5' : '1';
    };
    document.querySelector('.video-container').appendChild(volumeControl);

    function loadVideo() {
        const currentVideo = videos[currentVideoIndex];
        videoPlayer.src = currentVideo.file;
        videoPlayer.muted = false;
        
        optionsContainer.innerHTML = '';
        
        currentVideo.options.sort(() => Math.random() - 0.5).forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn fade-in';
            button.textContent = option;
            button.onclick = () => checkAnswer(option, button);
            optionsContainer.appendChild(button);
        });

        videoPlayer.play().catch(error => {
            console.error('Error de reproducción:', error);
            const playButton = document.createElement('button');
            playButton.textContent = 'Haz clic para reproducir';
            playButton.className = 'restart-btn';
            playButton.onclick = () => {
                videoPlayer.play();
                playButton.remove();
            };
            optionsContainer.prepend(playButton);
        });
    }

    function checkAnswer(selectedAnswer, button) {
        const correctAnswer = videos[currentVideoIndex].correctAnswer.toLowerCase();
        const userAnswer = selectedAnswer.toLowerCase();
        const allButtons = document.querySelectorAll('.option-btn');
        
        allButtons.forEach(btn => btn.disabled = true);
        
        if(userAnswer === correctAnswer) {
            score++;
           scoreElement.textContent = `Aciertos: ${score}`;


            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
            allButtons.forEach(btn => {
                if(btn.textContent.toLowerCase() === correctAnswer) btn.classList.add('correct');
            });
        }

        setTimeout(() => {
            currentVideoIndex++;
            if(currentVideoIndex >= videos.length) {
                showEndScreen();
            } else {
                loadVideo();
            }
        }, 1500);
    }

    function showEndScreen() {
        document.querySelector('.video-container').style.display = 'none';
        optionsContainer.style.display = 'none';
        scoreElement.style.display = 'none';
        endScreen.style.display = 'flex';
finalScore.textContent = `Puntuación final: ${score}/${videos.length}`;
    }

    function restartGame() {
        currentVideoIndex = 0;
        score = 0;
        scoreElement.textContent = 'Aciertos: 0';
        document.querySelector('.video-container').style.display = 'block';
        optionsContainer.style.display = 'grid';
        scoreElement.style.display = 'block';
        endScreen.style.display = 'none';
        videoPlayer.currentTime = 0;
        loadVideo();
    }

    // Iniciar el juego
    loadVideo();








