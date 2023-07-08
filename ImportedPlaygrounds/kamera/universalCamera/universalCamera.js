var canvasUC = document.getElementById("universal-camera");

        var startRenderLoopUC = function (engine, canvasUC) {
            engine.runRenderLoop(function () {
                if (sceneToRenderUC && sceneToRenderUC.activeCamera) {
                    sceneToRenderUC.render();
                }
            });
        }

        var engineUC = null;
        var sceneUC = null;
        var sceneToRenderUC = null;
        var createDefaultEngineUC = function() { return new BABYLON.Engine(canvasUC, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneUC = function () {
    var sceneUC = new BABYLON.Scene(engineUC);

    var cameraUC = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(-10, 5, 0), sceneUC);

    cameraUC.setTarget(new BABYLON.Vector3(0, 0, -.5));

    cameraUC.attachControl(canvasUC, true);

    var lightUC = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), sceneUC);

    lightUC.intensity = 0.7;

     BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","camera.glb",sceneUC);
    return sceneUC;
};
                window.initFunctionUC = async function() {
                    
                    
                    
                    var asyncEngineCreationUC = async function() {
                        try {
                        return createDefaultEngineUC();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineUC();
                        }
                    }

                    window.engineUC = await asyncEngineCreationUC();
        if (!engineUC) throw 'engine should not be null.';
        startRenderLoopUC(engineUC, canvasUC);
        window.sceneUC = createSceneUC();};
        initFunctionUC().then(() => {sceneToRenderUC = sceneUC                    
        });