var canvasSL = document.getElementById("spot-light");

        var startRenderLoopSL = function (engine, canvasSL) {
            engine.runRenderLoop(function () {
                if (sceneToRenderSL && sceneToRenderSL.activeCamera) {
                    sceneToRenderSL.render();
                }
            });
        }

        var engineSL = null;
        var sceneSL = null;
        var sceneToRenderSL = null;
        var createDefaultEngineSL = function() { return new BABYLON.Engine(canvasSL, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createSceneSL = function () {
    var sceneSL = new BABYLON.Scene(engineSL);

    var cameraSL = new BABYLON.ArcRotateCamera("camera1", 1/2*Math.PI, 1/2*Math.PI, 3, new BABYLON.Vector3(0, .5, 0), sceneSL);
    cameraSL.wheelDeltaPercentage = 0.02;
    cameraSL.attachControl(canvasSL, true);

    var lightSL = new BABYLON.SpotLight("SpotLight", new BABYLON.Vector3(6, 12, 0),new BABYLON.Vector3(-1, -1.95, 0), 1/8*Math.PI, 500, sceneSL);

    //definice barvy světla na fialovou barvu
    lightSL.diffuse = new BABYLON.Color3(0.61, 0.18, 0.51);
    lightSL.intensity = 15;

    BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","low_poly_light_bulb.glb",sceneSL);

    var groundSL = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, sceneSL);
    var groundMaterialSL = new BABYLON.StandardMaterial('groundMaterial', sceneSL);
    groundMaterialSL.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMaterialSL.specularPower = 1000;
    groundSL.material = groundMaterialSL;
    return sceneSL;
};
                window.initFunctionSL = async function() {
                        
                    var asyncEngineCreationSL = async function() {
                        try {
                        return createDefaultEngineSL();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineSL();
                        }
                    }

                    window.engineSL = await asyncEngineCreationSL();
        if (!engineSL) throw 'engine should not be null.';
        startRenderLoopSL(engineSL, canvasSL);
        window.sceneSL = createSceneSL();};
        initFunctionSL().then(() => {sceneToRenderSL = sceneSL                    
        });