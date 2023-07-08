var canvasHL = document.getElementById("hemispheric-light");

        var startRenderLoopHL = function (engine, canvasHL) {
            engine.runRenderLoop(function () {
                if (sceneToRenderHL && sceneToRenderHL.activeCamera) {
                    sceneToRenderHL.render();
                }
            });
        }

        var engineHL = null;
        var sceneHL = null;
        var sceneToRenderHL = null;
        var createDefaultEngineHL = function() { return new BABYLON.Engine(canvasHL, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneHL = function () {
    var sceneHL = new BABYLON.Scene(engineHL);

    var cameraHL = new BABYLON.ArcRotateCamera("camera1", 1/2*Math.PI, 1/2*Math.PI, 3, new BABYLON.Vector3(0, .5, 0), sceneHL);

    cameraHL.attachControl(canvasHL, true);
    cameraHL.wheelDeltaPercentage = 0.02;


    var lightHL = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(.5, 1, 0), sceneHL);
    lightHL.diffuse = new BABYLON.Color3(0.85, 0.8, 0.22);
    lightHL.groundColor = new BABYLON.Color3(0.69, 0.05, 0.05);
    lightHL.intensity = 0.7;

     BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","low_poly_light_bulb.glb",sceneHL);
    return sceneHL;
};
                window.initFunctionHL = async function() {
                    
                    
                    
                    var asyncEngineCreationHL = async function() {
                        try {
                        return createDefaultEngineHL();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineHL();
                        }
                    }

                    window.engineHL = await asyncEngineCreationHL();
        if (!engineHL) throw 'engine should not be null.';
        startRenderLoopHL(engineHL, canvasHL);
        window.sceneHL = createSceneHL();};
        initFunctionHL().then(() => {sceneToRenderHL = sceneHL                    
        });