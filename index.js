'use strict';

// ----- Requires ----- //

let exec = require('child_process').exec;

// ----- Functions ----- //

async function getVideoDurationInSeconds (videoName) {
    const params = ['-v', 'error', '-show_format', '-show_streams']
    if (typeof videoName === 'string') {
        exec(`ffprobe ${params.join(' ')} ${videoName}`, (err, stdout, stderr) => {
            if(err instanceof Error){
                throw err;
            }
            const matched = stdout.match(/duration="?(\d*\.\d*)"?/)
            if (matched && matched[1]) return parseFloat(matched[1])
            throw new Error('No duration found!')
        });
    }
    throw new Error('Given videoName was neither a string')
}

module.exports = getVideoDurationInSeconds;