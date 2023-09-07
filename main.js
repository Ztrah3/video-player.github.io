document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.player__video')
    const toggleButton = document.querySelector('.player__button.toggle')

    toggleButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            toggleButton.textContent = '❚❚'
        } else {
            video.pause();
            toggleButton.textContent = '►'
        }
    });

    const rewindButton = document.getElementById('rewind')
    rewindButton.addEventListener('click', () => {
        video.currentTime -= 10
    });

    const fastForwardButton = document.getElementById('fastForward')
    fastForwardButton.addEventListener('click', () => {
        video.currentTime += 25
    });

    const volumeRange = document.getElementById('volume')
    volumeRange.addEventListener('input', () => {
        video.volume = volumeRange.value / 100
    });

    const progress = document.querySelector('.progress')
    const progressBar = progress.querySelector('.progress__filled')

    const handleProgress = () => {
        const percent = (video.currentTime / video.duration) * 100
        progressBar.style.flexBasis = `${percent}%`
    };

    const scrub = (e) => {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
        video.currentTime = scrubTime
    };

    video.addEventListener('timeupdate', handleProgress)

    let mousedown = false
    progress.addEventListener('mousedown', () => mousedown = true)
    progress.addEventListener('mouseup', () => mousedown = false)
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
    progress.addEventListener('click', scrub)

    const player = document.querySelector('.player')
    const fullscreenButton = document.querySelector('#fullscreen-img')

    const requestFullscreen = (elem) => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen()
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen()
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen()
        }
    }

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
        }
    };

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            requestFullscreen(player)
        } else {
            exitFullscreen()
        }
    })
})





