var canvasPS = document.getElementById("primitive-structures");

        var startRenderLoopPS = function (engine, canvasPS) {
            engine.runRenderLoop(function () {
                if (sceneToRenderPS && sceneToRenderPS.activeCamera) {
                    sceneToRenderPS.render();
                }
            });
        }

        var enginePS = null;
        var scenePS = null;
        var sceneToRenderPS = null;
        var createDefaultEnginePS = function() { return new BABYLON.Engine(canvasPS, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2SupPSrt: false}); };
        var createScenePS = function () {
    var scenePS = new BABYLON.Scene(enginePS);
    scenePS.clearColor = new BABYLON.Color4(0,0,0,.1);


    var cameraPS = new BABYLON.ArcRotateCamera("camera1", -1/2*Math.PI, 1/3*Math.PI, 10, BABYLON.Vector3.Zero(), scenePS);
    cameraPS.wheelDeltaPercentage = 0.02;
    cameraPS.attachControl(canvasPS, true);

    var lightPS = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-2, 4, 1), scenePS);

    lightPS.diffuse = new BABYLON.Color3(1, 0.4, 0.4);
    lightPS.groundColor = new BABYLON.Color3(0.34, 0.65, 0.93, 0)
    lightPS.intensity = 0.7;

    var krychlePS = BABYLON.MeshBuilder.CreateBox(
        'krychle', {size : 1}, scenePS
    );
    var kvadrPS = BABYLON.MeshBuilder.CreateBox(
        'kvadr', { height: 1, width: 2, depth :1}, scenePS
    );
    var koulePS = BABYLON.MeshBuilder.CreateSphere(
        'koule', {diameter: 1, segments: 10}, scenePS
    );
    var valecPS = BABYLON.MeshBuilder.CreateCylinder(
        'valec', {height: 1, diameter: 1}, scenePS
    );
    var kuzelPS = BABYLON.MeshBuilder.CreateCylinder(
        "kuzel", {height: 1, diameterBottom: 1, diameterTop: 0}, scenePS
    );

    krychlePS.position.x = -4;
    kvadrPS.position.x = -2;
    koulePS.position.x = 0;
    valecPS.position.x = 1.5;
    kuzelPS.position.x = 3;
    return scenePS;
};
                window.initFunctionPS = async function() {
                    
                    
                    
                    var asyncEngineCreationPS = async function() {
                        try {
                        return createDefaultEnginePS();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEnginePS();
                        }
                    }

                    window.enginePS = await asyncEngineCreationPS();
        if (!enginePS) throw 'engine should not be null.';
        startRenderLoopPS(enginePS, canvasPS);
        window.scenePS = createScenePS();};
        initFunctionPS().then(() => {sceneToRenderPS = scenePS                    
        });