<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LifeSkill OS</title>

<style>
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: Arial, sans-serif;
    background: #050816;
    color: white;
}

#loading {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #050816;
    font-size: 22px;
}

#ui {
    position: fixed;
    inset: 0;
    z-index: 10;
    pointer-events: none;
}

.header {
    padding: 16px 20px;
    background: rgba(5, 8, 22, .86);
    backdrop-filter: blur(12px);
}

.logo {
    font-size: 23px;
    font-weight: bold;
}

.subtitle {
    color: #aab2cc;
    font-size: 13px;
    margin-top: 4px;
}

.goal-box {
    pointer-events: auto;
    position: absolute;
    top: 85px;
    left: 50%;
    transform: translateX(-50%);
    width: min(650px, calc(100% - 30px));
    background: rgba(8, 13, 30, .9);
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 18px;
    padding: 15px;
    backdrop-filter: blur(12px);
}

.goal-box input {
    width: 100%;
    padding: 14px;
    border-radius: 11px;
    border: 1px solid #303852;
    background: #10162a;
    color: white;
    font-size: 15px;
    outline: none;
}

button {
    border: 0;
    border-radius: 11px;
    padding: 13px 18px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
}

#learnButton {
    width: 100%;
}

.panel {
    pointer-events: auto;
    position: absolute;
    left: 15px;
    bottom: 15px;
    width: min(380px, calc(100% - 30px));
    padding: 18px;
    border-radius: 18px;
    background: rgba(8, 13, 30, .9);
    border: 1px solid rgba(255,255,255,.14);
    backdrop-filter: blur(12px);
}

.hidden {
    display: none !important;
}

.mission {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 8px;
}

.info {
    color: #b5bdd5;
    font-size: 13px;
    line-height: 1.5;
}

.stats {
    display: flex;
    gap: 10px;
    margin: 14px 0;
}

.stat {
    flex: 1;
    padding: 11px;
    border-radius: 12px;
    background: rgba(255,255,255,.07);
    text-align: center;
}

.stat small {
    display: block;
    color: #9da6c0;
    margin-bottom: 5px;
}

.stat strong {
    font-size: 19px;
}

label {
    display: block;
    color: #b5bdd5;
    font-size: 13px;
    margin-top: 10px;
}

input[type="range"] {
    width: 100%;
}

#message {
    margin-top: 11px;
    font-size: 14px;
    line-height: 1.45;
}

#intent {
    margin-top: 8px;
    color: #aab2cc;
    font-size: 12px;
}

@media(max-width:600px) {

    .header {
        padding: 13px 15px;
    }

    .logo {
        font-size: 20px;
    }

    .goal-box {
        top: 70px;
    }

    .panel {
        bottom: 10px;
        left: 10px;
        width: calc(100% - 20px);
    }
}
</style>
</head>

<body>

<div id="loading">
    ⚡ Loading LifeSkill OS...
</div>

<div id="ui">

    <div class="header">
        <div class="logo">⚡ LifeSkill OS</div>
        <div class="subtitle">
            Don't just learn it. Enter it.
        </div>
    </div>

    <div class="goal-box">

        <input
            id="goal"
            type="text"
            placeholder="Tell LifeSkill OS what you want to learn..."
        >

        <button id="learnButton">
            🧠 CREATE MY EXPERIENCE
        </button>

    </div>

    <div id="panel" class="panel hidden">

        <div class="mission">
            🎯 <span id="missionTitle">Mission</span>
        </div>

        <div id="intent">
            Experience selected by LifeSkill OS
        </div>

        <p class="info" id="missionInfo"></p>

        <div class="stats">

            <div class="stat">
                <small>Speed</small>
                <strong>
                    <span id="speed">0</span> m/s
                </strong>
            </div>

            <div class="stat">
                <small>Acceleration</small>
                <strong>
                    <span id="acc">5</span>
                </strong>
            </div>

        </div>

        <label>Control Acceleration</label>

        <input
            id="acceleration"
            type="range"
            min="0"
            max="10"
            value="5"
            step="0.1"
        >

        <button id="startButton">
            🚀 START MISSION
        </button>

        <div id="message">
            Experiment and discover what happens.
        </div>

    </div>

</div>


<!-- Three.js -->

<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>


<script>

