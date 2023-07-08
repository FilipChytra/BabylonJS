var canvasARC = document.getElementById("arc-rotate-camera");

        var startRenderLoopARC = function (engine, canvasARC) {
            engine.runRenderLoop(function () {
                if (sceneToRenderARC && sceneToRenderARC.activeCamera) {
                    sceneToRenderARC.render();
                }
            });
        }

        var engineARC = null;
        var sceneARC = null;
        var sceneToRenderARC = null;
        var createDefaultEngineARC = function() { return new BABYLON.Engine(canvasARC, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneARC = function () {
    var sceneARC = new BABYLON.Scene(engineARC);
    sceneARC.clearColor = new BABYLON.Color4(0,0,0,.1);

    var cameraARC = new BABYLON.ArcRotateCamera("camera1", Math.PI, 1/3*Math.PI, 10, new BABYLON.Vector3(0, 0, -.5), sceneARC);
    cameraARC.wheelDeltaPercentage = 0.02;
    cameraARC.attachControl(canvasARC, true);

    var lightARC = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), sceneARC);

    lightARC.intensity = 0.7;

     BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","camera.glb",sceneARC);
    return sceneARC;
};
                window.initFunctionARC = async function() {
                    
                    
                    
                    var asyncEngineCreationARC = async function() {
                        try {
                        return createDefaultEngineARC();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineARC();
                        }
                    }

                    window.engineARC = await asyncEngineCreationARC();
        if (!engineARC) throw 'engine should not be null.';
        startRenderLoopARC(engineARC, canvasARC);
        window.sceneARC = createSceneARC();};
        initFunctionARC().then(() => {sceneToRenderARC = sceneARC                    
        });