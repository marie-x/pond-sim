// Copyright 2023 Marie Maxham
// 
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 *     <!--    <canvas class="oscilloscope" width="640" height="100"></canvas>
    <p></p> -->
    <canvas class="spectrum" width="640" height="100"></canvas>
    <p></p>
    <canvas class="timeline" width="640" height="100"></canvas>
    <p></p>
    <span id="info">hi there</span>
    <p></p>
    <span id="log" font="consolas">hi there</span>

 */

const { log, error } = console

// misc notes

// TODO load from DB
const history = []

const state = {
    oxygen: 5, // PPM
    width: 2, // meter
    length: 3, // meter
    depth: 1, // meter
    volume: () => length * width * depth, // cu meter
    temperature: 25, // deg C
    pH: 7.0, // 
    nitrogen: 0.25, // PPM
    surface: () => width * length, // sq meters
    pebble: 0, // sq meters available for bacteria (should include internal area tho)
    flow: 0, // no pump
    fish: [], // no fish
    mosquitoes: [], // none, to start
    plantMass: 0, // no plants
    algae: 0, // to start
}

function secs(s) {
    return s
}

function mins(m) {
    return m * secs(60)
}

function hours(h) {
    return h * mins(60)
}

function tick(dt = hours(1)) {
    // run sim forward by dt
    drawPond()
}

// todo jquery
function addElements() {
    const pondCanvas = $('<canvas id="pondCanvas" width="1024" height="640"/>')
    pondCanvas.insertAfter($(document.body.children).last())

    // add readouts
    // add controls
}

const ROOT2 = Math.sqrt(2)

function vertSlice(x1, y1, x2, y2, z) {
    const scale = 640 / Math.max(state.width, state.length, state.depth)
    const h = y2 - y1
    const w = x2 - x1
    const results = [x1 + z * (ROOT2 / 2), y1 + z * (ROOT2 / 2), w, h].map(d => Math.round(d * scale))
    log(x1, y1, x2, y2, z, results)
    return results
}

function drawPond() {
    const ctx = $('#pondCanvas')[0].getContext('2d')
    // ctx.fillStyle = 'rgb(200, 0, 0)'
    // ctx.fillRect(10, 10, 50, 50)
    // // ctx.fillRect(left, top, width, height)

    ctx.fillStyle = 'rgba(200, 200, 255, 0.2)'
    for (let z = 0; z < state.width; z += 0.1) {
        ctx.fillRect(...vertSlice(0, 0, state.length, state.depth, z))
    }
}



$(window).bind('resizeEnd', () => {
    // resizeCanvas()
})

$(document).ready(() => {
    addElements()
    drawPond()
})