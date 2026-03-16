let wavesurfer, region = null;
const audioFile = document.getElementById('audioFile');
const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const cropBtn = document.getElementById('cropBtn');
const timeDisplay = document.getElementById('timeDisplay');
const zoomSlider = document.getElementById('zoomSlider');

audioFile.addEventListener('change', async e => {
    const file = e.target.files[0];
    if(!file) return; // must select a file
    const url = URL.createObjectURL(file);

    if(wavesurfer) wavesurfer.destroy(); //destroy old instance

    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#ddd',
        progressColor: '#4CAF50',
        height: 250,
        responsive: true,
        plugins: [ WaveSurfer.regions.create({})]
    });

    wavesurfer.load(url);

    wavesurfer.on('ready', () => {
        // only now wavesurfer is ready
        region = wavesurfer.addRegion({
            start: 0,
            end: wavesurfer.getDuration(),
            color: 'rgba(76,175,80,0.3)',
            drag: true,
            resize: true
        });
        updateTime();
    });

    wavesurfer.on('region-updated', updateTime);
    wavesurfer.on('region-update-end', updateTime);
});

// Play/Pause
playBtn.addEventListener('click', ()=>{
    if(!wavesurfer) return alert("Load audio first");
    wavesurfer.playPause();
});

// Stop
stopBtn.addEventListener('click', ()=>{
    if(!wavesurfer) return;
    wavesurfer.stop();
});

// Zoom
zoomSlider.addEventListener('input', () => {
    if(wavesurfer) wavesurfer.zoom(zoomSlider.value);
});

// Update time display
function updateTime() {
    if(region) {
        const dur = (region.end - region.start).toFixed(2);
        timeDisplay.innerText = `Start: ${region.start.toFixed(2)}s | End: ${region.end.toFixed(2)}s | Duration: ${dur}s`;
    }
}

// Crop & Download
cropBtn.addEventListener('click', async () => {
    if(!wavesurfer || !region) return alert("Load audio and select region");

    const file = audioFile.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const sampleRate = audioBuffer.sampleRate;
    const startSample = Math.floor(region.start * sampleRate);
    const endSample = Math.floor(region.end * sampleRate);
    const length = endSample - startSample;

    const newBuffer = audioCtx.createBuffer(audioBuffer.numberOfChannels, length, sampleRate);
    for(let ch=0; ch<audioBuffer.numberOfChannels; ch++){
        const data = audioBuffer.getChannelData(ch).slice(startSample,endSample);
        newBuffer.copyToChannel(data,ch);
    }

    const wavBlob = encodeWAV(newBuffer);
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cropped-audio.wav';
    a.click();
});

// WAV encoder
function encodeWAV(audioBuffer){
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitDepth = 16;
    const buffers = [];
    for(let i=0;i<numChannels;i++) buffers.push(audioBuffer.getChannelData(i));

    const interleaved = interleave(buffers);
    const buffer = new ArrayBuffer(44 + interleaved.length*2);
    const view = new DataView(buffer);

    writeString(view,0,'RIFF');
    view.setUint32(4,36+interleaved.length*2,true);
    writeString(view,8,'WAVE');
    writeString(view,12,'fmt ');
    view.setUint32(16,16,true);
    view.setUint16(20,1,true);
    view.setUint16(22,numChannels,true);
    view.setUint32(24,sampleRate,true);
    view.setUint32(28,sampleRate*numChannels*bitDepth/8,true);
    view.setUint16(32,numChannels*bitDepth/8,true);
    view.setUint16(34,bitDepth,true);
    writeString(view,36,'data');
    view.setUint32(40,interleaved.length*2,true);

    let offset=44;
    for(let i=0;i<interleaved.length;i++){
        let s = Math.max(-1,Math.min(1,interleaved[i]));
        view.setInt16(offset,s<0 ? s*0x8000 : s*0x7FFF,true);
        offset+=2;
    }

    return new Blob([view],{type:'audio/wav'});
}

function interleave(buffers){
    const length = buffers[0].length;
    const result = new Float32Array(length*buffers.length);
    let idx=0;
    for(let i=0;i<length;i++){
        for(let j=0;j<buffers.length;j++){
            result[idx++]=buffers[j][i];
        }
    }
    return result;
}

function writeString(view,offset,string){
    for(let i=0;i<string.length;i++){
        view.setUint8(offset+i,string.charCodeAt(i));
    }
}