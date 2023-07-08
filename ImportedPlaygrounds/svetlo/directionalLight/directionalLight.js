var canvasDL = document.getElementById("directional-light");

        var startRenderLoopDL = function (engine, canvasDL) {
            engine.runRenderLoop(function () {
                if (sceneToRenderDL && sceneToRenderDL.activeCamera) {
                    sceneToRenderDL.render();
                }
            });
        }

        var engineDL = null;
        var sceneDL = null;
        var sceneToRenderDL = null;
        var createDefaultEngineDL = function() { return new BABYLON.Engine(canvasDL, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneDL = function () {
    var sceneDL = new BABYLON.Scene(engineDL);

    var cameraDL = new BABYLON.ArcRotateCamera("camera1", 1/2*Math.PI, 1/2*Math.PI, 3, new BABYLON.Vector3(0, .5, 0), sceneDL);
    cameraDL.wheelDeltaPercentage = 0.02;


    cameraDL.attachControl(canvasDL, true);

    var lightDL = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(-.5, -1, 0), sceneDL);
    
    lightDL.diffuse = new BABYLON.Color3(0.12, 0.55, 0.09);
    lightDL.intensity = 1;

    BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","low_poly_light_bulb.glb",sceneDL);
    return sceneDL;
};
                window.initFunctionDL = async function() {
                    
                    
                    
                    var asyncEngineCreationDL = async function() {
                        try {
                        return createDefaultEngineDL();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineDL();
                        }
                    }

                    window.engineDL = await asyncEngineCreationDL();
        if (!engineDL) throw 'engine should not be null.';
        startRenderLoopDL(engineDL, canvasDL);
        window.sceneDL = createSceneDL();};
        initFunctionDL().then(() => {sceneToRenderDL = sceneDL                    
        });