var canvasFC = document.getElementById("free-camera");

        var startRenderLoopFC = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRenderFC && sceneToRenderFC.activeCamera) {
                    sceneToRenderFC.render();
                }
            });
        }

        var engineFC = null;
        var sceneFC = null;
        var sceneToRenderFC = null;
        var createDefaultEngineFC = function() { return new BABYLON.Engine(canvasFC, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneFC = function () {

    var sceneFC = new BABYLON.Scene(engineFC);

    var cameraFC = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(-10, 5, 0), sceneFC);

    cameraFC.setTarget(new BABYLON.Vector3(0, 0, -.5));

    cameraFC.attachControl(canvasFC, true);

    var lightFC = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), sceneFC);


    lightFC.intensity = 0.7;

     BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","camera.glb",sceneFC);
    return sceneFC;
};
                window.initFunctionFC = async function() {
                    
                    
                    
                    var asyncEngineCreationFC = async function() {
                        try {
                        return createDefaultEngineFC();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineFC();
                        }
                    }

                    window.engineFC = await asyncEngineCreationFC();
        if (!engineFC) throw 'engine should not be null.';
        startRenderLoopFC(engineFC, canvasFC);
        window.sceneFC = createSceneFC();};
        initFunctionFC().then(() => {sceneToRenderFC = sceneFC                    
        });