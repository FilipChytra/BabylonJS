var canvasPL = document.getElementById("point-light");

        var startRenderLoopPL = function (engine, canvasPL) {
            engine.runRenderLoop(function () {
                if (sceneToRenderPL && sceneToRenderPL.activeCamera) {
                    sceneToRenderPL.render();
                }
            });
        }

        var enginePL = null;
        var scenePL = null;
        var sceneToRenderPL = null;
        var createDefaultEnginePL = function() { return new BABYLON.Engine(canvasPL, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createScenePL = function () {
    var scenePL = new BABYLON.Scene(enginePL);
    scenePL.clearColor = new BABYLON.Color4(0,0,0,.1);


    var cameraPL = new BABYLON.ArcRotateCamera("camera1", 1/2*Math.PI, 1/2*Math.PI, 3, new BABYLON.Vector3(0, .5, 0), scenePL);
    cameraPL.wheelDeltaPercentage = 0.02;
    cameraPL.attachControl(canvasPL, true);

    var lightPL = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(2, 4, 0), scenePL);
    //definice barvy světla na modrou barvu
    lightPL.diffuse = new BABYLON.Color3(0.2, 0.66, 0.66);
    lightPL.intensity = 15;

    BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","low_poly_light_bulb.glb",scenePL);
    return scenePL;
};
                window.initFunctionPL = async function() {
                    
                    
                    
                    var asyncEngineCreationPL = async function() {
                        try {
                        return createDefaultEnginePL();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEnginePL();
                        }
                    }

                    window.enginePL = await asyncEngineCreationPL();
        if (!enginePL) throw 'engine should not be null.';
        startRenderLoopPL(enginePL, canvasPL);
        window.scenePL = createScenePL();};
        initFunctionPL().then(() => {sceneToRenderPL = scenePL                    
        });