window.addEventListener("load", function () {

    /* ==========================================
       BASIC CHECK
    ========================================== */

    if (typeof THREE === "undefined") {

        document.getElementById("loading").innerHTML =
            "❌ 3D engine could not load.<br><small>Check your internet connection and refresh.</small>";

        return;
    }


    /* ==========================================
       SCENE
    ========================================== */

    const scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x07101f);

    scene.fog =
        new THREE.Fog(
            0x07101f,
            30,
            190
        );


    /* ==========================================
       CAMERA
    ========================================== */

    const camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            0.1,
            500
        );

    camera.position.set(
        8,
        6,
        12
    );


    /* ==========================================
       RENDERER
    ========================================== */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.shadowMap.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );


    /* ==========================================
       LIGHTING
    ========================================== */

    const ambient =
        new THREE.HemisphereLight(
            0xffffff,
            0x223344,
            2
        );

    scene.add(ambient);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    sun.position.set(
        20,
        30,
        10
    );

    sun.castShadow = true;

    scene.add(sun);


    /* ==========================================
       GROUND
    ========================================== */

    const ground =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                300,
                300
            ),
            new THREE.MeshStandardMaterial({
                color: 0x172019
            })
        );

    ground.rotation.x =
        -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);


    /* ==========================================
       ROAD
    ========================================== */

    const road =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                14,
                240
            ),
            new THREE.MeshStandardMaterial({
                color: 0x171a20
            })
        );

    road.rotation.x =
        -Math.PI / 2;

    road.position.y =
        0.01;

    road.position.z =
        -80;

    scene.add(road);


    /* ==========================================
       ROAD MARKINGS
    ========================================== */

    for (
        let z = 20;
        z > -210;
        z -= 8
    ) {

        const line =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.25,
                    0.03,
                    4
                ),
                new THREE.MeshStandardMaterial({
                    color: 0xffffff
                })
            );

        line.position.set(
            0,
            0.04,
            z
        );

        scene.add(line);
    }


    /* ==========================================
       CAR
    ========================================== */

    const car =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                2.4,
                0.7,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x1677ff,
                metalness: 0.4,
                roughness: 0.35
            })
        );

    body.position.y =
        0.75;

    body.castShadow = true;

    car.add(body);


    const cabin =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.7,
                0.65,
                1.8
            ),
            new THREE.MeshStandardMaterial({
                color: 0x8fd3ff,
                transparent: true,
                opacity: 0.75
            })
        );

    cabin.position.set(
        0,
        1.35,
        -0.25
    );

    car.add(cabin);


    /* WHEELS */

    const wheelGeometry =
        new THREE.CylinderGeometry(
            0.45,
            0.45,
            0.35,
            24
        );

    const wheelMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x080808
        });


    [
        [-1.25,0.45,1.25],
        [1.25,0.45,1.25],
        [-1.25,0.45,-1.25],
        [1.25,0.45,-1.25]
    ].forEach(function (p) {

        const wheel =
            new THREE.Mesh(
                wheelGeometry,
                wheelMaterial
            );

        wheel.rotation.z =
            Math.PI / 2;

        wheel.position.set(
            p[0],
            p[1],
            p[2]
        );

        car.add(wheel);

    });


    car.position.set(
        0,
        0,
        10
    );

    scene.add(car);


    /* ==========================================
       CHECKPOINT
    ========================================== */

    const checkpoint =
        new THREE.Group();


    const checkpointMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x665500
        });


    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                5,
                0.25,
                16,
                64
            ),
            checkpointMaterial
        );

    ring.rotation.y =
        Math.PI / 2;

    ring.position.y =
        4;

    checkpoint.add(ring);


    [-5, 5].forEach(function (x) {

        const pillar =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.4,
                    8,
                    0.4
                ),
                checkpointMaterial
            );

        pillar.position.set(
            x,
            4,
            0
        );

        checkpoint.add(pillar);

    });


    checkpoint.position.z =
        -100;

    scene.add(checkpoint);


    /* ==========================================
       TREES
    ========================================== */

    function createTree(x, z) {

        const tree =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.3,
                    0.45,
                    3,
                    12
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x68452d
                })
            );

        trunk.position.y =
            1.5;

        tree.add(trunk);


        const leaves =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    1.7,
                    16,
                    16
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x237a3a
                })
            );

        leaves.position.y =
            3.5;

        tree.add(leaves);


        tree.position.set(
            x,
            0,
            z
        );

        scene.add(tree);
    }


    for (
        let z = 15;
        z > -210;
        z -= 15
    ) {

        createTree(-11, z);
        createTree(11, z - 6);

    }


    /* ==========================================
       LIFESKILL INTENT ENGINE
    ========================================== */

    function understandIntent(goal) {

        const text =
            goal.toLowerCase().trim();


        let subject = "General Learning";
        let experience = "Exploration";
        let mission = "Explore a new concept";


        /* PHYSICS */

        if (
            text.includes("motion") ||
            text.includes("speed") ||
            text.includes("velocity") ||
            text.includes("acceleration") ||
            text.includes("force") ||
            text.includes("physics")
        ) {

            subject = "Physics";

            experience =
                "3D Motion Lab";

            mission =
                "Master Motion";

        }


        /* BIOLOGY */

        else if (
            text.includes("biology") ||
            text.includes("cell") ||
            text.includes("plant") ||
            text.includes("photosynthesis")
        ) {

            subject = "Biology";

            experience =
                "Virtual Biology Lab";

            mission =
                "Explore Life";

        }


        /* MATHEMATICS */

        else if (
            text.includes("math") ||
            text.includes("algebra") ||
            text.includes("geometry") ||
            text.includes("triangle") ||
            text.includes("polynomial")
        ) {

            subject = "Mathematics";

            experience =
                "Interactive Math World";

            mission =
                "Solve the Mathematical Challenge";

        }


        /* COMMUNICATION */

        else if (
            text.includes("speaking") ||
            text.includes("communication") ||
            text.includes("presentation")
        ) {

            subject = "Communication";

            experience =
                "Virtual Speaking Arena";

            mission =
                "Master Communication";

        }


        /* CODING */

        else if (
            text.includes("coding") ||
            text.includes("programming") ||
            text.includes("python") ||
            text.includes("javascript")
        ) {

            subject = "Technology";

            experience =
                "Interactive Coding Lab";

            mission =
                "Build Your First Solution";

        }


        return {
            subject: subject,
            experience: experience,
            mission: mission
        };
    }


    /* ==========================================
       GAME VARIABLES
    ========================================== */

    let speed = 0;

    let acceleration = 5;

    let running = false;

    let lastTime =
        performance.now();


    /* ==========================================
       UI ELEMENTS
    ========================================== */

    const goal =
        document.getElementById(
            "goal"
        );

    const learnButton =
        document.getElementById(
            "learnButton"
        );

    const panel =
        document.getElementById(
            "panel"
        );

    const missionTitle =
        document.getElementById(
            "missionTitle"
        );

    const missionInfo =
        document.getElementById(
            "missionInfo"
        );

    const intent =
        document.getElementById(
            "intent"
        );

    const speedText =
        document.getElementById(
            "speed"
        );

    const accText =
        document.getElementById(
            "acc"
        );

    const accelerationSlider =
        document.getElementById(
            "acceleration"
        );

    const startButton =
        document.getElementById(
            "startButton"
        );

    const message =
        document.getElementById(
            "message"
        );


    /* ==========================================
       CREATE EXPERIENCE
    ========================================== */

    learnButton.addEventListener(
        "click",
        function () {

            const text =
                goal.value.trim();


            if (!text) {

                alert(
                    "Tell LifeSkill OS what you want to learn."
                );

                return;
            }


            const result =
                understandIntent(text);


            panel.classList.remove(
                "hidden"
            );


            missionTitle.textContent =
                result.mission;


            intent.textContent =
                "🧠 " +
                result.subject +
                " → " +
                result.experience;


            if (
                result.subject === "Physics"
            ) {

                missionInfo.textContent =
                    "You have entered the 3D Motion Lab. Control acceleration, observe the vehicle, and discover the concept through experimentation.";

            } else {

                missionInfo.textContent =
                    "LifeSkill OS understood your goal. This prototype currently uses the Motion Lab as its first 3D experience. More worlds will connect to the same engine.";

            }


            message.textContent =
                "Your goal has been understood. Start the experience when you're ready.";

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

        }
    );


    /* ==========================================
       ACCELERATION
    ========================================== */

    accelerationSlider.addEventListener(
        "input",
        function () {

            acceleration =
                Number(
                    accelerationSlider.value
                );

            accText.textContent =
                acceleration.toFixed(1);

        }
    );


    /* ==========================================
       START MISSION
    ========================================== */

    startButton.addEventListener(
        "click",
        function () {

            running = true;

            speed = 0;

            car.position.z =
                10;

            message.textContent =
                "🚀 Mission started! Experiment with acceleration and observe the vehicle.";

            startButton.textContent =
                "🔄 RESTART MISSION";

        }
    );


    /* ==========================================
       ANIMATION
    ========================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        const now =
            performance.now();


        const delta =
            Math.min(
                (now - lastTime) / 1000,
                0.05
            );


        lastTime =
            now;


        if (running) {

            speed +=
                acceleration *
                delta;


            speed =
                Math.min(
                    speed,
                    30
                );


            car.position.z -=
                speed *
                delta;


            speedText.textContent =
                speed.toFixed(1);


            if (
                car.position.z <= -95
            ) {

                running = false;

                message.textContent =
                    "🏆 Mission complete! You discovered how changing acceleration changes motion.";

            }

   
